require 'httparty'
require 'json'
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

  # url = "https://hxf4w1fe64.execute-api.ap-southeast-2.amazonaws.com/dev/bankstatement"
  # response = HTTParty.get(url)
  # result = JSON.parse(response.body, symbolize_names: true)
  # @items = result[:items]
  # @chart_of_accounts = ChartOfAccount.all
  erb :'/users/home'
end

post '/bankstatement' do
  payload = JSON.parse(request.body.read.to_s, :symbolize_names => true)
  ledger = Ledger.new
  ledger.date = payload[:date]
  ledger.description = payload[:description]
  ledger.amount = payload[:amount]
  ledger.user_id = session[:user_id]
  ledger.chart_of_account_id = payload[:chart_of_account_id]
  ledger.save
  redirect '/bankstatement'
end

get '/dashboard' do
  # route is responsible for rendering the user's homepage view
  if current_user == nil
   redirect '/sessions/login'
  end
  # @account_codes = AccountCode.all.map { |account| 
  #   {
  #     name: account.name,
  #     amount: account.chart_of_accounts.map { |chart| 
  #       chart.ledgers.where(user_id: current_user.id).sum(:amount)
  #     }.sum
  #   }
  # }

  # @bank_balance = @account_codes.map { |account| account[:amount] }.sum.round(2)

  # @user = current_user
  erb :'/users/home'
end

get '/user/account/:name' do
  @account_name = params[:name]
  @account = AccountCode.find_by(name: params[:name])
  erb :'/users/account_info'
end

get '/api/accounts/:name' do
  content_type :json

  account_name = params[:name].titlecase
  account = AccountCode.find_by(name: params[:name])
  accounts = account.chart_of_accounts.map { |account| 
    {
      name: account.name,
      items: account.ledgers.where(user_id: current_user.id),
      total: account.ledgers.where(user_id: current_user.id).sum(:amount)
    }
  }

  data = {
    :name => account_name,
    :accounts => accounts
  }

  json data.as_json
end

get '/api/accounts' do
  account_codes = AccountCode.all.map { |account| 
    {
      name: account.name,
      amount: account.chart_of_accounts.map { |chart| 
        chart.ledgers.where(user_id: current_user.id).sum(:amount)
      }.sum
    }
  }

  bank_balance = account_codes.map { |account| account[:amount] }.sum.round(2)
  
  data = {
    :user => current_user.name,
    :bank_balance => bank_balance,
    :accountCodes => account_codes,
    :chartOfAccounts => ChartOfAccount.all
  }
  json data.as_json
end




