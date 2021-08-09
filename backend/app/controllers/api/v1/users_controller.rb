class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:index]

  def show
    render json: User.find(params[:id])
  end

  def index
    render json: current_api_v1_user
  end

  # 
  # ログイン後の一覧表示ではcurrent_user取得されないので、それの処理
end