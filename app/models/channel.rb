class Channel < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :users, through: :messages
    validates :name, presence: {on: :create}, length: {minimum: 3}, uniqueness: true
    validates :subject, presence: {on: :create}, length: {minimum: 3}
    before_save :downcase_fields

    def downcase_fields
        self.name.downcase!
    end

    def self.by_name(name)
        Channel.where(name: name)
    end

end