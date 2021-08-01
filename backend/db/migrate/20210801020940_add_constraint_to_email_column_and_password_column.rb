class AddConstraintToEmailColumnAndPasswordColumn < ActiveRecord::Migration[6.0]
  def change
    def up
      change_column :users, :email, :string, limit: 72
    end
    def down
      change_column :users, :email, :string
    end
  end
end
