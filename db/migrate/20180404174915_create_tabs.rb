class CreateTabs < ActiveRecord::Migration[5.1]
  def change
    create_table :tabs do |t|
      t.string :title, null: false
      t.string :contents, null: false
      t.string :owner_session_key, null: false

      t.timestamps
    end
  end
end
