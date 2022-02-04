class Message < ApplicationRecord
    belongs_to :user
    belongs_to :channel
    validates :content, presence: {on: :create}

    after_create_commit { MessageBroadcastJob.perform_later(self)}
end
