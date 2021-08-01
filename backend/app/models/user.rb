# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  VALID_PASSWORD_REGEX = /\A[a-z0-9]+\z/i
  validates :name, presence: true, length: { maximum: 30 }
  validates :email, length: { maximum: 72 }
  validates :password, format: { with: VALID_PASSWORD_REGEX }
end
