class MessagesController < ApplicationController

    def index
        messages = Message.all
        render json: messages.sort_by{ |x| x.created_at } 
    end

    def show
        message = Message.find_by(id: params[:id])
        if message
          render json: message
        else
          render json: { error: "message not found" }, status: :not_found
        end
    end

    def create
        message = Message.new(message_params)
        if message.save
            channel = message.channel
            user = message.user
            ChannelChannel.broadcast_to(channel,{ 
                message: message,
                user: user
            })
            render json: message, status: :created
        else
            render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        message = Message.find_by(id: params[:id])
        message.destroy
    end

    def show_by_channel
        message = Message.where(channel_id: params[:channel_id]).order("created_at DESC").limit(100)
        if message
            render json: message.select{|x| x.content != '000connectfixlink000'}
        else
            render json: { error: "messages not found" }, status: :not_found
        end
    end

    def update
        message = Message.find_by(id: params[:id])
        if message.update(params.permit(:votes))
          render json: message
        else
          render json: message.errors, status: :unprocessable_entity
        end
    end

    private

    def message_params
        params.permit(:content, :user_id, :channel_id, :votes, :created_at)
    end
end
