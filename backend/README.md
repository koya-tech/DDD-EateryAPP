# Restaurant Sharing App - Backend

Welcome to the backend repository of the Restaurant Sharing App! This README provides an overview of the backend structure, technologies used, and how to set up the development server locally.

## Architecture

The backend follows the principles of **Domain-Driven Design (DDD)**. The project is structured into four layers:

1. **Domain**: Contains the core business logic, entities, and value objects. This layer is independent of frameworks and external dependencies, ensuring high reusability and testability.
2. **Application**: Manages application-specific logic, including use cases and application services. It interacts with the domain layer and serves as a bridge between the domain and the infrastructure layers.
3. **Infrastructure**: Handles communication with external systems such as databases and third-party services. This layer uses tools like MongoDB and Mongoose.
4. **Presentation**: Contains the Express.js routes and controllers for handling HTTP requests and responses. This layer is responsible for interfacing with the client.

### Benefits of DDD

- **Improved Maintainability**: The clear separation of concerns makes it easier to modify or extend specific parts of the system without affecting others.
- **Scalability**: The modular structure allows the application to grow without becoming overly complex.
- **Alignment with Business Logic**: DDD emphasizes understanding and representing the domain, ensuring the software closely aligns with business needs.

## Technologies Used

The backend utilizes the following tools and frameworks:

- **TypeScript**: For type-safe development and better code quality.
- **Node.js**: As the runtime environment.
- **Express.js**: For building the RESTful API.
- **MongoDB**: As the database.
- **Mongoose**: For object modeling and schema validation.
- **Jest**: For testing the application.

## Development Setup

To run the development server locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**
   Ensure you have Node.js and MongoDB installed on your system. Then run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and configure the necessary environment variables. Example:

   ```env
   MONGO_URI=mongodb://localhost:xxx/yyyyyyyy
   PORT=5000
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   ```

   The server will be accessible at `http://localhost:5000` by default.

5. **Run Tests**
   To execute the test suite:
   ```bash
   npm run dev
   ```
