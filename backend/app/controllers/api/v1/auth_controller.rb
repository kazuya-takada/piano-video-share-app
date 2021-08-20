class Api::V1::AuthController < ApplicationController

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      # render json: { message: 'ログインしました。', name: user.name }
    else
      render json: { errors: ['メールアドレスまたはパスワードが正しくありません。'] }, status: 422
    end
  end
end
