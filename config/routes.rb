# frozen_string_literal: true
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :debug, controller: '/debug' do
    root to: '/debug#index'
    post :parse_tree
  end
end
