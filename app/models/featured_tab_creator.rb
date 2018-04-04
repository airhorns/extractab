module FeaturedTabCreator
  def self.create!
    YAML.load_file(Rails.root.join("db", "migration_data", "featured_tabs.yml").to_s).each do |name, properties|
      puts properties
      tab = Tab.new(
        title: name,
        contents: properties["contents"],
        owner_session_key: "system"
      )
      tab.save!
      FeaturedTab.new(tab_id: tab.id, order: properties["order"]).save!
    end
  end
end
