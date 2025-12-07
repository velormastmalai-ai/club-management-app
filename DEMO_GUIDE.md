# 🎉 Club Management App - Demo Guide

## Quick Start (5 Minutes)

### 1. Start the Demo
```bash
# Clone repository
git clone https://github.com/velormastmalai-ai/club-management-app.git
cd club-management-app

# Start services with Docker
docker-compose up -d

# Wait for services to be ready (30 seconds)
# Check status
docker-compose ps
```

### 2. Seed Demo Data
```bash
# Install dependencies
cd backend
npm install

# Run seed script
npm run seed
```

### 3. Access the Demo
- **API Documentation**: http://localhost:3000/api/docs
- **Backend API**: http://localhost:3000

## 📧 Demo Accounts

### Owner Account
- **Email**: `owner@club.com`
- **Password**: `password123`
- **Permissions**: Full super-admin control
  - Customize app appearance
  - Toggle maintenance mode
  - Transfer ownership
  - View all analytics

### Admin Account
- **Email**: `admin@club.com`
- **Password**: `password123`
- **Permissions**: Event and booking management
  - Create/edit events
  - Manage bookings
  - Issue refunds
  - Send notifications
  - View analytics

### User Accounts
- **Emails**: `user1@example.com` to `user10@example.com`
- **Password**: `password123`
- **Permissions**: Browse and book events
  - View events
  - Book tickets
  - Make payments
  - View booking history

## 🎯 Demo Data Overview

### Club
- **Name**: Elite Club
- **Description**: Premium club for exclusive events
- **Status**: Active
- **Features**:
  - Custom branding (logo, colors, theme)
  - Payment integration (Razorpay/Stripe)
  - Multi-channel notifications
  - Customizable booking rules

### Events (4 Pre-loaded)

#### 1. Live Music Night
- **When**: Tonight (6 hours from now)
- **Capacity**: 100 seats
- **Booked**: 45 seats
- **Price**: ₹500 - ₹1,000
- **Tiers**: General Admission, VIP
- **Status**: Published, Booking Open

#### 2. Stand-Up Comedy Night
- **When**: Tomorrow, 8 PM
- **Capacity**: 150 seats
- **Booked**: 78 seats
- **Price**: ₹600 - ₹1,200
- **Tiers**: Standard, Premium
- **Status**: Published, Booking Open

#### 3. Electronic Dance Night
- **When**: Next week
- **Capacity**: 200 seats
- **Booked**: 120 seats
- **Price**: ₹800 - ₹2,000
- **Tiers**: Early Bird, Regular, VIP
- **Status**: Published, Booking Open

#### 4. Premium Wine Tasting
- **When**: Next month
- **Capacity**: 50 seats
- **Booked**: 15 seats
- **Price**: ₹2,500 - ₹5,000
- **Tiers**: Standard, Premium
- **Status**: Published, Booking Open

### Bookings
- **Total**: 20 sample bookings
- **Confirmed**: 15 bookings
- **Pending**: 5 bookings
- **Users**: Distributed across 10 demo users

### Payments
- **Total**: 15 successful payments
- **Providers**: Razorpay (50%), Stripe (50%)
- **Methods**: Card, UPI, Net Banking
- **Status**: All succeeded

## 🚀 Testing the API

### 1. Login as Owner
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@club.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "owner@club.com",
    "name": "Club Owner",
    "role": "owner"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": "15m"
}
```

### 2. Get Club Settings (Owner)
```bash
curl -X GET http://localhost:3000/clubs/my-club \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. List All Events
```bash
curl -X GET http://localhost:3000/events
```

### 4. Get Event Details
```bash
curl -X GET http://localhost:3000/events/{EVENT_ID}
```

### 5. Create Booking (User)
```bash
# First login as user
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user1@example.com",
    "password": "password123"
  }'

# Then create booking
curl -X POST http://localhost:3000/bookings \
  -H "Authorization: Bearer USER_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "EVENT_ID",
    "seats": 2,
    "priceTierId": "1"
  }'
```

### 6. Toggle Maintenance Mode (Owner)
```bash
curl -X POST http://localhost:3000/clubs/{CLUB_ID}/maintenance \
  -H "Authorization: Bearer OWNER_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "message": "We are upgrading our systems. Back soon!",
    "until": "2025-12-08T12:00:00Z"
  }'
```

## 📊 Exploring the API Documentation

Visit **http://localhost:3000/api/docs** to see:

### Available Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Logout

#### Users
- `GET /users/me` - Get current user profile
- `GET /users/:id` - Get user by ID

#### Clubs (Owner/Admin)
- `GET /clubs` - List all clubs
- `GET /clubs/my-club` - Get my club
- `GET /clubs/:id` - Get club by ID
- `PATCH /clubs/:id` - Update club settings
- `POST /clubs/:id/maintenance` - Toggle maintenance mode

#### Events (Coming Soon)
- `GET /events` - List events
- `POST /events` - Create event (Admin)
- `GET /events/:id` - Get event details
- `PATCH /events/:id` - Update event (Admin)
- `DELETE /events/:id` - Delete event (Admin)

