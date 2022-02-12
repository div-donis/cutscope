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
      user = User.create(user_params)
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
    if user.update(params.permit(:png, :username))
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
      params.permit(:username, :avatar, :password, :password_confirmation, :png)
    end

    def password_params
      params.require(:user).permit(:password, :password_confirmation)
    end 
end

