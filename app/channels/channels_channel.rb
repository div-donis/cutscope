class ChannelsChannel < ApplicationCable::Channel

  def subscribed
    stop_all_streams
    @channel = Channel.find(params[:room])
    stream_for @channel
  end

  def receive(data)
    ChannelsChannel.broadcast_to(@channel,{ 
      channel: @channel,
      users: @channel.users,
      messages: @channel.messages
    })
  end

  def unsubscribed
    stop_all_streams
  end
end
