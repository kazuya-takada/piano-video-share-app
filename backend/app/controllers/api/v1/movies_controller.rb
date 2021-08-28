class Api::V1::MoviesController < ApplicationController
  skip_before_action :login_required, only: [:index, :show, :destroy]
  before_action :set_movie, only: [:show, :destroy]

  def index
    render json: Movie.all, methods: [:movie_url]
  end

  def create
    movie = current_user.movies.new(movie_params)
    if movie.save
      render json: movie, methods: [:movie_url]
    else
      render json: movie.errors.full_messages, status: 422
    end
  end

  def show
    render json: @movie, methods: [:movie_url]
  end

  def destroy
    @movie.destroy
    render json: @movie
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :introduction, :movie)
  end

  def set_movie
    @movie = Movie.find(params[:id])
  end
end
