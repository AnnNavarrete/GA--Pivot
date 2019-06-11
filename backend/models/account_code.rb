class AccountCode < ActiveRecord::Base
  has_many :chart_of_accounts
end