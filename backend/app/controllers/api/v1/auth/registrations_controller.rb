class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  # def destroy
  #   user = User.find_by(params[:id])
  #   user.destroy!
  #   render json: user
  # end

  private

  def sign_up_params
    params.require(:registration).permit(:name, :email, :password, :password_confirmation)
  end
end