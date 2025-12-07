# System Architecture

## Overview

The Club Management App follows a modern microservices-inspired architecture with clear separation between frontend, backend, and infrastructure layers.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │   Mobile App     │              │   Web Admin      │         │
│  │  (React Native)  │              │     (React)      │         │
│  │                  │              │                  │         │
│  │  - Event Browse  │              │  - Dashboard     │         │
│  │  - Booking       │              │  - Event Mgmt    │         │
│  │  - Payments      │              │  - Booking Mgmt  │         │
│  │  - Profile       │              │  - Analytics     │         │
│  └────────┬─────────┘              └────────┬─────────┘         │
│           │                                 │                    │
└───────────┼─────────────────────────────────┼────────────────────┘
            │                                 │
            │         HTTPS/REST API          │
            │                                 │
┌───────────┴─────────────────────────────────┴────────────────────┐
│                      APPLICATION LAYER                            │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              NestJS Backend API Server                   │    │
│  │                                                           │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │    │
│  │  │   Auth   │  │  Events  │  │ Bookings │  │Payments │ │    │
│  │  │  Module  │  │  Module  │  │  Module  │  │ Module  │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │    │
│  │                                                           │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │    │
│  │  │  Users   │  │  Clubs   │  │ Notifs   │  │Analytics│ │    │
│  │  │  Module  │  │  Module  │  │  Module  │  │ Module  │ │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │    │
│  │                                                           │    │
│  │  ┌────────────────────────────────────────────────────┐ │    │
│  │  │           Middleware & Guards                       │ │    │
│  │  │  - JWT Auth  - RBAC  - Rate Limit  - Validation   │ │    │
│  │  └────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
            │                                 │
            │                                 │
┌───────────┴─────────────────────────────────┴────────────────────┐
│                      DATA & SERVICES LAYER                        │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  PostgreSQL  │  │    Redis     │  │    Bull Queue        │   │
│  │              │  │              │  │                      │   │
│  │  - Users     │  │  - Sessions  │  │  - Email Jobs        │   │
│  │  - Events    │  │  - Cache     │  │  - Reminder Jobs     │   │
│  │  - Bookings  │  │  - Rate Lmt  │  │  - Reconciliation    │   │
│  │  - Payments  │  │              │  │  - Cleanup Jobs      │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
            │                                 │
            │                                 │
┌───────────┴─────────────────────────────────┴────────────────────┐
│                    EXTERNAL SERVICES                              │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │Razorpay/ │  │SendGrid/ │  │ Firebase │  │    Twilio    │    │
│  │ Stripe   │  │Postmark  │  │   FCM    │  │     SMS      │    │
│  │          │  │          │  │          │  │              │    │
│  │ Payments │  │  Email   │  │   Push   │  │     SMS      │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## Component Details

### Client Layer

#### Mobile App (React Native + Expo)
- **Purpose**: User-facing mobile application
- **Key Features**:
  - Event browsing and discovery
  - Ticket booking with seat selection
  - Payment processing
  - QR code ticket display
  - Push notifications
  - Offline support
- **Tech Stack**: React Native, Expo, React Navigation, React Query

#### Web Admin (React + Vite)
- **Purpose**: Administrative dashboard
- **Key Features**:
  - Analytics dashboard
  - Event management (CRUD)
  - Booking management
  - User management
  - Club customization (Owner)
  - Notification sending
- **Tech Stack**: React, TypeScript, TailwindCSS, React Query

### Application Layer

#### NestJS Backend
- **Purpose**: Core business logic and API
- **Architecture**: Modular monolith with clear boundaries
- **Key Modules**:
  - **Auth**: JWT authentication, refresh tokens
  - **Users**: User management, profiles
  - **Clubs**: Club settings, customization
  - **Events**: Event CRUD, capacity management
  - **Bookings**: Booking flow, seat selection
  - **Payments**: Payment processing, refunds
  - **Notifications**: Multi-channel messaging
  - **Analytics**: Reporting and metrics
  - **Audit**: Action logging

### Data Layer

