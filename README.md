# PDF Editor Web Application

This is a simple web application built using React for the frontend and Nest.js for the backend. The application allows users to load a default PDF file stored in a PostgreSQL database, edit it using PSPDFKit, and save the modified PDF back to the database.

## Features

- Load the default PDF file from the PostgreSQL database.
- Edit the PDF file using PSPDFKit.
- Save the modified PDF back to the database.

## Prerequisites

Before running this application, make sure you have the following prerequisites installed on your system:

- Node.js and npm: You can download and install Node.js from the official website [node.js](https://nodejs.org).
- PostgreSQL: Install PostgreSQL database on your machine, and set up a database with appropriate credentials. Make sure to update the backend configuration to match your database settings.

### Technologies Used

- Frontend:
  - React
  - Axios
  - PSPDFKit (PDF editing library)
- Backend:
  - Nest.js
  - PostgreSQL

## Usage

1. Load PDF: Click on the "LOAD Pdf" button to fetch the default PDF file from the backend and load it into the PDF viewer.

2. Edit PDF: Once the PDF is loaded, you can edit it using the PSPDFKit functionalities provided in the viewer.

3. Save PDF: After making the necessary changes, click on the "SAVE Pdf" button to save the modified PDF back to the PostgreSQL database.

## Setup

1. Clone the repository.
   ```bash
   git clone https://github.com/Dr-Dreams/PdfEditor.git
   ```
2. Navigate to the project directory.
   ```bash
   cd PdfEditor
   ```
3. Configure the backend:

   Navigate to the backend/src/config directory and update the database credentials in database.config.ts to match your PostgreSQL database settings.

4. Install the dependencies by running the following command in the project directory:
   ```bash
   npm run install-everything
   ```
5. Start the application:
   ```bash
   npm start
   ```
   This will start both the frontend and backend concurrently.
6. Access the Money Tracker web app in your browser at http://localhost:3000

# License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code as per the terms of this license.
