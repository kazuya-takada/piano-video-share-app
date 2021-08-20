class Api::V1::AuthController < ApplicationController

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
    current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    render json: current_user
  end

  def logout
    reset_session
  end
end
