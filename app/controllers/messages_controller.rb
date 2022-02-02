class MessagesController < ApplicationController
    def index
        messages = Message.all
        render json: messages.sort_by{ |x| x } 
    end

    def create
        message = Message.create(message_params)
        if message.valid?
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
        message = Message.where(channel_id: params[:channel_id]).order("created_at DESC")
        if message
            render json: message
        else
            render json: { error: "messages not found" }, status: :not_found
        end
    end

    private

    def message_params
        params.permit(:content, :user_id, :channel_id, :votes, :created_at)
    end
end
