class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :update]
  # GET /users
  def index
    users = User.all
    render json: users
  end

  # GET /users/1
  def show
    render json: @current_user, status: :accepted
  end

  # POST /users
  def create
      profile_image = 'eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40100bc98c88ed073b17bcf518a49dac5c07f43d'
      params = user_params.except(:png)
      user = User.create!(params)
      user.profile_image.attach(profile_image) if  profile_image.present?
      if user.valid?
      render json: user.as_json(root: false, methods: :profile_image_url), status: :created
      else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def update
    profile_image = params[:png]
    user = User.find_by(id: params[:id])
    user.profile_image.attach(profile_image) if profile_image.present?
    if user.update(params.permit(:profile_image, :username))
      render json: user.as_json(root: false, methods: :profile_image_url).except('password_digest')
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    user = User.find_by(id: params[:id])
    user.destroy
  end

  private

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :profile_image_url, :password, :password_confirmation, :png)
    end

    def password_params
      params.require(:user).permit(:password, :password_confirmation)
    end 
end

