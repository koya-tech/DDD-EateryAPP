# Eatery App - Frontend

Welcome to the frontend repository of the Restaurant Sharing App! This README provides an overview of the frontend structure, technologies used, and how to set up the development server locally.

## Directory Structure

The directory is organized by components to ensure modularity and maintainability. This structure helps avoid tight coupling between components, enabling ease of testing, reuse, and scalability. Each component resides in its own folder with relevant files, such as JavaScript/TypeScript, styles, and tests.

Example:

```
src/
  components/
    Header/
      Header.tsx
      Header.test.tsx
    Footer/
      Footer.tsx
      Footer.test.tsx
```

## Technologies Used

The following tools and frameworks are utilized in the project:

- **React**: For building user interfaces.
- **Tailwind CSS**: For styling components with utility-first CSS classes.
- **Vite**: A fast build tool and development server.
- **ShadCN UI**: For consistent and accessible component designs.
- **Storybook**: For isolating and testing components during development.

## Development Setup

To run the development server locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed on your system. Then run:

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

   This command starts the Vite development server. By default, the app will be accessible at `http://localhost:3000`.

4. **Run Storybook** (Optional)
   To view and test individual components:
   ```bash
   npm run storybook
   ```
