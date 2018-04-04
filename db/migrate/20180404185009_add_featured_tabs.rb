class AddFeaturedTabs < ActiveRecord::Migration[5.1]
  def up
    FeaturedTabCreator.create!
  end

  def down
  end
end
