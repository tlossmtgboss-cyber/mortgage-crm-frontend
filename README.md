# Mortgage CRM Frontend

A React-based Customer Relationship Management (CRM) system for mortgage lead management with Microsoft Teams integration.

## Features

- Lead management (Create, Read, Update, Delete)
- Microsoft Teams integration for notifications
- Real-time lead tracking and status updates
- Responsive design for mobile and desktop
- RESTful API integration

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend API server running

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tlossmtgboss-cyber/mortgage-crm-frontend.git
cd mortgage-crm-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

Update the following environment variables in `.env`:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api

# Microsoft Teams Integration
REACT_APP_TEAMS_CLIENT_ID=your-teams-client-id-here
REACT_APP_TEAMS_TENANT_ID=your-tenant-id-here
REACT_APP_TEAMS_REDIRECT_URI=http://localhost:3000
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `REACT_APP_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |
| `REACT_APP_TEAMS_CLIENT_ID` | Microsoft Teams OAuth Client ID | N/A |
| `REACT_APP_TEAMS_TENANT_ID` | Microsoft Teams Tenant ID | N/A |
| `REACT_APP_TEAMS_REDIRECT_URI` | OAuth redirect URI | `http://localhost:3000` |

## Running the Application

### Development Mode

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Testing

### Running Tests

The project includes unit tests for components using Jest and React Testing Library.

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with coverage:
```bash
npm test -- --coverage
```

### Test Results

**Last Test Run:** [Date will be updated after running tests]

```
[Test results will be recorded here after running npm test]
```

## Project Structure

```
mortgage-crm-frontend/
├── public/              # Static files
├── src/
│   ├── __tests__/      # Test files
│   │   └── LeadList.test.js
│   ├── components/     # React components
│   │   ├── LeadList.js
│   │   └── LeadList.css
│   ├── services/       # API services
│   │   ├── leadService.js
│   │   └── teamsService.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Technologies Used

- React 18
- Axios for API calls
- CSS3 for styling
- Jest & React Testing Library for testing
- Microsoft Teams JavaScript SDK (optional)

## Development

### Code Refactoring

All API endpoints have been refactored to use environment variables for better configurability:
- `leadService.js` - Uses `REACT_APP_API_BASE_URL` for all backend API calls
- `teamsService.js` - Uses Teams-related environment variables for OAuth

### Component Testing

Tests are located in `src/__tests__/` directory and cover:
- Component rendering
- Modal functionality
- API integration
- User interactions
- Error handling

## Deployment

For deployment instructions, refer to [Create React App deployment documentation](https://facebook.github.io/create-react-app/docs/deployment).

## License

This project is proprietary software.

## Contributors

- Development Team
