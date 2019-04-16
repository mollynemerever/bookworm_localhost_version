Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :books
      resources :users
      resources :home
      resources :usersbooks
    end
  end

end
