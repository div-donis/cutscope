class ChannelsController < ApplicationController
    
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
    
    def create
        channel = Channel.create(channel_params)
        if channel.valid?
        render json: channel, status: :created
        else
        render json: { errors: channel.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show_by_name
        channel = Channel.where("name like ?", "#{params[:name]}%")
        if channel
            render json: channel
        else
            render json: { error: "channel not found" }, status: :not_found
        end
    end

    private

    def channel_params
        params.permit(:name, :subject)
    end
    
end
