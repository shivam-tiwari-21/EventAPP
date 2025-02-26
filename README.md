# Event APP

## Overview
Event APP is a full-stack web application that allows users to browse and register for events while providing administrators with the ability to manage event listings. This project is built using:
- **Frontend:** React.js, Tailwind Css
- **Backend:** PHP with MySQL database

## Screenshots

![Screenshot 1](https://drive.google.com/uc?id=10AyuD4OAul8I4r7OseBIxK_Fy6jo4wFQ)
![Screenshot 2](https://drive.google.com/uc?id=1ClZ5EFSFAMjaYGTGko-FlckB7NH7MGUB)
![Screenshot 3](https://drive.google.com/uc?id=1NPNZUSiSdM9k0GNcBFJiGeT1p3gni383)
![Screenshot 4](https://drive.google.com/uc?id=1b9F0URGA2j-mYjD6LuBhfMhmxPM4ef7I)
![Screenshot 5](https://drive.google.com/uc?id=1ryC6oaaBT-g9rJDtJ84bqirNQuR-xhrs)

## Note
App's UI is under development. It may be slightly different from the above screenshots, however I will constantly update them. 

## Features
### User Features
- Browse all available events
- Register for an event

### Admin Features
- Create new events
- Edit event details
- Delete events

### Event Details
Each event contains:
- **Title** - Name of the event
- **Description** - Short details about the event
- **Date** - Scheduled date of the event
- **Venue** - Location of the event
- **Available Seats** - Number of seats available for registration

## Installation & Setup
### Prerequisites
Ensure you have the following installed on your system:
- PHP
- MySQL
- Node.js & npm (for React frontend)
- A web server (Apache or Nginx)

### Steps to Run the Project
#### Backend Setup
1. Clone the repository.
2. Move the Backend folder in htdocs folder.
3. Configure the database:
   - Import the provided SQL file into MySQL.
4. Start the Backend server.

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd EventAPP/Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```

## Open the App
- Open `http://localhost:5173` in your browser to access.

## Folder Structure
```
/event-app
  ├── Backend/         # PHP backend files
  ├── Frontend/        # React frontend files
  ├── event_app.sql/        # Exported MySQL database file
```

