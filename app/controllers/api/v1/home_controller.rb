class Api::V1::HomeController < ActionController::Base

def index
  render file: 'public/index.html'


end


end
