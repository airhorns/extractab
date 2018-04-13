class Api::TabsController < ApplicationController
  before_action :set_tab, only: [:show, :edit, :update, :destroy]

  # GET /api/tabs/foobar.json
  def show
  end

  # POST /api/tabs.json
  def create
    @tab = Tab.new(tab_params)
    @tab.owner_session_key = session[:user_identifier]

    if @tab.save
      render :show, status: :created, location: api_tab_path(@tab)
    else
      render status: :unprocessable_entity, json: @tab.errors
    end
  end

  # PATCH/PUT /api/tabs/foobar.json
  def update
    if !session_is_owner(@tab)
      render status: :unauthorized, json: {error: "Can't update tab you don't own"}
    else
      if @tab.update(tab_params)
        render :show, status: :ok, location: api_tab_path(@tab)
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
      params.require(:tab).permit(:contents, :title)
    end
end
