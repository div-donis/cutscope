class ChannelsChannel < ApplicationCable::Channel
    def subscribed
      stop_all_streams
      @channel = Channel.find(params[:channel_query])
      stream_for channel
    end
  
    def received data
     ChannelsChannel.broadcast_to(@channel, {channel: @channel, users: @channel.users, messages: @channel.messages})
    end
    
    def unsubscribed
      stop_all_streams
    end
  end