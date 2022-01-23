class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :channel_id, :user_id, :votes
end
