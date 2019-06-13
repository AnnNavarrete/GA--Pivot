require 'active_record'

options = {
  adapter: 'postgresql',
  database: 'pivot'
};

ActiveRecord::Base.establish_connection( ENV['DATABASE_URL'] || options)