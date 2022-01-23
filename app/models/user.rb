class User < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :channels, through: :messages
    has_secure_password
    validates :password, presence: {on: :create}, confirmation: {case_sensitive: true}, length: {minimum: 8}
    validates :password_confirmation, presence: {on: :create}
    validates :username, presence: {on: :create}, length: {minimum: 3, maximum: 20}, uniqueness: true

end
