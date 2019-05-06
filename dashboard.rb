require 'httparty'
require 'pry'
require_relative 'models/ledger'
require_relative 'models/chart_of_account'
require_relative 'models/account_code'

enable :sessions
helpers do
  def current_user
    User.find_by(id: session[:user_id])
  end

  def logged_in
    !!current_user
  end
end

get '/bankstatement' do
  if !logged_in
    redirect '/'
  end

  url = "https://hxf4w1fe64.execute-api.ap-southeast-2.amazonaws.com/dev/bankstatement"
  response = HTTParty.get(url)
  result = JSON.parse(response.body, symbolize_names: true)
  @items = result[:items]
  @chart_of_accounts = ChartOfAccount.all
  erb :bankstatement
end

post '/bankstatement' do
  ledger = Ledger.new
  ledger.date = params[:date]
  ledger.description = params[:description]
  ledger.amount = params[:amount]
  ledger.user_id = session[:user_id]
  ledger.chart_of_account_id = params[:chart_of_account_id]
  ledger.save
  redirect '/bankstatement'
end

get '/users/home' do
  # route is responsible for rendering the user's homepage view
  if current_user == nil
   redirect '/sessions/login'
  end
  @account_codes = AccountCode.all.map { |account| 
    {
      name: account.name,
      amount: account.chart_of_accounts.map { |chart| 
        chart.ledgers.where(user_id: current_user.id).sum(:amount)
      }.sum
    }
  }

  @bank_balance = @account_codes.map { |account| account[:amount] }.sum.round(2)

  @user = current_user
  erb :'/users/home'
end

get '/user/account/:name' do
  @account_name = params[:name]
  @account = AccountCode.find_by(name: params[:name])
  erb :'/users/account_info'
end









#  create a Ledgers class OOP
#  ---
#  loop through the array of statement line items
#    - for each line item, create a corresponding Ledger object
#    - set 'user_id' to current_user id
#    - if Amount is positive, give the Ledger 'account_code_id' to be 1 (ID for 'income')
#    - else, 'account_code_id' to be 2
#    - save the Ledger object

