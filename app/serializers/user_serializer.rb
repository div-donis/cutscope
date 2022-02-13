class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :profile_image_url, :channels

  def channels
    object.channels.uniq
  end

end
