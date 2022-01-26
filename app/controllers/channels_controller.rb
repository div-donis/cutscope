class ChannelsController < ApplicationController
   skip_before_action :authorize, only: [:create, :index, :show]
    
    def index
        channels = Channel.all
        render json: channels.sort_by{ |x| x.name }
    end

    def show
        channel = Channel.find_by(id: params[:id])
        if channel
          render json: channel
        else
          render json: { error: "channel not found" }, status: :not_found
        end
    end

    def show_by_name
        channel = Channel.find_by(name: params[:name])
        render json: channel
    end
    
end