#### Bookings (Coming Soon)
- `GET /bookings` - List my bookings
- `POST /bookings` - Create booking
- `GET /bookings/:id` - Get booking details
- `DELETE /bookings/:id` - Cancel booking

## 🎨 Demo Scenarios

### Scenario 1: Owner Customizes Club
1. Login as owner
2. Get club settings
3. Update theme colors
4. Update brand assets
5. View updated club

### Scenario 2: Admin Manages Events
1. Login as admin
2. View all events
3. Check event capacity
4. View bookings for event
5. Update event details

### Scenario 3: User Books Ticket
1. Login as user
2. Browse available events
3. Select event and price tier
4. Create booking
5. Initiate payment
6. Receive confirmation

### Scenario 4: Owner Enables Maintenance
1. Login as owner
2. Toggle maintenance mode ON
3. Set maintenance message
4. Set end time
5. Users see maintenance page

## 📈 Analytics Demo Data

### Revenue Metrics
- **Total Revenue**: ₹18,500 (from 15 confirmed bookings)
- **Average Ticket Price**: ₹1,233
- **Payment Success Rate**: 100%

### Booking Metrics
- **Total Bookings**: 20
- **Confirmed**: 15 (75%)
- **Pending**: 5 (25%)
- **Cancellation Rate**: 0%

### Event Metrics
- **Total Events**: 4
- **Published**: 4 (100%)
- **Average Capacity**: 125 seats
- **Average Fill Rate**: 64.5%

### User Metrics
- **Total Users**: 12 (1 owner, 1 admin, 10 users)
- **Active Users**: 10
- **Email Verified**: 100%

## 🔧 Advanced Testing

### Test Payment Webhooks

#### Razorpay Webhook
```bash
curl -X POST http://localhost:3000/payments/webhook/razorpay \
  -H "Content-Type: application/json" \
  -H "x-razorpay-signature: test_signature" \
  -d '{
    "event": "payment.captured",
    "payload": {
      "payment": {
        "entity": {
          "id": "pay_test123",
          "amount": 50000,
          "status": "captured"
        }
      }
    }
  }'
```

#### Stripe Webhook
```bash
curl -X POST http://localhost:3000/payments/webhook/stripe \
  -H "Content-Type: application/json" \
  -H "stripe-signature: test_signature" \
  -d '{
    "type": "payment_intent.succeeded",
    "data": {
      "object": {
        "id": "pi_test123",
        "amount": 50000,
        "status": "succeeded"
      }
    }
  }'
```

### Test Rate Limiting
```bash
# Make 100+ requests quickly to trigger rate limit
for i in {1..110}; do
  curl http://localhost:3000/events &
done
```

### Test RBAC
```bash
# Try to access owner endpoint as user (should fail)
curl -X POST http://localhost:3000/clubs/{CLUB_ID}/maintenance \
  -H "Authorization: Bearer USER_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'

# Expected: 403 Forbidden
```

## 🎯 What to Explore

### 1. Authentication Flow
- Register new user
- Login and get JWT
- Use token for authenticated requests
- Refresh token before expiry
- Logout

### 2. Role-Based Access
- Try owner-only endpoints as admin (should fail)
- Try admin-only endpoints as user (should fail)
- Verify proper access control

### 3. Data Relationships
- View event with bookings
- View booking with payment
- View user with all bookings
- Explore club settings

### 4. API Documentation
- Interactive Swagger UI
- Try endpoints directly from docs
- View request/response schemas
- Test authentication

## 🐛 Troubleshooting

### Services not starting
```bash
# Check Docker logs
docker-compose logs backend
docker-compose logs postgres
docker-compose logs redis

# Restart services
docker-compose restart
```

### Seed script fails
```bash
# Ensure database is ready
docker-compose ps postgres

# Check database connection
docker-compose exec postgres psql -U club_user -d club_management

# Re-run seed
cd backend
npm run seed
```

### Cannot access API
```bash
# Check if backend is running
curl http://localhost:3000/health

# Check Docker network
docker network ls
docker network inspect club-management-app_default
```

## 📝 Next Steps

After exploring the demo:

1. **Review the code** - Check implementation details
2. **Implement remaining modules** - Events, Bookings, Payments
3. **Build frontend** - Web admin and mobile app
4. **Add tests** - Unit and integration tests
5. **Deploy** - Follow deployment guide

## 🎓 Learning Resources

- **NestJS Docs**: https://docs.nestjs.com
- **TypeORM Docs**: https://typeorm.io
- **Swagger/OpenAPI**: http://localhost:3000/api/docs
- **Implementation Guide**: See IMPLEMENTATION_GUIDE.md
- **Architecture**: See docs/ARCHITECTURE.md

## 💬 Support

Having issues with the demo?
1. Check troubleshooting section above
2. Review Docker logs
3. Verify environment variables
4. Check GitHub Issues

---

**Enjoy exploring the demo! 🚀**

The demo showcases the foundation - authentication, RBAC, database schema, and API structure. The remaining modules (Events, Bookings, Payments) follow the same pattern and can be implemented using the provided templates.
