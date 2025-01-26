# Book Finder

## Description

Book Finder is a web application that allows users to search for books using the Google Books API. Users can enter a query to find books and navigate through the results with pagination. The app provides a user-friendly interface to explore the latest books based on their search criteria.

## Features

- Search for books by title, author, or keywords.
- View a list of books with details such as title, author, and a short description.
- Pagination support to navigate through multiple pages of results.
- Loading spinner to indicate when data is being fetched.

## Upcoming Features

- **Login and Register Functionality**: In progress. Users will be able to create their own accounts, allowing them to manage personal book lists with options to categorize books as 'to read' or 'read', add their own notes, and more.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool and development environment.
- **TypeScript**: A superset of JavaScript that adds optional static typing and other features.
- **Redux Toolkit**: For state management and handling asynchronous actions.
- **Axios**: For making HTTP requests to the Google Books API.
- **CSS Modules**: For styling components.

## Installation

To get started with Book Finder, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/cuneytakcay/book-finder.git
   ```

2. Navigate to the project directory:

   ```bash
   cd book-finder
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173` to view the app.

## Usage

1. Enter your search query in the input field.
2. Click the search button or press Enter to fetch the results.
3. Use the pagination controls to navigate through the pages of results.
4. Click on a book to view more details (if applicable).

## Contributing

If you'd like to contribute to Book Finder, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
