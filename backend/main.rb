require 'sinatra'
require 'sinatra/json'
require 'sinatra/reloader'
require "sinatra/cors"

require_relative 'app_console'
require_relative 'db_config'
require_relative 'models/user'
require_relative 'models/ledger'
require_relative 'models/chart_of_account'
require_relative 'models/account_code'
require_relative 'dashboard'

set :allow_origin, "*"
set :allow_methods, "GET,HEAD,POST"
set :allow_headers, "content-type,if-modified-since"
set :expose_headers, "location,link"

enable :sessions
helpers do
  def static_file(name)
    json_from_file = File.read("public/build/asset-manifest.json")
    hash = JSON.parse(json_from_file)
    hash[name]
  end

  def current_user
    User.find_by(id: 1)
  end

  def logged_in
    !!current_user
  end
end

# Application Controller
get '/' do
  erb :index
end

get '/registrations/signup' do
  erb :'/registrations/signup'
end

post '/registrations' do
  user = User.new
  user.name = params[:name]
  user.email = params[:email]
  user.password = params[:password] 
  user.save
  # signs in automatically and redirect to dashboard
  session[:user_id] = user.id
  redirect '/users/home'
end

get '/sessions/login' do
  erb :'/sessions/login'
end

post '/sessions/login' do
  @user = User.find_by(email: params[:email])
  if @user && @user.authenticate(params[:password])
    session[:user_id] = @user.id
    redirect '/users/home'
  else
    erb :'/sessions/login'
  end
end

get '/users/settings' do
  @user = current_user
  erb :'/users/settings'
end

put '/users/:id' do
  # security: check current user matches id
  if user_id != params[:id]
    redirect '/users/settings'
  end

  user = User.find(params[:id])
  user.name = params[:name]
  user.email = params[:email]
  user.password = params[:password] 
  user.save
  redirect '/users/home'
end

get '/sessions/logout' do
  session.clear
  redirect '/'
end

get '/api/todos' do
  json :message => static_file 
end












