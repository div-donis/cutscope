class Message < ApplicationRecord
    belongs_to :user
    belongs_to :channel
    validates :content, presence: {on: :create}

    def self.match_channel(id)
        Message.where(channel_id: id).sort_by{ |x| x.created_at}.reverse
    end
end
