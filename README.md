# Club Management App

Production-ready full-stack club management platform with comprehensive role-based access control, event management, bookings, payments, and notifications.

## 🎯 Features

### Role-Based Access Control
- **Owner**: Super-admin with full customization, app control, and analytics
- **Admin**: Event management, bookings, payments, member management
- **User**: Browse events, book tickets, manage profile

### Core Capabilities
- 🎨 Owner-level customization (themes, layouts, content)
- 📅 Event engine (single/recurring, capacity, waitlists)
- 💳 Integrated payments (Razorpay/Stripe) with refunds
- 🔔 Multi-channel notifications (Push, Email, SMS)
- 📊 Admin dashboard with analytics
- 🔒 Security-first (RBAC, audit logs, encryption)
- 📱 Smooth 60fps mobile experience
- 🌐 Offline support and resume capability

## 🏗️ Tech Stack

### Frontend
- **Mobile**: React Native (Expo) + TypeScript
- **Web Admin**: React + TypeScript + Vite
- **UI**: TailwindCSS, Framer Motion

### Backend
- **API**: Node.js + TypeScript + NestJS
- **Database**: PostgreSQL + TypeORM
- **Cache/Queue**: Redis + Bull
- **Auth**: JWT with refresh tokens

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: AWS/GCP/Render ready

### Integrations
- **Payments**: Razorpay/Stripe
- **Push**: FCM/APNs
- **Email**: SendGrid/Postmark
- **SMS**: Twilio (optional)

## 📁 Project Structure

```
club-management-app/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── clubs/          # Club settings
│   │   ├── events/         # Event management
│   │   ├── bookings/       # Booking system
│   │   ├── payments/       # Payment processing
│   │   ├── notifications/  # Notification service
│   │   ├── analytics/      # Analytics & reporting
│   │   └── common/         # Shared utilities
│   ├── test/
│   ├── Dockerfile
│   └── package.json
├── web-admin/              # React admin dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/
│   ├── Dockerfile
│   └── package.json
├── mobile/                 # React Native app
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   └── services/
│   └── package.json
├── docker-compose.yml
├── .github/workflows/      # CI/CD pipelines
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 7+

### 1. Clone Repository
```bash
git clone https://github.com/velormastmalai-ai/club-management-app.git
cd club-management-app
```

### 2. Environment Setup
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your credentials

# Web Admin
cp web-admin/.env.example web-admin/.env

# Mobile
cp mobile/.env.example mobile/.env
```

### 3. Start with Docker Compose
```bash
docker-compose up -d
```

This starts:
- Backend API: http://localhost:3000
- Web Admin: http://localhost:5173
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 4. Run Migrations
```bash
cd backend
npm run migration:run
npm run seed
```

### 5. Access Application
- **API Docs**: http://localhost:3000/api/docs
- **Admin Panel**: http://localhost:5173
- **Default Owner**: owner@club.com / password123

## 📱 Mobile Development

### iOS
```bash
cd mobile
npm install
npx expo run:ios
```

### Android
```bash
cd mobile
npm install
npx expo run:android
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test              # Unit tests
npm run test:e2e          # E2E tests
npm run test:cov          # Coverage report
```

### Frontend Tests
```bash
cd web-admin
npm run test
```

## 📚 API Documentation

OpenAPI/Swagger documentation available at `/api/docs` when running the backend.

### Key Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Logout

#### Owner
- `GET /owner/settings` - Get club settings
- `PUT /owner/settings` - Update settings
- `POST /owner/transfer` - Transfer ownership

#### Admin
- `GET /admin/events` - List events
- `POST /admin/events` - Create event
- `PUT /admin/events/:id` - Update event
- `GET /admin/bookings` - List bookings
- `POST /admin/bookings/:id/refund` - Issue refund
- `POST /admin/notifications/send` - Send notification

#### Public/User
- `GET /events` - Browse events
- `GET /events/:id` - Event details
- `POST /events/:id/book` - Book ticket
- `POST /payments/webhook` - Payment webhook

## 🔒 Security

- JWT authentication with refresh tokens
- Role-based access control (RBAC)
- Rate limiting on critical endpoints
- Input sanitization and validation
- Encrypted credentials at rest
- HTTPS enforced
- PCI-DSS compliant payment handling
- Audit logs for all admin actions

## 🎨 Customization

Owners can customize:
- Brand colors and fonts
- Logo and hero images
- Event layouts
- Maintenance messages
- Email templates
- Notification content

## 📊 Analytics

Admin dashboard includes:
- Revenue tracking
- Booking trends
- User growth
- Event performance
- Payment reconciliation
- Export to CSV

## 🔔 Notifications

Supported channels:
- Push notifications (FCM/APNs)
- Email (SendGrid/Postmark)
- SMS (Twilio)
- In-app banners

Template system with placeholders:
- `{{name}}` - User name
- `{{event_title}}` - Event name
- `{{start_time}}` - Event start time
- `{{booking_id}}` - Booking reference

## 🚢 Deployment

### Docker Production Build
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### AWS Deployment
See `docs/deployment/aws.md`

### GCP Deployment
See `docs/deployment/gcp.md`

### Render Deployment
See `docs/deployment/render.md`

## 📈 Performance

- 60fps animations on mobile
- 16ms frame budget for interactions
- Redis caching for frequent queries
- Background job queue for heavy tasks
- Pagination for large datasets
- Optimized database queries

## 🌍 Localization

Easy language addition:
```typescript
// Add to i18n config
import en from './locales/en.json';
import es from './locales/es.json';
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file

## 🆘 Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Email: support@club.app

## ✅ Acceptance Criteria

- [x] Owner can toggle app maintenance mode
- [x] Admin can create/manage events and bookings
- [x] Users can browse, book, and pay for events
- [x] Payment webhooks update booking status
- [x] Notifications sent via multiple channels
- [x] Audit logs capture all admin actions
- [x] Automated tests with CI pipeline
- [x] 70%+ test coverage
- [x] Security best practices implemented
- [x] Performance optimized (60fps mobile)

---

Built with ❤️ for seamless club management