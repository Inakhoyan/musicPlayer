# Music Player App

## Introduction
This project is a simple music player app built with React on the frontend and Express on the backend. It allows users to upload music files, view a list of available songs, and play them using an audio player.

## Features
- Upload music files
- View a list of available songs
- Play, pause, seek, and skip between tracks using the audio player

## Technologies Used
- React
- Styled Components
- Axios
- Express

## Project Structure

### Frontend (React)
- **App.js**: Main entry point for the React application.
- **MusicPlayer.js**: Component responsible for managing music metadata and rendering the UI.
- **AudioPlayer.js**: Component for handling audio playback.

### Backend (Express)
- **server.js**: Main entry point for the Express server.
- **upload.js**: Middleware for handling file uploads.

### Styling
- **App.css**: Styles for the main App component.

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Navigate to the project folder: `cd your-repo`
3. Install dependencies:
   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`

### Running the App
1. Start the backend server: `cd server && npm start`
2. Start the frontend development server: `cd client && npm start`
3. Open your browser and visit `http://localhost:5000` to view the app.

## Additional Notes
- Make sure to configure the backend server's file paths and adjust CORS settings based on your requirements.
- This project uses the [Poppins](https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,600;1,300;1,500;1,700&display=swap) font.

## Contributors
- [Ishkhan](https://github.com/Inakhoyan)

## License
This project is licensed under the [MIT License](LICENSE).
