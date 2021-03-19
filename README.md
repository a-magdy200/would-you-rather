# Would you rather? A voting web app

**Description**

A simple react application to create polls, or answer polls created by other users.

[View Demo](https://agile-peak-81814.herokuapp.com/)

The project uses express server, aws s3 storage, mongoDB cloud database

*This project has been done for in Udacity's Web development advanced Nanodegree program - EgFWD scholarship*

# Installation:
- Install Packages
- Add The Environment Variables **Described at the end**
- Run Server
- Build The Front-end

Clone the repo then run

### `yarn install` to install the server dependencies.

### `yarn start` or `yarn watch` to run the express server locally

For the frontend you can either run:
**You have to rebuild/start the react app to avoid running an old built version**

1)
### `yarn build` to install the dependencies for react app, then build it in production mode

or

2)
from ./client directory run
### `yarn install` to install react app dependencies for
then
### `yarn start` to run the react app development server **Please make sure that you will run this command inside `./client` directory**

**Please note that you have to add a `.env` file**
`SERVER_PORT` Server port (default is 3000) you have to assign a different value in case that you want to run react development server ( which runs on port 3000 )

`ENVIRONMENT` (`development` | `production`) **Please note that `development` will use `DB_DEV` variables, and `production` will use `DB_PROD` variables**

`APP_SECRET` Any string will work as a secret for jwt hashing


`S3_ACCESS_KEY_ID` **S3 access id to connect to s3 bucket**

`S3_ACCESS_KEY_SECRET` **S3 access secret to connect to s3 bucket**

`S3_DEFAULT_REGION` **S3 bucket region, for example `us-west-3`**

`S3_BUCKET` **S3 bucket name that the application will upload pictures to**




`DB_PROD_URL` **Production database connection string**

`DB_PROD_DB_NAME` **Production database name**

`DB_PROD_USERNAME` **Production database username**

`DB_PROD_PASSWORD` **Production database password**


`DB_DEV_URL` **Development database connection string**

`DB_DEV_DB_NAME` **Development database name**

`DB_DEV_USERNAME` **Development database username**

`DB_DEV_PASSWORD` **Development database password**


