class Api::V1::UsersController < ApplicationController
  wrap_parameters include: [:name, :email, :password, :password_confirmation]

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
