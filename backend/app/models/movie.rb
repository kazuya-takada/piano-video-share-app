class Movie < ApplicationRecord
  has_one_attached :movie

  validates :title, presence: true, length: { maximum: 40 }
  validates :introduction, presence: true, length: { maximum: 200 }
end
