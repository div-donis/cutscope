class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :update]
  # GET /users
  def index
    users = User.all
    render json: users
  end

  # GET /users/1
  def show
    render json: {
      id: @current_user.id,
      username: @current_user.username,
      profile_image_url: @current_user.profile_image_url,
      channels: @current_user.channels.uniq
      
  }, status: :accepted
  end

  # POST /users
  def create
      params = user_params.except(:png)
      user = User.create!(params)
      if user.valid?
      render json: user, status: :created
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

  def destroy
    user = User.find_by(id: params[:id])
    user.destroy
  end

  private

  def user_params
    params.permit(:username, :profile_image_url, :password, :password_confirmation, :png)
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end 

end

