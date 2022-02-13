class ChannelsController < ApplicationController
    
    def index
        channels = Channel.all
        render json: channels.sort_by{ |x| x.name }
    end

    def show
        channel = Channel.find_by(id: params[:id])
        if channel
          render json: channel
        else
          render json: { error: "channel not found" }, status: :not_found
        end
    end

    def show_with_messages
        channel = Channel.find_by(id: params[:id])
        messages = Message.where("channel_id = ?", channel.id).order("created_at DESC").limit(100)
        if channel && messages
            users = channel.users
            render json: { 
                id: channel.id, 
                name: channel.name, 
                subject: channel.subject, 
                users: users.map { |user| {
                    id: user.id,
                    username: user.username
                }
                },
                messages: messages.map { |message| 
                    if message.content != 'F4FvR%DfmyOEbaP=K3aZ' then {
                        id: message.id,
                        content: message.content,
                        channel_id: message.channel_id,
                        user_id: message.user_id,
                        votes: message.votes,
                        user_username: message.user.username,
                        user_profile_image_url: message.user.profile_image_url,
                        created_at: message.created_at
                    }   
                    end
                }.compact
            }
        else
            render json: { error: "channel not found" }, status: :not_found
        end
    end
    
    def create
        channel = Channel.create(channel_params)
        if channel.valid?
        render json: channel, status: :created
        else
        render json: { errors: channel.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show_by_name
        channels = Channel.where("name like ?", "#{params[:name]}%")
        filteredChannels = channels.reject{|x| @current_user.channels.include? x}
        if filteredChannels
            render json: filteredChannels
        else
            render json: { error: "channel not found" }, status: :not_found
        end
    end

    private

    def channel_params
        params.permit(:name, :subject)
    end
    
end
