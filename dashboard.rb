require 'httparty'

get '/bankstatement' do
  url = "https://hxf4w1fe64.execute-api.ap-southeast-2.amazonaws.com/dev/bankstatement"
  response = HTTParty.get(url)
  result = JSON.parse(response.body, symbolize_names: true)
  @items = result[:items]
  erb :bankstatement
end
