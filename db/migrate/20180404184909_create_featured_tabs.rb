class CreateFeaturedTabs < ActiveRecord::Migration[5.1]
  def change
    create_table :featured_tabs do |t|
      t.references :tab
      t.integer :order

      t.timestamps
    end
  end
end
