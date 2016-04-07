Rails.application.routes.draw do
  resources :hotels
  get '/list', to: 'hotels#list'
  get '/filter/:filter_str', to: 'hotels#filter'
  root 'hotels#index'
end
