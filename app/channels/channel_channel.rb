class ChannelChannel < ApplicationCable::Channel

  def subscribed
    stop_all_streams
    @channel = Channel.find(params[:room])
    stream_for @channel
  end

  def receive(data)
    message = @channel.messages.last
    ChannelChannel.broadcast_to(@channel,{ 
      message: MessageSerializer.new(message)
    }
  )
  end

  def unsubscribed
    stop_all_streams
  end
end
