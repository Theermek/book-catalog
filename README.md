# Book Catalog App

![Book Catalog App](https://theermek.github.io/book-catalog/)

A web application to manage a catalog of books, allowing users to add, edit, delete, and sort books by various criteria. The application is built using React and Firebase, and is deployed on GitHub Pages.

## Features

- Add new books with title, authors, year of publication, rating, and ISBN.
- Edit existing books.
- Delete books from the catalog.
- Sort books by year, rating, or author.
- Display a recommended book.
- Persistent data storage using Firebase Firestore.
- Responsive design.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Firebase Setup](#firebase-setup)
- [Deployment](#deployment)
- [License](#license)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Theermek/book-catalog.git
    cd book-catalog
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Add, edit, or delete books using the form and buttons provided.
3. Sort books by year, rating, or author using the sort selector.

## Project Structure

- `src/components`: Contains React components for the application.
- `src/utils`: Utility functions for the application.
- `src/App.js`: Main application component.
- `public`: Public assets.

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add a new web app to the project.
4. Copy the Firebase configuration and replace the config in `src/utils/firebase.js`.
5. Enable Firestore in the Firebase console.
6. Enable Firestore persistence if needed.
