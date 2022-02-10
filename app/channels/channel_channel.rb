class ChannelChannel < ApplicationCable::Channel

  def subscribed
    stop_all_streams
    @channel = Channel.find(params[:room])
    stream_for @channel
  end

  def receive(data)
    ChannelChannel.broadcast_to(@channel,{ 
        message: @channel.messages.last
      }
  )
  end

  def unsubscribed
    stop_all_streams
  end
end
