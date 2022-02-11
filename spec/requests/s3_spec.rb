require 'rails_helper'

RSpec.describe "S3s", type: :request do
  describe "GET /direct_post" do
    it "returns http success" do
      get "/s3/direct_post"
      expect(response).to have_http_status(:success)
    end
  end

end
