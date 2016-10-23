# Running locally

Install the required dependencies:

> npm install

Set an environment variable to point to the location of your MongoDB instance (e.g. 127.0.0.01 for localhost, or the specific IP/hostname if not localhost)

> export MONGODB_ADDRESS=127.0.0.1

Run Express:

> npm start

# Running locally using Docker

Use docker-compose to build the service and mongodb containers:

> docker-compose build

Then start the the containers:

> docker-compose up
