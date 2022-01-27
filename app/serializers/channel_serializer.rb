class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :name, :subject, :image
  has_many :messages
  
  def messages 
    object.messages.sort_by{ |x| x.created_at}.reverse
  end
end
