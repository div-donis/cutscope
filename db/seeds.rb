# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#

avis = [
    'https://i.imgur.com/j9adtcsb.jpg', 
    'https://i.imgur.com/hORmgOsb.jpg',
    'https://i.imgur.com/TYxKjukb.jpg', 
    'https://i.imgur.com/nyTHuLVb.jpg',
    'https://i.imgur.com/HrUQ8Cib.jpg', 
    'https://i.imgur.com/Qc24rcNb.jpg', 
    'https://i.imgur.com/z4FM34eb.jpg', 
    'https://i.imgur.com/dCMd9uWb.jpg', 
    'https://i.imgur.com/07FBkCsb.jpg', 
    'https://i.imgur.com/eYGS5Psb.jpg', 
    'https://i.imgur.com/pjBFyZ7b.jpg',
    'https://i.imgur.com/B22CBfFb.jpg',
    'https://i.imgur.com/EBR8rOQb.jpg',
    'https://i.imgur.com/EdZlPkKb.jpg',
    'https://i.imgur.com/aRy02l9b.jpg',
    'https://i.imgur.com/B7p0WWXb.jpg',
    'https://i.imgur.com/dZtFNGcb.jpg',
    'https://i.imgur.com/douh7U1b.jpg'
]

puts 'seeding...'
200.times do 
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