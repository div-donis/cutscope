# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
puts 'seeding...'
100.times do 
    password = Faker::Internet.password(min_length: 8, max_length: 20)
    User.create(
        username: Faker::Internet.unique.username(specifier: 3..20),
        avatar: 'https://i.imgur.com/qbBOch9.png',
        password: password,
        password_confirmation: password
    )
end
1.times do 
    User.create(
        username: 'testuser',
        avatar: 'https://i.imgur.com/qbBOch9.png',
        password: 'testuser',
        password_confirmation: 'testuser'
    )
end

5.times do 
    Channel.create(
        name: Faker::Internet.unique.username(specifier: 3..20),
        subject: Faker::Movie.unique.title,
        image: 'https://i.imgur.com/tqwpka0.png'
    )
end

800.times do 
    Message.create(
        content: Faker::TvShows::Friends.quote,
        channel_id: Faker::Number.within(range: 1..5),
        user_id: Faker::Number.within(range: 1..101),
        votes: 0,
    )
end
puts 'done!'