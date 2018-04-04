# frozen_string_literal: true
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'client_side_app#index'
  get :app, to: 'client_side_app#index'

  namespace :api, defaults: {format: :json} do
    resources :tabs, param: :handle, only: %i{show create update}
  end

  get '*path', to: 'client_side_app#index'
end
