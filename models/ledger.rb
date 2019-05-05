class Ledger < ActiveRecord::Base
  belongs_to :user
  belongs_to :chart_of_account
end
