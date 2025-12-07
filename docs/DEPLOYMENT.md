# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Domain name (for production)
- SSL certificate (for production)

## Local Development

### 1. Clone Repository
```bash
git clone https://github.com/velormastmalai-ai/club-management-app.git
cd club-management-app
```

### 2. Environment Setup

#### Backend
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=club_management
DATABASE_USER=club_user
DATABASE_PASSWORD=your_secure_password
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
```

#### Web Admin
```bash
cd web-admin
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:3000
```

### 3. Start Services
```bash
# From project root
docker-compose up -d
```

### 4. Run Migrations
```bash
cd backend
npm install
npm run migration:run
```

### 5. Access Application
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api/docs
- Web Admin: http://localhost:5173

## Production Deployment

### Option 1: Docker Compose (Simple)

#### 1. Prepare Environment
```bash
# Create production .env
cp backend/.env.example backend/.env.production
```

Edit with production values:
```env
NODE_ENV=production
DATABASE_PASSWORD=strong_random_password
JWT_SECRET=strong_random_secret_min_32_chars
RAZORPAY_KEY_ID=your_razorpay_key
STRIPE_SECRET_KEY=your_stripe_key
SENDGRID_API_KEY=your_sendgrid_key
```

#### 2. Build and Deploy
```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### 3. Setup Nginx Reverse Proxy
```nginx
# /etc/nginx/sites-available/club-app
server {
    listen 80;
    server_name api.yourclub.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name admin.yourclub.com;
    
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. Setup SSL with Let's Encrypt
```bash
sudo certbot --nginx -d api.yourclub.com -d admin.yourclub.com
```

### Option 2: AWS Deployment

#### Architecture
```
Route 53 (DNS)
    ↓
CloudFront (CDN)
    ↓
Application Load Balancer
    ↓
ECS Fargate (Backend)
    ↓
RDS PostgreSQL + ElastiCache Redis
```

#### 1. Setup RDS PostgreSQL
```bash
aws rds create-db-instance \
  --db-instance-identifier club-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourPassword \
  --allocated-storage 20
```

#### 2. Setup ElastiCache Redis
```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id club-redis \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1
```

#### 3. Build and Push Docker Image
```bash
# Build
docker build -f backend/Dockerfile.prod -t club-backend:latest .

# Tag
docker tag club-backend:latest YOUR_ECR_REPO/club-backend:latest

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_REPO
docker push YOUR_ECR_REPO/club-backend:latest
```

#### 4. Create ECS Task Definition
```json
{
  "family": "club-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "YOUR_ECR_REPO/club-backend:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:db-password"
        }
      ]
    }
  ]
}
```

#### 5. Create ECS Service
```bash
aws ecs create-service \
  --cluster club-cluster \
  --service-name club-backend \
  --task-definition club-backend \
  --desired-count 2 \
  --launch-type FARGATE \
  --load-balancers targetGroupArn=YOUR_TG_ARN,containerName=backend,containerPort=3000
```

### Option 3: Render Deployment

#### 1. Create render.yaml
```yaml
services:
  - type: web
    name: club-backend
    env: docker
    dockerfilePath: ./backend/Dockerfile.prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: club-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          name: club-redis
          type: redis
          property: connectionString
    
  - type: web
    name: club-admin
    env: static
    buildCommand: cd web-admin && npm install && npm run build
    staticPublishPath: ./web-admin/dist

databases:
  - name: club-db
    databaseName: club_management
    user: club_user

  - name: club-redis
    type: redis
```

#### 2. Deploy
```bash
# Connect GitHub repo to Render
# Render will auto-deploy on push to main
```

### Option 4: Vercel + Railway

#### Backend on Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
cd backend
railway init

# Deploy
railway up
```

#### Frontend on Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd web-admin
vercel --prod
```

## Mobile App Deployment

### iOS (App Store)

#### 1. Setup EAS
```bash
cd mobile
npm install -g eas-cli
eas login
eas build:configure
```

#### 2. Build
```bash
eas build --platform ios --profile production
```

#### 3. Submit
```bash
eas submit --platform ios
```

### Android (Play Store)

#### 1. Build
```bash
eas build --platform android --profile production
```

#### 2. Submit
```bash
eas submit --platform android
```

## Database Migrations

### Production Migration
```bash
# Backup first!
pg_dump -h your-db-host -U club_user club_management > backup.sql

# Run migration
cd backend
npm run migration:run
```

### Rollback
```bash
npm run migration:revert
```

## Monitoring Setup

### 1. Application Monitoring (Sentry)
```bash
# Install
npm install @sentry/node

# Configure in main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 2. Logging (CloudWatch/Datadog)
```typescript
// logger.service.ts
import { Logger } from '@nestjs/common';

export class AppLogger extends Logger {
  log(message: string, context?: string) {
    // Send to CloudWatch/Datadog
    super.log(message, context);
  }
}
```

### 3. Uptime Monitoring
- Use UptimeRobot or Pingdom
- Monitor endpoints:
  - `GET /health`
  - `GET /api/docs`

## Backup Strategy

### Database Backup
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
pg_dump -h $DB_HOST -U $DB_USER $DB_NAME | gzip > backup_$DATE.sql.gz
aws s3 cp backup_$DATE.sql.gz s3://your-backup-bucket/
```

### File Backup
```bash
# Backup uploads
aws s3 sync ./uploads s3://your-backup-bucket/uploads
```

## Security Checklist

- [ ] Environment variables secured
- [ ] SSL/TLS enabled
- [ ] Database encrypted at rest
- [ ] Secrets in vault (AWS Secrets Manager)
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Helmet middleware active
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (TypeORM)
- [ ] XSS prevention
- [ ] CSRF tokens for state-changing operations
- [ ] Regular security updates
- [ ] Audit logs enabled

## Performance Optimization

### 1. Database
```sql
-- Add indexes
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_event_id ON bookings(event_id);
```

### 2. Caching
```typescript
// Cache event listings
@Cacheable('events', 300) // 5 minutes
async findAll() {
  return this.eventsRepository.find();
}
```

### 3. CDN
- Serve static assets via CloudFront/Cloudflare
- Enable gzip compression
- Set proper cache headers

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Common issues:
# 1. Database not ready - wait for health check
# 2. Missing env vars - check .env
# 3. Port conflict - change PORT in .env
```

### Database connection failed
```bash
# Test connection
psql -h localhost -U club_user -d club_management

# Check credentials in .env
# Ensure PostgreSQL is running
docker-compose ps
```

### Redis connection failed
```bash
# Test Redis
redis-cli ping

# Check Redis is running
docker-compose ps redis
```

## Rollback Procedure

### 1. Identify Issue
```bash
# Check logs
docker-compose logs --tail=100 backend
```

### 2. Rollback Code
```bash
# Revert to previous version
git revert HEAD
git push

# Or deploy previous Docker image
docker pull YOUR_REPO/club-backend:previous-tag
```

### 3. Rollback Database
```bash
# Restore from backup
psql -h localhost -U club_user club_management < backup.sql
```

## Support

For deployment issues:
1. Check logs first
2. Review environment variables
3. Verify external service credentials
4. Check GitHub Issues
5. Contact support team

---

**Production Checklist**: Complete all security items before going live!
