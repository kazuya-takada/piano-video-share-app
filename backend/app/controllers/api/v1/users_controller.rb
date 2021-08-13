class Api::V1::UsersController < ApplicationController
  # before_action :authenticate_api_v1_user!, only: [:index]

  def show
    render json: User.find(params[:id])
  end

  def index
    render json: current_api_v1_user
  end

end