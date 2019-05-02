require 'active_record'

options = {
  adapter: 'postgresql',
  database: 'apportion'
};

ActiveRecord::Base.establish_connection(options)