class AddCommentsToUsersbooks < ActiveRecord::Migration[5.2]
  def change
    add_column :usersbooks, :comment, :text
  end
end
