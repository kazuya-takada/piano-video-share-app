class AddUserIdToMovies < ActiveRecord::Migration[6.0]
  def up
    execute 'DELETE FROM movies;'
    add_reference :movies, :user, null: false, index: true
  end

  def down
    remove_reference :movies, :user, index: true
  end
end
