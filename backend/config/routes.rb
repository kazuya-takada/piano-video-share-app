Rails.application.routes.draw do
  namespace :api, format: "json" do
    namespace :v1 do
      post "/login", to: "auth#login"
      get "/user", to: "auth#get_current_user"
      delete "logout", to: "auth#logout"
			resources :users, only: [:create, :show, :update, :destroy]
      resources :movies, only: [:index, :create, :show, :update, :destroy]
    end
  end
end
