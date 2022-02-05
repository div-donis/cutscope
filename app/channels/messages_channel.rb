class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @channel = Channel.find(params[:id])
    stream_for @channel
  end

  def receive(data)
    def receive(data)
      user = User.find_by(id: data['user.id'])
      message = @channel.messages.create(content: data['content'], user: user)
      MessagesChannel.broadcast_to(@channel, MessageSerializer.new(message).serialized_json)
    end
  end

  def unsubscribed
    stop_all_streams
  end
end
