# Santorini Flavours - Admin Dashboard

Admin dashboard for managing orders at Santorini Flavours pizza shop.

## Features

- **Live Orders Tab**: View all in-progress orders for the current day
  - Auto-refreshes every 1 minute (polling)
  - Orders sorted by creation time (newest first)
  - Mark orders as completed
  - Completed orders automatically removed from the list

- **Order History Tab**: View historical orders
  - Filter by date
  - Filter by status (All / Completed / Processing)
  - View order details and revenue summary

## Getting Started

### Prerequisites

- Node.js 16+ installed
- Backend server running on `http://localhost:5000`

### Installation

```bash
# Navigate to admin dashboard directory
cd adminDashboard

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3001` (or next available port if 3000 is in use).

### Environment Variables

Create a `.env` file if you need to customize the API URL:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
adminDashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.js
│   │   ├── OrderCard.js
│   │   ├── StatusBadge.js
│   │   ├── LoadingSpinner.js
│   │   ├── ErrorMessage.js
│   │   └── EmptyState.js
│   ├── hooks/               # Custom React hooks
│   │   ├── useProgressOrders.js
│   │   └── useOrderHistory.js
│   ├── pages/               # Page components
│   │   ├── ProgressOrdersTab.js
│   │   └── OrderHistoryTab.js
│   ├── services/            # API services
│   │   ├── api.js
│   │   └── orderService.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## API Endpoints Used

- `GET /api/orders/progress` - Fetch in-progress orders
- `PATCH /api/orders/:orderId/deliver` - Mark order as delivered
- `GET /api/orders/date?date=YYYY-MM-DD` - Fetch orders by date

## Order Status Flow

```
RECEIVED → PROCESSING → READY → OUT_FOR_DELIVERY → DELIVERED
```

## Tech Stack

- React 18
- Axios for API calls
- date-fns for date formatting
- Lucide React for icons
- Tailwind CSS for styling
