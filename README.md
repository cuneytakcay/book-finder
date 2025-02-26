# Book Finder

## Description

Book Finder is a web application that allows users to search for books using the Google Books API. Users can enter a query to find books and navigate through the results with pagination. Users can also view details about each book and create an account to save, update, and delete books. The app provides a user-friendly interface to explore the latest books based on their search criteria.

## Features

- Search for books by title, author, or keywords.
- View a list of books with details such as title, author, and a short description.
- Pagination support to navigate through multiple pages of results.
- Loading spinner to indicate when data is being fetched.
- Error handling for API requests.
- Register to create an account.
- Login to save, update, and delete books to/from a user's account.

## Demo

You can view a live demo of the Book Finder application at <a href="https://book-finder-app-gumq.onrender.com/" target="_blank">Book Finder Demo</a>.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool and development environment.
- **TypeScript**: A superset of JavaScript that adds optional static typing and other features.
- **Redux Toolkit**: For state management and handling asynchronous actions.
- **Axios**: For making HTTP requests to the Google Books API.
- **CSS Modules**: For styling components.

### Backend

- Node.js
- Express
- MongoDB
- TypeScript

## Installation

To get started with Book Finder, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/cuneytakcay/book-finder.git
   ```

2. Set the environment variables [see the .env Files Setup section for details](#env-files-setup)

3. Navigate to the project directory:

   ```bash
   cd book-finder
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the development app:

   ```bash
   npm start
   ```

6. Open your browser and go to `http://localhost:5173` to view the app.

## .env Files Setup

1. Create a `.env` file in the `api` folder and add the following environment variables:

   ```
   MONGO_URL=your_database_url_here
   JWT_SECRET_KEY=your_jwt_secret_key_here
   CRYPTO_SECRET_KEY=your_crypto_secret_key_here
   ```

   _Make sure to replace the placeholder values with your actual secret keys and database URL._

2. Create a `.env` file in the `client` folder and add the following environment variables:
   ```
   VITE_REACT_APP_API_URL=http://localhost:5000
   MODE=development
   ```

## Usage

1. Enter your search query in the input field.
2. Click the search button or press Enter to fetch the results.
3. Use the pagination controls to navigate through the pages of results.
4. Click on a book to view more details (if applicable).
5. Create an account.
6. Login to save, update, and delete books to/from your account.

## Contributing

If you'd like to contribute to Book Finder, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
