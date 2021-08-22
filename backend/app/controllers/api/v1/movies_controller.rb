class Api::V1::MoviesController < ApplicationController
  skip_before_action :login_required, only: :index

  def index
    render json: Movie.all, methods: [:movie_url]
  end

  def create
    movie = Movie.new(movie_params)
    if movie.save
      render json: movie, methods: [:movie_url]
    else
      render json: movie.errors.full_messages, status: 422
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :introduction, :movie)
  end
end
