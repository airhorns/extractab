# frozen_string_literal: true
class ClientSideAppController < ApplicationController
  def index
    @featured_tabs = FeaturedTab.includes(:tab).all.map do |feature|
      {
        handle: feature.tab.handle,
        title: feature.tab.title,
        order: feature.order
      }
    end
  end
end
