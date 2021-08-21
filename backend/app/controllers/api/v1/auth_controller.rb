class Api::V1::AuthController < ApplicationController
  skip_before_action :login_required, only: :login
  before_action :current_user, only: :get_current_user

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: ['メールアドレスまたはパスワードが正しくありません。'] }, status: 422
    end
  end

  def get_current_user
    render json: @current_user
  end

  def logout
    reset_session
  end
end
