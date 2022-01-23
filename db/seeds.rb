# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
100.times do 
    password = Faker::Internet.password(min_length: 8, max_length: 20)
    User.create(
        username: Faker::Internet.unique.username(specifier: 3..20),
        avatar: 'https://i.imgur.com/qbBOch9.png',
        password: password,
        password_confirmation: password
    )
end
5.times do 
    Channel.create(
        name: Faker::Internet.unique.domain_word(specifier: 3..20),
        subject: Faker::Movie.unique.title
    )
end
800.times do 
    Message.create(
        content: ,
        channel_id: Faker::Number.within(range: 1..5),
        user_id: Faker::Number.within(range: 1..100),
        votes: 0,
    )
end
