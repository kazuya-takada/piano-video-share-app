class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :login_required

  private

  def login_required
    render json: { errors: ['ログインが必要です'] }, status: 401 unless session[:user_id]
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
end
