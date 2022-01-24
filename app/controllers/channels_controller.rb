class ChannelsController < ApplicationController
   skip_before_action :authorize, only: [:create, :index]
    
    def index
        channels = Channel.all
        render json: channels.sort_by{ |x| x.name }
    end

    def show_by_name
        channel = Channel.find_by(name: params[:name])
        render json: channel
    end
end
