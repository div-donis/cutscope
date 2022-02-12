class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :profile_image_url :channels, :profile_image_url

  def channels
    object.channels.uniq
  end

end
