class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  def create
    user = User.new(sign_up_params)
    if user.save
      render json: user
    else
      render json: { errors: user.errors }, status: 422
    end
  end

  private

  def sign_up_params
    params.require(:registration).permit(:name, :email, :password, :password_confirmation)
  end
end
