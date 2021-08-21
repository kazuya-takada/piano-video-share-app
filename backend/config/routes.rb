Rails.application.routes.draw do
  namespace :api, format: "json" do
    namespace :v1 do
			resources :users, only: [:create, :update, :destroy]
      post "/login", to: "auth#login"
      get "/user", to: "auth#get_current_user"
      delete "logout", to: "auth#logout"
    end
  end
end
