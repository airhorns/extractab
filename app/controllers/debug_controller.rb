class DebugController < ApplicationController

  def index
    @tab = nil
  end

  def parse_tree
    @tab = params.require(:tab)
    begin
      @output = GuitarTabParser.new.parse(@tab)
    rescue Parslet::ParseFailed => error
      @exception = error.parse_failure_cause.ascii_tree
    end

    render :index
  end
end
