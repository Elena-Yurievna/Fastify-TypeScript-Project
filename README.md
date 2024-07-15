# Fastify TypeScript Project

This project is a Fastify-based server written in TypeScript. It provides routes for sending HTTP requests and logging their details, including request and response headers, to a SQLite database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/fastify-ts-project.git
    ```

2. Navigate to the project directory:

    ```sh
    cd fastify-ts-project
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

## Usage

1. To start the server in development mode, run:

    ```sh
    npm run dev
    ```

2. Open your browser and navigate to:

    ```
    http://localhost:3000
    ```

## Project Structure

 ```
fastify-ts-project
├── node_modules
├── public
│ └── style.css
├── src
│ ├── routes
│ │ ├── detailed.ts
│ │ ├── home.ts
│ │ └── request.ts
│ ├── types
│ │ └── interfaces.ts
│ ├── views
│ │ ├── detailed.ejs
│ │ ├── home.ejs
│ │ └── request.ejs
│ ├── db.ts
│ ├── index.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```


## Routes

### GET /request

Renders the form for sending HTTP requests.

### POST /send-request

Sends an HTTP request based on the form data and logs the request and response details to the database.

### GET /log/:id

Displays the details of a specific log entry.

### GET /

Displays the home page with a list of all logged requests.

## Database

The project uses SQLite to store logs. The logs include the following information:
- `timestamp`: The timestamp of the request.
- `url`: The URL of the request.
- `method`: The HTTP method used for the request.
- `body`: The body of the request.
- `status`: The HTTP status code of the response.
- `response`: The response data.
- `requestHeaders`: The headers of the request.
- `responseHeaders`: The headers of the response.

### Initialization and Migration

The database is initialized and migrated automatically when the server starts. If there are any changes to the database schema, the migration will be applied during the server startup.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.# Fastify-TypeScript-Project
