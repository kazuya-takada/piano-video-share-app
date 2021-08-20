class ApplicationController < ActionController::API
  include ActionController::Cookies

  # def encode_token(payload)
  #   JWT.encode(payload,'my_secret_key','HS256')
  # end

  # def session_user
  #   decoded_hash = decoded_token
  #   if !decoded_hash.empty?
  #     user_id = decoded_hash[0]['id']
  #     @user = User.find_by(id: user_id)
  #   else 
  #     nil
  #   end
  # end
end
