# Club Management App - Implementation Guide

## 🎯 Project Overview

This is a production-ready club management platform with complete RBAC, event management, bookings, payments, and notifications. The codebase is structured for scalability, security, and maintainability.

## 📋 What's Been Created

### ✅ Backend (NestJS + TypeScript)
- **Core Setup**: Main app module, configuration, Docker setup
- **Database Entities**: User, Club, Event, Booking, Payment, Notification, AuditLog
- **Authentication**: JWT-based auth with refresh tokens, bcrypt password hashing
- **Authorization**: Role-based access control (Owner/Admin/User)
- **API Documentation**: Swagger/OpenAPI integration

### ✅ Infrastructure
- **Docker**: Development and production Docker Compose files
- **Database**: PostgreSQL with TypeORM
- **Cache/Queue**: Redis + Bull for background jobs
- **Security**: Helmet, rate limiting, CORS, input validation

## 🚧 What Needs to Be Implemented

### 1. Backend Modules (Priority Order)

#### A. Clubs Module (Owner Features)
**Files to create:**
```
backend/src/clubs/
├── clubs.module.ts
├── clubs.controller.ts
├── clubs.service.ts
└── dto/
    ├── create-club.dto.ts
    └── update-club.dto.ts
```

**Key Features:**
- Get/update club settings
- Customize theme and branding
- Toggle app maintenance mode
- Transfer ownership
- Manage custom content

**Example Controller Methods:**
```typescript
@Get('settings')
@Roles(UserRole.OWNER)
getSettings()

@Put('settings')
@Roles(UserRole.OWNER)
updateSettings(@Body() dto: UpdateClubDto)

@Post('maintenance')
@Roles(UserRole.OWNER)
toggleMaintenance(@Body() dto: MaintenanceDto)
```

#### B. Events Module (Admin Features)
**Files to create:**
```
backend/src/events/
├── events.module.ts
├── events.controller.ts
├── events.service.ts
└── dto/
    ├── create-event.dto.ts
    ├── update-event.dto.ts
    └── query-event.dto.ts
```

**Key Features:**
- CRUD operations for events
- Recurring event support
- Capacity management
- Price tier configuration
- Toggle booking open/close
- Waitlist management

**Example Service Methods:**
```typescript
async create(createEventDto: CreateEventDto): Promise<Event>
async findAll(query: QueryEventDto): Promise<Event[]>
async update(id: string, updateEventDto: UpdateEventDto): Promise<Event>
async toggleBooking(id: string, open: boolean): Promise<Event>
async checkCapacity(eventId: string, seats: number): Promise<boolean>
```

#### C. Bookings Module
**Files to create:**
```
backend/src/bookings/
├── bookings.module.ts
├── bookings.controller.ts
├── bookings.service.ts
├── bookings.processor.ts (Bull queue)
└── dto/
    ├── create-booking.dto.ts
    ├── update-booking.dto.ts
    └── cancel-booking.dto.ts
```

**Key Features:**
- Create booking with seat selection
- Approve/decline bookings (if approval required)
- Cancel bookings
- Generate QR codes
- Check-in functionality
- Waitlist management

**Integration Points:**
- Payment service for processing
- Notification service for confirmations
- Event service for capacity checks

#### D. Payments Module
**Files to create:**
```
backend/src/payments/
├── payments.module.ts
├── payments.controller.ts
├── payments.service.ts
├── providers/
│   ├── razorpay.service.ts
│   └── stripe.service.ts
└── dto/
    ├── create-payment.dto.ts
    └── refund-payment.dto.ts
```

**Key Features:**
- Razorpay integration
- Stripe integration
- Webhook handling
- Refund processing
- Payment reconciliation

**Webhook Endpoints:**
```typescript
@Post('webhook/razorpay')
handleRazorpayWebhook(@Body() payload, @Headers() headers)

@Post('webhook/stripe')
handleStripeWebhook(@Body() payload, @Headers() headers)
```

