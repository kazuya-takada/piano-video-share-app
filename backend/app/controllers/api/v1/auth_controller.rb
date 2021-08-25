class Api::V1::AuthController < ApplicationController
  skip_before_action :login_required, only: :login
  before_action :current_user, only: :get_current_user

  def login
    user = User.find_by(email: user_params[:email])
    if user&.authenticate(user_params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: ['メールアドレスまたはパスワードが正しくありません。'] }, status: 401
    end
  end

  def get_current_user
    render json: @current_user
  end

  def logout
    reset_session
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
