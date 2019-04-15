class Api::V1::HomeController < ActionController::Base
skip_before_action :verify_authenticity_token


def index
  render file: 'public/index.html'
end


end
