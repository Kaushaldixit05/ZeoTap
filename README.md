# Rule Engine Application

This is a simple 3-tier rule engine application that determines user eligibility based on attributes like age, department, income, and experience. The system uses an Abstract Syntax Tree (AST) to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start MongoDB server:
   - If you have MongoDB installed locally, start it using the command:
     ```
     mongod
     ```
   - If you're using a cloud MongoDB service, make sure to update the connection string in `server.js`
4. Start both the backend and frontend servers:
   ```
   npm start
   ```

## Usage

1. Open the application in your browser (usually at `http://localhost:5173`)
2. Add rules using the input field and "Add Rule" button
3. Enter user data in the provided fields
4. Click "Evaluate Rules" to determine user eligibility based on the entered rules and data

## API Endpoints

- `POST /api/rules`: Add a new rule
- `GET /api/rules`: Retrieve all rules

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Build Tool: Vite

## Troubleshooting

If you encounter errors related to fetching or adding rules, please ensure that:

1. MongoDB is running and accessible
2. Both the backend and frontend servers are running (use `npm start`)
3. Check the browser console and server logs for more detailed error messages

If issues persist, try the following:
1. Stop all running servers
2. Ensure MongoDB is running
3. Run `npm start` to start both servers simultaneously

## Future Improvements

- Implement error handling for invalid rule strings or data formats
- Add validations for attributes to be part of a catalog
- Allow modification of existing rules
- Extend the system to support user-defined functions within the rule language for advanced conditions