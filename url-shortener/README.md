# URL Shortener

A simple URL shortener built with Node.js, Express, MongoDB, and EJS. This project allows users to shorten URLs and track the number of visits. It provides a simple UI for users to interact with and manage their shortened URLs.

## Features

- Shorten long URLs.
- Redirect to the original URL when accessing a shortened URL.
- Track the number of visits to each shortened URL.
- Ability to delete shortened URLs from the database.

## Technologies Used

- **Node.js** - JavaScript runtime used for the server-side logic.
- **Express.js** - Web framework for building the REST API and routing.
- **MongoDB** - NoSQL database for storing URLs and their data.
- **EJS** - Embedded JavaScript templating engine for rendering dynamic views.
- **Tailwind CSS** - Utility-first CSS framework for styling the frontend.
- **Nanoid** - A tiny and secure URL-friendly unique string ID generator.

## API Endpoints

- **POST /url**
  Create a shortened URL by providing a full URL.
- **GET /url/:shortURL**
  Redirect to the original URL for a given shortened URL.
- **DELETE /url/:shortURL**
  Delete a shortened URL by its shortURL.

## Screenshots
