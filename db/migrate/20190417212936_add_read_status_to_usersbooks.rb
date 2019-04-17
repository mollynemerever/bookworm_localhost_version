class AddReadStatusToUsersbooks < ActiveRecord::Migration[5.2]
  def change
    add_column :usersbooks, :read_status, :boolean
  end
end
