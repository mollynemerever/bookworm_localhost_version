class Api::V1::UsersController < ActionController::Base
  skip_before_action :verify_authenticity_token

  @@all = []

  # def index
  # end

  def create #save user to db
    @user = User.create(user_params)
    @@all << @user
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end

end
