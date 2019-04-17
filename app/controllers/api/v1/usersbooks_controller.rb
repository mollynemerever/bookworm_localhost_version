class Api::V1::UsersbooksController < ActionController::Base
  skip_before_action :verify_authenticity_token

  @@all = []

  def create
    @usersbooks = Usersbooks.create(usersbooks_params)
    @@all << @usersbooks
    render json: @usersbooks
  end

  def show
    @usersbooks = Usersbooks.where(user_id: params[:id])
    render json: @usersbooks
  end

  def destroy
    @usersbooks = Usersbooks.where(user_id: params[:user_id], book_id: params[:book_id])
    Usersbooks.delete(@usersbooks)
  end

  private

  def usersbooks_params
    params.permit(:user_id, :book_id)
  end

end
