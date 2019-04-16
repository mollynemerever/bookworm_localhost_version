class Api::V1::BooksController < ActionController::Base
  skip_before_action :verify_authenticity_token

    def create #save book to db
      @book = Book.create(book_params)
      render json: @book
    end

    def show
      #byebug
      @book = Book.find(params[:id])
      render json: @book
    end

  private

  def book_params
    params.require(:book).permit(:title, :author, :photo_url,:description)
  end



end
