# frozen_string_literal: true
class ParseController < ApplicationController
  def index
    @tab = nil
  end

  def parse_tab
    @tab = params.require(:tab)
    begin
      @tree = TabOperator.parse_and_transform_tab(@tab)
    rescue Parslet::ParseFailed => error
      @exception = error.parse_failure_cause.ascii_tree
    end

    render :index
  end
end
