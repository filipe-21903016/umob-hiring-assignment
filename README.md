# umob Hiring Assignment

This is a fullstack application for the "umob Hiring Assignment", consisting of a frontend built with Angular and a backend built with Node.js using TypeScript.

## Setting up Environment Variables

1. Navigate to the `backend` directory within the project.

2. Create a new file named `.env`.

3. Define the following environment variable in the `.env` file:
    ```
    CONNECTION_STRING=your_postgres_connection_url_here
    ```
    Replace `your_postgres_connection_url_here` with the actual PostgreSQL database connection URL. For example:
    ```
    CONNECTION_STRING=postgres://username:password@localhost:5432/database_name
    ```

### Using different database connection string than the provided one

1. Navigate to the `backend` directory within the project

2. Delete `migrations` directory

3. Create migrations by running
    ```
    npm run add-migrations
    ```

4. Apply migrations to the database by running
    ```
    npm run update-database
    ```

## Running the Backend Server

To run the backend server, follow these steps:

1. Navigate to the `backend` directory within the project.

2. Install dependencies by running:
    ```
    npm install
    ```

3. Start the backend server in development mode using the following command:
    ```
    npm run dev
    ```
   The backend server should now be running on the specified port.

## Running the Frontend

To run the frontend, follow these steps:

1. Navigate to the `frontend` directory within the project.

2. Install dependencies by running:
    ```
    npm install
    ```

3. Start the frontend server using the following command:
    ```
    ng serve
    ```
   The frontend should now be accessible at `http://localhost:4200`.


## Additional Notes

- Ensure that you have Node.js and npm installed on your machine before running the application.
- Make sure the required ports are not occupied by other processes.
