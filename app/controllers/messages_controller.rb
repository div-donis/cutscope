class MessagesController < ApplicationController
    def index
        messages = Message.all
        render json: messages.sort_by{ |x| x }
    end
end
