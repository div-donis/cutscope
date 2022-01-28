# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#

avis = ['https://i.imgur.com/hORmgOsb.jpg','https://i.imgur.com/TYxKjukb.jpg', 'https://i.imgur.com/nyTHuLVb.jpg' ,'https://i.imgur.com/HrUQ8Cib.jpg', 'https://i.imgur.com/Qc24rcNb.jpg', 'https://i.imgur.com/z4FM34eb.jpg', 'https://i.imgur.com/dCMd9uWb.jpg', 'https://i.imgur.com/07FBkCsb.jpg', 'https://i.imgur.com/eYGS5Psb.jpg', 'https://i.imgur.com/pjBFyZ7b.jpg']
channels = ['https://i.imgur.com/fyToB3Bb.jpg', 'https://i.imgur.com/QiVyIU8b.jpg', 'https://i.imgur.com/kuuOaA8b.jpg', 'https://i.imgur.com/7lcNooHb.jpg', 'https://i.imgur.com/eGMM8zGb.jpg', 'https://i.imgur.com/lOaw1qvb.jpg']
puts 'seeding...'
100.times do 
    password = Faker::Internet.password(min_length: 8, max_length: 20)
    User.create(
        username: Faker::Internet.unique.username(specifier: 3..20),
        avatar: avis.sample,
        password: password,
        password_confirmation: password
    )
end
1.times do 
    User.create(
        username: 'testuser',
        avatar: avis.sample,
        password: 'testuser',
        password_confirmation: 'testuser'
    )
end

20.times do 
    Channel.create(
        name: Faker::Internet.unique.username(specifier: 3..20),
        subject: Faker::Movie.unique.title,
        image: channels.sample
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