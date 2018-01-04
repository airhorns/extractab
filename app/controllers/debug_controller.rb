class DebugController < ApplicationController
  def index
  end

  def parse_tree
    @output = GuitarTabParser.new.parse(params[:tab])
    render :index
  end
end
