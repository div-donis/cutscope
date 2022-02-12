# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#

pfp_params = [*1..15]

puts 'seeding...'
200.times do 
    password = Faker::Internet.password(min_length: 8, max_length: 20)
    user = User.create(
        username: Faker::Internet.unique.username(specifier: 3..20),
        password: password,
        password_confirmation: password
    )
    pfp_param = pfp_params.sample
    user.profile_image.attach(io: File.open(`./profile_images/pfp#{pfp_param}`), filename: `pfp#{pfp_param}.png`, content_type: 'image/png')
end
1.times do 
    user = User.create(
        username: 'testuser',
        password: 'testuser',
        password_confirmation: 'testuser'
    )
    pfp_param = pfp_params.sample
    user.profile_image.attach(io: File.open(`./profile_images/pfp#{pfp_param}`), filename: `pfp#{pfp_param}.png`, content_type: 'image/png')
end

300.times do 
    Channel.create(
        name: Faker::Internet.unique.username(specifier: 3..20),
        subject: Faker::Movie.title,
        unreads: false
    )
end

4000.times do 
    Message.create(
        content: Faker::Lorem.paragraph(sentence_count: 5, supplemental: true, random_sentences_to_add: 10),
        channel_id: Faker::Number.within(range: 1..300),
        user_id: Faker::Number.within(range: 1..201),
        votes: Faker::Number.within(range: 1..1500),
    )
end
puts 'done!'