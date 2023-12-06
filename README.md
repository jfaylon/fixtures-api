
## Preqrequisites

This API must be connected to a MySQL server for this to work.

## Installation

### Install node modules
After cloning the repository, Go to the folder and install the modules

```bash
  npm install
```
OR 
```bash
  npm ci
```

### Add ENVs
Next, add your `.env` file to the root directory.

It will look like this. Please provide the necessary inputs:

```
PORT=
MYSQL_DB_NAME=
MYSQL_USERNAME=
MYSQL_PASSWORD=
MYSQL_HOST=
NODE_ENV=
TEST_DATA=
```

OR

You can copy the `.env.example` provided and paste it as `.env`

The `.env.example` contains these:

```
PORT=3000
MYSQL_DB_NAME=fixtures
MYSQL_USERNAME=root
MYSQL_PASSWORD=root
MYSQL_HOST=localhost
NODE_ENV=development
ADD_TEST_DATA=true
```

For unit/integration tests, please add your `test.env` file under the `tests/global` folder.

You can also use the `test.env.example` as reference:

```
MYSQL_DB_NAME=fixtures_test
MYSQL_USERNAME=root
MYSQL_PASSWORD=root
MYSQL_HOST=localhost
NODE_ENV=test
```

### Populate the Database
A `seeds.js` file has been provided to create the database and its tables and add test data (if `ADD_TEST_DATA` is set to true).

To run this, just type:

```
npm run seed:create
```

## Running the application
There are 2 ways:

- If you want to restart the application based on any change in the code (Only for development purposes):

```
npm run start:dev
```
OR
-  The normal way which requires restart for every change (Ideal for production environment):

```
npm run start
```

## Testing
You can run the unit tests by running this command:

```
npm run test
```

## API Documentation

It can be found by calling the route `/api-docs` upon running the application.

Example:

```
http://localhost:3000/api-docs
```

OR

It can be found in the `assets/api-documentation.pdf` in the repository

## Notes

### Assumptions
- This API is only for retrieving data. There are no routes for adding, modifying, or deleting data.
- Since the authentication module is assumed but there is no information about its business rules and its mechanisms, no middleware has been created to utilise such. Thus, this API is unsecure and all users may query the API.
- New data is added/modified by another module or a direct database change.

### Tech Limitations and Possible Improvements
- For the tests, a real MySQL database needs to be used because there is no in-memory MySQL database. I have tried using sqlite for in-memory but there are syntax mismatches particularly the date format.
- There may be redundancies in using the res.json. It can be improved by having a common function to format the response object.
- There may be a better way of handling error objects to identify and differentiate the errors.
- This has been developed using Node v21.2.0. The application has not yet been tested for older or newer versions.