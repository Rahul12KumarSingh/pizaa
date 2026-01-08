# PizzaSlice Backend

Node.js + Express + MongoDB service that powers the PizzaSlice ordering experience. It exposes secure endpoints for managing pizzas, handling Razorpay payments, and tracking order fulfillment states.

## Prerequisites

- Node.js 18+
- MongoDB 5+
- Razorpay account with API key and secret for payment processing

## Environment Setup

1. Copy `.env.example` to `.env` and update the values:

   ```bash
   cp .env.example .env
   ```

2. Ensure the following variables are configured:

   | Variable | Description |
   | --- | --- |
   | `PORT` | Port for the Express server (defaults to 5000) |
   | `MONGO_URI` | MongoDB connection string |
   | `CLIENT_ORIGIN` | Allowed frontend origins (comma separated) |
   | `RAZORPAY_KEY_ID` | Razorpay API key for order creation |
   | `RAZORPAY_KEY_SECRET` | Razorpay API secret for signature validation |

## Install & Run

```bash
npm install
npm run dev    # runs nodemon for development
# or
npm start      # runs with node
```

The service exposes a health-check at `GET /health`.

## Data Models

- **Pizza**: `title`, `description`, `prices[]`, `sizes[]`, `image`, `isAvailable`
- **Order**: `orderId`, `items[]`, `customerName`, `customerMobileNumber`, `status`, `totalAmount`, `paymentReference`, timestamps
- **Payment**: Razorpay references, status, amount, and payer contact metadata

## API Overview

### Pizza Catalog

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/pizzas` | List available pizzas |
| `POST` | `/api/pizzas` | Create a new pizza item |

### Payment & Orders

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/orders/razorpay/order` | Creates a Razorpay order intent (verifies menu prices) |
| `POST` | `/api/orders/payment` | Records payment callback, verifies signature, persists order + payment |
| `GET` | `/api/orders/progress/summary` | Counts orders in active workflow states |
| `GET` | `/api/orders/progress` | Lists orders currently in progress |
| `PATCH` | `/api/orders/:orderId/deliver` | Marks an order as delivered |
| `GET` | `/api/orders/date?date=YYYY-MM-DD` | Lists orders placed on a specific date |

All POST/PATCH endpoints use input validation with `express-validator`. Errors return `422` with field-level messages.

## Typical Checkout Flow

1. Frontend calls `POST /api/orders/razorpay/order` with the cart payload to receive a Razorpay `order_id`, verified totals, and publishable `key`.
2. Customer completes payment through Razorpay Checkout using the provided key and order details.
3. Frontend posts Razorpay success payload to `POST /api/orders/payment`, which verifies the HMAC signature, records payment info, persists the order, and returns the receipt number.
4. Kitchen staff can poll `/api/orders/progress` or summary endpoints to monitor active orders, then mark delivery completion via `PATCH /api/orders/:orderId/deliver`.

## Testing Helpers

Sample curl to seed a pizza:

```bash
curl -X POST http://localhost:5000/api/pizzas \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Margherita",
    "description": "Classic tomato, mozzarella, and basil",
    "prices": [199, 299, 399],
    "sizes": ["small", "medium", "large"],
    "image": "https://example.com/pizzas/margherita.jpg"
  }'
```

> **Note:** Razorpay order creation requires valid API credentials. Use Razorpay test keys when running locally.
