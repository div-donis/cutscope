class Channel < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :users, through: :messages
    validates :name, presence: {on: :create}, length: {minimum: 3}, uniqueness: true
    validates :subject, presence: {on: :create}, length: {minimum: 3}
end
