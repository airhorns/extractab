# frozen_string_literal: true
class ApplicationController < ActionController::Base
  before_action :set_session_identifier
  protect_from_forgery with: :exception

  def set_session_identifier
    session[:user_identifier] ||= SecureRandom.uuid
  end
end
