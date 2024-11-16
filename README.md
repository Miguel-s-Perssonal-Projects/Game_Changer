# Game Changer - Video Games Angular Site

Welcome to the **Video Games Explorer** project! This Angular application allows users to explore Video Games, view details about them and organize in different lists, and enjoy an interactive "Coming Soon" page with a dynamic background. The application retrieves data about Video Games from a backend API and displays them in a beautiful, animated interface.

## Features

- **Homepage**: A dynamic homepage with an animated background and an interactive star field.
- **Video Game Details**: View detailed information about a specific Video Game, including its name, abbreviation, meaning, brightest star, and an image.
- **Coming Soon Page**: A stylish "Coming Soon" page with a similar dynamic background.
- **Interactive Stars**: Background stars animate and twinkle as you explore the app.
- **Responsive Design**: The app is designed to work across various devices, providing an enjoyable user experience.
  
## Technologies Used

- **Angular**: For building the frontend application.
- **TypeScript**: For app development and type safety.
- **CSS** (with custom animations): To create a beautiful UI with animated backgrounds and form elements.
- **Backend**: A API to serve Video Game data (details, images, etc.).

## Installation

To run this project locally, follow these steps:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone git@github.com:Miguel-s-Perssonal-Projects/Angular_project.git
cd Angular_project
```

## Install Dependencies
Install the required dependencies for the Angular application:

```bash
npm install
```

## Start the Angular Development Server

Run the development server to start the application:

```bash
npm start
```

The application will be available at http://localhost:4200/.

## Backend API

### Run the API

Start the API:

```bash
npx json-server api.json
```

The API will be running at http://localhost:3000/ by default.

## Application Structure

### Frontend (Angular)

The frontend is built with Angular and contains the following key components:

- **HomeComponent**: Displays the homepage with a dynamic background and the list of the games.
- **Video GameDetailComponent**: Shows detailed information about a selected Video Game.
- **Game Lists**: A dropdown in the top navbar leads to a great listing system.
- **ComingSoonComponent**: Displays a "Coming Soon" page with a similar background and animation as the homepage.
- **NavbarComponent**: A responsive navigation bar, included on each page.

#### Directory Structure

Here it is a simple example of the structure of the app.

```
src/
├── app/
│   ├── navbar/
│   │   ├── navbar.component.ts
│   │   └── navbar.component.html
│   ├── home/
│   │   ├── home.component.ts
│   │   └── home.component.html
│   ├── coming-soon/
│   │   ├── coming-soon.component.ts
│   │   └── coming-soon.component.html
│   ├── lists/
│   │   ├── list-1.ts
│   │   ├── list-2.ts
│   │   ├── list-3.ts
│   │   └── list-4.ts
│   ├── Video Game-detail/
│   │   ├── Video Game-detail.component.ts
│   │   └── Video Game-detail.component.html
│   └── app.component.ts
```
## Contributing

We welcome contributions to this project! If you'd like to contribute, please fork the repository and submit a pull request. We are open to new features, bug fixes, and improvements.

### How to Contribute

1. Fork the repository.
2. Clone your fork locally.
3. Create a new branch for your feature or bug fix.
4. Make your changes.
5. Commit your changes and push to your fork.
6. Create a pull request with a description of your changes.





