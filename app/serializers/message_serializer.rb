class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :channel_id, :user_id, :votes, :user_username, :user_avatar, :created_at

  def user_username
    object.user.username
  end

  def user_avatar
    object.user.avatar
  end

end
