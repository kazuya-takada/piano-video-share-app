class User < ApplicationRecord
  has_secure_password
  before_save { self.email = email.downcase }

  VALID_PASSWORD_REGEX = /\A[a-z0-9]+\z/i
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :name, presence: true, length: { maximum: 30 }
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 72 }
  validates :password, format: { with: VALID_PASSWORD_REGEX }, length: {minimum: 8, maximum: 30 }
end
