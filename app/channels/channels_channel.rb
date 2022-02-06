class ChannelsChannel < ApplicationCable::Channel

  def subscribed
    @channel = Channel.find(params[:room])
    stream_for @channel
  end

  def receive(data)
    ChannelsChannel.broadcast_to(@channel,{ 
      message: @channel.messages.last
    })
  end

  def unsubscribed
    stop_all_streams
  end
end
