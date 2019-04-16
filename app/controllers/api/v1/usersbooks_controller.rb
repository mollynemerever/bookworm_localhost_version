class Api::V1::UsersbooksController < ActionController::Base
  skip_before_action :verify_authenticity_token

  @@all = []

  def create
    @usersbooks = Usersbooks.create(usersbooks_params)
    @@all << @usersbooks
    render json: @usersbooks
  end

  def show
    @usersbooks = Usersbooks.find_by(user_id: params[:id])
    #byebug
    render json: @usersbooks
  end

  private

  def usersbooks_params
    params.permit(:user_id, :book_id)
  end

end
