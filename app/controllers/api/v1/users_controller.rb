class Api::V1::UsersController < ActionController::Base
  skip_before_action :verify_authenticity_token

  @@all = []

  # def index
  # end

  def create #create and save user to db
    if User.find_by(username: params[:username]) #if username exists
      @user = User.find_by(username: params[:username]) #if username exists
      render json: @user #return the instance of the user
    else
      @user = User.create(user_params) #create user
      @@all << @user
      render json: @user
    end
  end

  def index

  end

  private

  def user_params
    params.require(:user).permit(:username)
  end

end
