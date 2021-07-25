# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
  VALID_PASSWORD_REGEX = /\A[a-z0-9]+\z/i
  validates :name, presence: true
  validates :password, format: { with: VALID_PASSWORD_REGEX }
  include DeviseTokenAuth::Concerns::User
end
