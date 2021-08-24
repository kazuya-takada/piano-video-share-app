class Movie < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :movie

  validates :title, presence: true, length: { maximum: 40 }
  validates :introduction, presence: true, length: { maximum: 200 }
  validates :movie, attached: true, content_type: { in: %w[video/mp4 video/mov video/wmv] }, 
            size: { less_than: 500.megabytes , message: 'ファイルサイズは500Mb以下にしてください' }

  def movie_url
    movie.attached? ? url_for(movie) : nil
  end 
end
