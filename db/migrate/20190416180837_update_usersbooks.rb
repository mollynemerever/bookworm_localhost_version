class UpdateUsersbooks < ActiveRecord::Migration[5.2]
  def change
    rename_table :users_books, :usersbooks
  end
end
