class Api::V1::StaticpagesController < ActionController::Base

def index
  render file: 'public/index.html'


end


end
