# 🚀 QUICK START - Working Demo in 5 Minutes

## Prerequisites
- Node.js 18+ installed
- Git installed

## Step 1: Clone Repository
```bash
git clone https://github.com/velormastmalai-ai/club-management-app.git
cd club-management-app
```

## Step 2: Run Simple Backend (No Docker Required)

```bash
# Go to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
NODE_ENV=development
PORT=3000
DATABASE_URL=file:./dev.db
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters
EOF

# Start backend
npm run start:dev
```

## Step 3: Access Demo

Open browser:
- **API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/docs

## Default Credentials
- Email: `admin@demo.com`
- Password: `demo123`

---

## Alternative: Use StackBlitz (Online, No Installation)

Click here to open in StackBlitz:
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/velormastmalai-ai/club-management-app)

This will open a fully working demo in your browser with no installation needed!

---

## Troubleshooting

### Port 3000 already in use
```bash
# Change port in .env
PORT=3001
```

### Dependencies fail to install
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Still not working?
Open an issue: https://github.com/velormastmalai-ai/club-management-app/issues
