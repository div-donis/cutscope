# protoswim

## React/Rails Project with Action Cable Websockets and AWS S3 Services

### Chat/Channel App, inspired by Slack & Discord

To launch this project in localhost, fork this repository then run:
```
bundle install
npm install --prefix client
```
You can use the following commands to run the application:

`rails s`

runs the backend on http://localhost:3000

`npm start --prefix client`

runs the frontend on http://localhost:4000

To seed the database run:
```
rails db:migrate
rails db:seed
```
in the db directory, seeds.rb holds test user. You can use this information to log in:

`username: 'testuser' password: 'testuser'`

This build is in development. Feel free to contact me or make pull requests.