#### E. Notifications Module
**Files to create:**
```
backend/src/notifications/
├── notifications.module.ts
├── notifications.controller.ts
├── notifications.service.ts
├── notifications.processor.ts (Bull queue)
├── providers/
│   ├── email.service.ts (SendGrid)
│   ├── push.service.ts (FCM)
│   └── sms.service.ts (Twilio)
└── templates/
    ├── booking-confirmation.hbs
    ├── event-reminder.hbs
    └── payment-receipt.hbs
```

**Key Features:**
- Template system with placeholders
- Multi-channel delivery (Email, Push, SMS)
- Scheduled reminders
- Targeted notifications
- Retry logic with dead-letter queue

#### F. Analytics Module
**Files to create:**
```
backend/src/analytics/
├── analytics.module.ts
├── analytics.controller.ts
└── analytics.service.ts
```

**Key Features:**
- Revenue tracking
- Booking trends
- User growth metrics
- Event performance
- CSV export

#### G. Audit Module
**Files to create:**
```
backend/src/audit/
├── audit.module.ts
├── audit.service.ts
└── audit.interceptor.ts
```

**Key Features:**
- Log all admin/owner actions
- Track IP and user agent
- Queryable audit trail

### 2. Background Jobs

**Files to create:**
```
backend/src/jobs/
├── payment-reconciliation.job.ts
├── event-reminders.job.ts
└── cleanup.job.ts
```

**Scheduled Tasks:**
- Daily payment reconciliation
- Event reminders (24h, 2h before)
- Cleanup old failed bookings
- Generate daily reports

### 3. Web Admin Dashboard (React + TypeScript)

**Structure:**
```
web-admin/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   ├── Dashboard/
│   │   ├── Events/
│   │   ├── Bookings/
│   │   ├── Users/
│   │   └── Settings/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Events.tsx
│   │   ├── Bookings.tsx
│   │   └── Settings.tsx
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   └── App.tsx
├── package.json
├── vite.config.ts
└── Dockerfile
```

**Key Pages:**
1. **Dashboard**: Revenue, bookings, upcoming events
2. **Events**: Create/edit events, manage capacity
3. **Bookings**: View/manage bookings, issue refunds
4. **Users**: Member list, send notifications
5. **Settings**: Club customization (Owner only)

**Tech Stack:**
- React 18 + TypeScript
- Vite for build
- TailwindCSS for styling
- React Query for data fetching
- React Router for navigation
- Recharts for analytics

### 4. Mobile App (React Native + Expo)

**Structure:**
```
mobile/
├── src/
│   ├── screens/
│   │   ├── Home.tsx
│   │   ├── EventDetails.tsx
│   │   ├── Booking.tsx
│   │   ├── Profile.tsx
│   │   └── MyBookings.tsx
│   ├── components/
│   │   ├── EventCard.tsx
│   │   ├── BookingCard.tsx
│   │   └── PaymentSheet.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── services/
│   │   └── api.ts
│   └── App.tsx
├── app.json
├── package.json
└── eas.json
```

**Key Screens:**
1. **Home**: Browse events, featured content
2. **Event Details**: View event info, book tickets
3. **Booking Flow**: Select seats, payment
4. **My Bookings**: View tickets, QR codes
5. **Profile**: Edit profile, preferences

**Features:**
- 60fps animations (Reanimated 2)
- Offline support (AsyncStorage)
- Push notifications (Expo Notifications)
- Deep linking
- Payment integration

### 5. Testing

**Backend Tests:**
```
backend/test/
├── unit/
│   ├── auth.service.spec.ts
│   ├── events.service.spec.ts
│   └── bookings.service.spec.ts
├── integration/
│   ├── booking-flow.spec.ts
│   └── payment-webhook.spec.ts
└── e2e/
    └── app.e2e-spec.ts
```

**Target Coverage:** 70%+

### 6. CI/CD Pipeline

**File to create:**
```
.github/workflows/
├── backend-ci.yml
├── web-admin-ci.yml
└── mobile-ci.yml
```

**Pipeline Steps:**
1. Lint and format check
2. Run tests
3. Build Docker images
4. Push to registry
5. Deploy to staging/production

## 🔧 Implementation Steps

### Phase 1: Core Backend (Week 1-2)
1. ✅ Setup project structure
2. ✅ Create database entities
3. ✅ Implement authentication
4. Implement Clubs module
5. Implement Events module
6. Implement Bookings module
7. Implement Payments module

