class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :title, null: false, limit: 40
      t.text :introduction, null: false, limit: 200

      t.timestamps
    end
  end
end
