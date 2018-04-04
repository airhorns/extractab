class Api::TabsController < ApplicationController
  before_action :set_tab, only: [:show, :edit, :update, :destroy]

  # GET /api/tabs/foobar.json
  def show
  end

  # POST /api/tabs.json
  def create
    @tab = Api::Tab.new(tab_params)
    @tab.owner_session_key = session[:user_identifier]

    if @tab.save
      render status: :created, location: @tab
    else
      render status: :unprocessable_entity, json: @tab.errors
    end
  end

  # PATCH/PUT /api/tabs/foobar.json
  def update
    if !session_is_owner(@tab)
      render status: :unauthorized
    else
      if @tab.update(tab_params)
        render status: :ok, location: @tab
      else
        render status: :unprocessable_entity, json: @tab.errors
      end
    end
  end

  private
    def set_tab
      @tab = Tab.find_by_handle(params[:handle])
    end

    def session_is_owner(tab)
      tab.owner_session_key == session[:user_identifier]
    end

    def tab_params
      params.fetch(:tab, {})
    end
end
