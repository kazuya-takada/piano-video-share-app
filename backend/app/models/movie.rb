class Movie < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :movie

  validates :title, presence: true, length: { maximum: 40 }
  validates :introduction, presence: true, length: { maximum: 200 }

  def movie_url
    movie.attached? ? url_for(movie) : nil
  end
end
