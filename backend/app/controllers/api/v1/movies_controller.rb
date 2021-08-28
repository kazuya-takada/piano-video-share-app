class Api::V1::MoviesController < ApplicationController
  skip_before_action :login_required, only: [:index, :show]
  before_action :set_movie, only: [:show, :update, :destroy]
  before_action :is_post_user?, only: [:update, :destroy]

  def index
    render json: Movie.all.includes(:user), methods: [:movie_url]
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

  def update
    if @movie.update(movie_edit_params)
      render json: @movie
    else
      render json: @movie.errors.full_messages, status: 422
    end
  end

  def destroy
    @movie.destroy
    render json: @movie
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :introduction, :movie)
  end

  def movie_edit_params
    params.require(:movie).permit(:title, :introduction)
  end

  def set_movie
    @movie = Movie.find(params[:id])
  end

  def is_post_user?
    if @movie.user != current_user
      return
    end
  end
end
