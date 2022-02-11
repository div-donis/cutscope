class ChannelChannel < ApplicationCable::Channel

  def subscribed
    stop_all_streams
    @channel = Channel.find(params[:room])
    stream_for @channel
  end

  def receive(data)
    ChannelChannel.broadcast_to(@channel,{ 
      message: @channel.messages.last,
      user: @channel.messages.last.user
    }
  )
  end

  def unsubscribed
    stop_all_streams
  end
end
