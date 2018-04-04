class FeaturedTab < ApplicationRecord
  belongs_to :tab

  validates :tab_id, presence: true
  validates :order, presence: true
end
