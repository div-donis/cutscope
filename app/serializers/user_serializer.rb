class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar, :channels

  def channels
    object.channels.uniq
  end
  
end
