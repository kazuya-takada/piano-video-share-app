class Api::V1::MoviesController < ApplicationController

  def create
    movie = Movie.new(movie_params)
    if movie.save
      render json: movie
    else
      render json: movie.errors.full_messages, status: 422
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :introduction, :movie)
  end

end