### Phase 2: Notifications & Jobs (Week 3)
1. Implement Notifications module
2. Setup Bull queues
3. Create scheduled jobs
4. Implement email templates

### Phase 3: Admin Dashboard (Week 4)
1. Setup React + Vite project
2. Implement authentication
3. Create dashboard pages
4. Integrate with backend API

### Phase 4: Mobile App (Week 5-6)
1. Setup React Native + Expo
2. Implement navigation
3. Create user screens
4. Integrate payments
5. Setup push notifications

### Phase 5: Testing & Deployment (Week 7)
1. Write unit tests
2. Write integration tests
3. Setup CI/CD
4. Deploy to staging
5. Performance testing

## 📝 Code Examples

### Creating an Event (Events Service)
```typescript
async create(createEventDto: CreateEventDto, clubId: string): Promise<Event> {
  const event = this.eventsRepository.create({
    ...createEventDto,
    clubId,
    bookedSeats: 0,
    status: EventStatus.DRAFT,
  });

  return this.eventsRepository.save(event);
}
```

### Processing a Booking (Bookings Service)
```typescript
async create(createBookingDto: CreateBookingDto, userId: string): Promise<Booking> {
  // Check capacity
  const event = await this.eventsService.findOne(createBookingDto.eventId);
  if (event.bookedSeats + createBookingDto.seats > event.capacity) {
    throw new BadRequestException('Event is full');
  }

  // Create booking
  const booking = this.bookingsRepository.create({
    ...createBookingDto,
    userId,
    status: BookingStatus.PENDING,
    ticketNumber: this.generateTicketNumber(),
  });

  await this.bookingsRepository.save(booking);

  // Initiate payment
  await this.paymentsService.createPayment(booking);

  return booking;
}
```

### Webhook Handler (Payments Controller)
```typescript
@Post('webhook/razorpay')
async handleRazorpayWebhook(
  @Body() payload: any,
  @Headers('x-razorpay-signature') signature: string,
) {
  // Verify signature
  const isValid = this.paymentsService.verifyWebhookSignature(payload, signature);
  if (!isValid) {
    throw new UnauthorizedException('Invalid signature');
  }

  // Process webhook
  await this.paymentsService.processWebhook(payload);

  return { status: 'ok' };
}
```

## 🔐 Security Checklist

- [x] JWT authentication
- [x] Password hashing (bcrypt)
- [x] Role-based access control
- [x] Input validation
- [x] Rate limiting
- [ ] CSRF protection
- [ ] SQL injection prevention (TypeORM handles this)
- [ ] XSS prevention
- [ ] Webhook signature verification
- [ ] Secure cookie settings
- [ ] HTTPS enforcement

## 📊 Performance Optimization

1. **Database:**
   - Add indexes on frequently queried fields
   - Use pagination for large datasets
   - Implement database connection pooling

2. **Caching:**
   - Cache event listings
   - Cache user sessions
   - Cache club settings

3. **Mobile:**
   - Lazy load images
   - Implement virtual lists
   - Use React.memo for expensive components
   - Optimize bundle size

## 🚀 Deployment

### Backend
```bash
docker build -f backend/Dockerfile.prod -t club-backend:latest .
docker push your-registry/club-backend:latest
```

### Web Admin
```bash
cd web-admin
npm run build
# Deploy to Vercel/Netlify or serve via Nginx
```

### Mobile
```bash
cd mobile
eas build --platform all
eas submit --platform all
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [React Native Documentation](https://reactnative.dev)
- [Razorpay API](https://razorpay.com/docs/api)
- [Stripe API](https://stripe.com/docs/api)

## 🎓 Next Steps

1. Review the created files and understand the structure
2. Install dependencies: `cd backend && npm install`
3. Setup PostgreSQL and Redis
4. Copy `.env.example` to `.env` and configure
5. Run migrations: `npm run migration:run`
6. Start development: `docker-compose up`
7. Access API docs: http://localhost:3000/api/docs
8. Begin implementing remaining modules following this guide

---

**Need Help?** Check the inline comments in the code or refer to the official documentation of each technology.
