class Message < ApplicationRecord
    belongs_to :user
    belongs_to :channel
    validates :content, presence: {on: :create}
end
