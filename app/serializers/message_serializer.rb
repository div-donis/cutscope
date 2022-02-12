class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :channel_id, :user_id, :votes, :user_username, :user_profile_image_url, :created_at

  def user_username
    object.user.username
  end

  def user_profile_image_url
    object.user.profile_image_url
  end

end
