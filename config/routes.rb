Rails.application.routes.draw do

  post "/login", to: "sessions#create" 

  post "/signup", to: "users#create" 

  get "/self", to: "users#show" 

  delete "/logout", to: "sessions#destroy" 

  scope '/api' do 

    resources :users 
    resources :channels
    resources :messages

    get '/channels/by_name/:name', to: 'channels#show_by_name'

    get '/messages/by_channel/:channel_id', to: 'messages#show_by_channel'
  
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
