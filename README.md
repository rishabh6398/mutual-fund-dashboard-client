
# Mutual Fund Dashboard Client

This is the frontend for the Mutual Fund Dashboard project, developed using React.

## Project Setup

### Prerequisites

Make sure you have the following installed:
- Node.js (https://nodejs.org)
- npm (comes with Node.js)

### Clone the repository

To clone the frontend code repository, run the following command:

```bash
git clone https://github.com/rishabh6398/mutual-fund-dashboard-client.git
```

### Install dependencies

After cloning the repository, navigate to the project directory and install the required dependencies:

```bash
cd mutual-fund-dashboard-client
npm install
```

### Running the Project Locally

To run the frontend project locally, use the following command:

```bash
npm start
```

The application should now be running on `http://localhost:3000`.

### Environment Variables

To use the application, you need to set up the environment variables in the `.env` file. You should configure your `.env` with the following:

```bash
REACT_APP_API_URL=http://localhost:8000
```

Make sure that the backend server is running on the URL specified above.

### Project Structure

- `src/`: Contains all the main source code for the React application.
  - `components/`: React components.
  - `pages/`: Different pages of the application (e.g., Login, Dashboard).
  - `services/`: Axios calls and API service logic.
  - `App.js`: Main application component.
  - `index.js`: Entry point of the application.

### Using the Application

1. Navigate to `http://localhost:3000` to access the login page.
2. Use the dummy credentials provided in the backend setup to log in.
3. After login, you will be redirected to the dashboard where you can view and manage mutual funds.

### Technologies Used

- React
- Axios for HTTP requests
- React Router for routing
- CSS for styling

### License

This project is licensed under the MIT License.
