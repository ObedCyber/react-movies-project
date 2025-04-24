# My First React App - Movie Project

This is a simple React-based movie project that demonstrates the basics of React, including components, props, state management, API integration, and database management using Appwrite.

## Features

- Display a list of movies.
- Search for movies by title.
- View detailed information about a selected movie.
- Responsive design for better user experience on all devices.
- Database management powered by Appwrite.

## Technologies Used

- React
- JavaScript (ES6+)
- CSS (or your preferred styling method)
- [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) for fetching movie data.
- [Appwrite](https://appwrite.io/) for database management.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/my-first-react-app.git
    cd my-first-react-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Use the search bar to find movies by title.
- Click on a movie to view more details.

## Folder Structure

```
my-first-react-app/
├── public/
├── src/
│   ├── components/    # Reusable components
│   ├── assets/        # Asset components
│   ├── App.jsx         # Main app component
│   ├── main.jsx       # Entry point
│   ├── appwrite.js     # appwrite database management script
│   └── index.css        # Tailwind css styling
├── package.json
└── README.md
```

## API Key Setup

To use the TMDb API, you need an API key:

1. Sign up at [TMDb](https://www.themoviedb.org/).
2. Create an API key in your account settings.
3. Add the API key to your project (e.g., in an `.env` file):
    ```
    REACT_APP_TMDB_API_KEY=your_api_key_here
    ```

## Appwrite Setup

To use Appwrite for database management:

1. Install and set up [Appwrite](https://appwrite.io/docs/installation).
2. Create a project in the Appwrite console.
3. Configure your database and collections as needed.
4. Add your Appwrite endpoint and project ID to an `.env` file:
    ```
    REACT_APP_APPWRITE_ENDPOINT=your_appwrite_endpoint
    REACT_APP_APPWRITE_PROJECT_ID=your_project_id
    ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [TMDb API](https://www.themoviedb.org/documentation/api) for providing movie data.
- [Appwrite](https://appwrite.io/) for database management.
- Javascript Mastery React Tutorial (https://youtu.be/dCLhUialKPQ?si=XSJd9J387dijXQjq)
- React documentation for guidance.
