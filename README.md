# SeatView — Cinema seat booking demo

Mobile-first React + Vite cinema booking prototype with a Three.js seat-view preview.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173). Production build:

```bash
npm run build
npm run preview
```

## Stack
- React 18 + Vite
- Tailwind CSS 3 (utility layer enabled; bespoke responsive styling in `src/styles.css`)
- Three.js through React Three Fiber and Drei
- Framer Motion for page, seat and confirmation transitions
- Zustand for booking state

## Folder structure

```text
cinema-seat-booking/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── data/
    │   └── mockData.js
    ├── store/
    │   └── useBookingStore.js
    ├── utils/
    │   └── seatMath.js
    └── components/
        ├── Home.jsx
        ├── SeatMap.jsx
        ├── SeatPreview3D.jsx
        ├── BottomSheet.jsx
        └── BookingSuccess.jsx
```

## Demo behavior
- Home screen lets you select a movie and enter the seat map.
- Seat map includes 9 rows, 14 seats per row, an aisle, seeded taken seats, standard seats at ₹280 and recliners at ₹650.
- Zustand stores selected seats (maximum 6), showtime, movie and screen.
- Continue opens the 3D preview. The camera eases toward a seat-specific position; OrbitControls allows limited horizontal/vertical looking.
- The mini map currently changes the preview to a selected seat. “Change seat” returns to the full map.
- Book opens a confirmation state. Payment is deliberately a demo alert, not a real charge.

## Important implementation notes
This is a polished front-end prototype, not a production booking engine. The generated seat positions and 3D camera mapping are illustrative. For exact geometry, derive seat coordinates from the theatre's CAD/layout data and calibrate the distance/FOV formula against the actual screen width, row pitch and eye height.

## Backend integration (Node/Express + MongoDB)

Suggested API:
- `GET /api/movies` — now-showing movies.
- `GET /api/showtimes?movieId=...&theatreId=...&date=...` — available showtimes.
- `GET /api/showtimes/:id/seats` — seat inventory with price and status.
- `POST /api/bookings/hold` — atomically hold 1–6 seats for e.g. 5 minutes.
- `POST /api/payments/order` — create a payment order with Razorpay/Stripe on the server.
- `POST /api/payments/verify` — verify gateway signature/webhook and mark booking paid.
- `GET /api/bookings/:id` — booking confirmation / ticket QR.

Suggested MongoDB collections:
- `Theatres`, `Screens`, `Movies`, `Showtimes`, `Seats`, `Bookings`, `Payments`.
- Add a unique compound index on `{ showtimeId, seatId }` in the active reservation/booking inventory model.
- Use a MongoDB transaction (replica set required) or an atomic conditional update to reserve seats. Never trust the client for seat availability or price.
- Store a `holdExpiresAt` timestamp and expire abandoned holds with a TTL index, while ensuring the booking flow checks expiration in application logic.
- Server must recalculate price, validate max seats, and reject seats that became unavailable between fetch and hold.
- Keep payment secret keys only in server environment variables. Confirm payment from a verified gateway webhook/signature, not a client success callback.
- Use idempotency keys for payment creation and booking confirmation to avoid duplicate charges/bookings.

Example flow:
1. Client fetches showtime seat inventory.
2. Client posts selected seat IDs to `/api/bookings/hold`.
3. Server atomically reserves seats and returns `bookingId`, `expiresAt`, and server-calculated total.
4. Client requests a payment order from the server and opens the gateway checkout.
5. Server verifies gateway callback/webhook, changes booking status to `CONFIRMED`, and returns ticket details.
6. If payment fails or hold expires, release the seats.

For production, also add authentication, rate limiting, request validation, audit logs, HTTPS, monitoring, accessibility testing, and real theatre layout calibration.