#### PostgreSQL
- **Purpose**: Primary data store
- **Schema**:
  - Users (with RBAC)
  - Clubs (owner settings)
  - Events (single/recurring)
  - Bookings (with QR codes)
  - Payments (provider agnostic)
  - Notifications (multi-channel)
  - Audit Logs (compliance)

#### Redis
- **Purpose**: Caching and session management
- **Use Cases**:
  - Session storage
  - Rate limiting
  - Event cache
  - Queue backend

#### Bull Queue
- **Purpose**: Background job processing
- **Jobs**:
  - Email sending
  - Event reminders
  - Payment reconciliation
  - Data cleanup

### External Services

#### Payment Providers
- **Razorpay**: Primary for India
- **Stripe**: International payments
- **Features**: Webhooks, refunds, reconciliation

#### Communication Services
- **SendGrid/Postmark**: Transactional emails
- **Firebase FCM**: Push notifications
- **Twilio**: SMS notifications (optional)

## Data Flow

### Booking Flow
```
1. User selects event → Mobile App
2. Check availability → Backend API
3. Create pending booking → Database
4. Initiate payment → Payment Provider
5. Webhook callback → Backend API
6. Update booking status → Database
7. Send confirmation → Notification Service
8. Generate QR code → Backend API
9. Display ticket → Mobile App
```

### Event Reminder Flow
```
1. Scheduled job triggers → Bull Queue
2. Query upcoming events → Database
3. Get attendees → Database
4. Create notifications → Notification Service
5. Send via channels → External Services
   - Email → SendGrid
   - Push → FCM
   - SMS → Twilio
6. Log delivery status → Database
```

## Security Architecture

### Authentication Flow
```
1. User login → Backend API
2. Validate credentials → Database
3. Generate JWT + Refresh Token → Auth Service
4. Return tokens → Client
5. Store securely → Client Storage
6. Include in requests → Authorization Header
7. Validate JWT → JWT Guard
8. Check permissions → RBAC Guard
9. Process request → Controller
```

### Security Layers
1. **Network**: HTTPS, CORS, Rate Limiting
2. **Application**: JWT, RBAC, Input Validation
3. **Data**: Encryption at rest, Secure connections
4. **Audit**: Action logging, IP tracking

## Scalability Considerations

### Horizontal Scaling
- **Backend**: Stateless design allows multiple instances
- **Database**: Read replicas for queries
- **Redis**: Cluster mode for high availability
- **Queue**: Multiple workers for job processing

### Caching Strategy
- **L1 (Application)**: In-memory cache for hot data
- **L2 (Redis)**: Distributed cache for shared data
- **L3 (CDN)**: Static assets and images

### Performance Optimization
- **Database**: Indexes on frequently queried fields
- **API**: Pagination for large datasets
- **Mobile**: Lazy loading, virtual lists
- **Web**: Code splitting, tree shaking

## Deployment Architecture

### Development
```
Docker Compose
├── Backend (Hot reload)
├── PostgreSQL
├── Redis
└── Web Admin (Hot reload)
```

### Production
```
Cloud Infrastructure
├── Load Balancer
├── Backend Instances (Auto-scaling)
├── PostgreSQL (Managed)
├── Redis (Managed)
├── CDN (Static assets)
└── Monitoring (Logs, Metrics)
```

## Monitoring & Observability

### Metrics
- Request rate, latency, errors
- Database query performance
- Queue job processing time
- Payment success rate

### Logging
- Application logs (Winston)
- Access logs (Morgan)
- Error tracking (Sentry)
- Audit logs (Database)

### Alerts
- High error rate
- Slow response time
- Failed payments
- Queue backlog

## Disaster Recovery

### Backup Strategy
- **Database**: Daily automated backups
- **Files**: S3/Cloud storage with versioning
- **Configuration**: Version controlled

### Recovery Plan
- **RTO**: 4 hours
- **RPO**: 24 hours
- **Procedure**: Documented runbooks

## Future Enhancements

### Phase 2
- Microservices split (Events, Payments)
- GraphQL API
- Real-time features (WebSocket)
- Advanced analytics (ML)

### Phase 3
- Multi-tenancy
- White-label solution
- Mobile SDK
- API marketplace

---

This architecture provides a solid foundation for a scalable, secure, and maintainable club management platform.
