class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :avatar, :channels, :profile_image_url

  def channels
    object.channels.uniq
  end

end
