class ChangeEmailAndPasswordDigestColumn < ActiveRecord::Migration[6.0]
  def up
    change_column :users, :password_digest, :text, limit: 72
    change_column :users, :email, :text, limit: 72
  end

  def down
    change_column :users, :password_digest, :string
    change_column :users, :email, :text
  end
end
