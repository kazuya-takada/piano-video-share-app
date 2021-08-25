class Api::V1::UsersController < ApplicationController
  wrap_parameters include: [:name, :email, :password, :password_confirmation]
  skip_before_action :login_required, only: :create
  before_action :set_user, only: [:update, :destroy]

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      # 422でないとerrors.full_messagesが使えない
      render json: user.errors.full_messages, status: 422
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    reset_session
    @user.destroy
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
