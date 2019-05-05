class ChartOfAccount < ActiveRecord::Base
  has_many :ledgers
  belongs_to :account_code
end