# 🎉 WORKING DEMO - 3 Easy Ways to Try It

## Option 1: Instant Browser Demo (No Installation!) ⚡

**Fastest way - works in 10 seconds!**

### Method A: Download and Open HTML File
1. Download this file: [demo.html](https://raw.githubusercontent.com/velormastmalai-ai/club-management-app/main/demo.html)
2. Open it in your browser (double-click)
3. Login with demo accounts:
   - **Owner**: owner@club.com / password123
   - **Admin**: admin@club.com / password123
   - **User**: user@club.com / password123

### Method B: Direct GitHub Pages
Visit: **https://velormastmalai-ai.github.io/club-management-app/demo.html**

✅ **What works:**
- User authentication
- Role-based access (Owner/Admin/User)
- Event browsing
- Booking system
- Real-time stats
- Fully interactive UI

---

## Option 2: StackBlitz Online IDE (No Installation!) 🌐

**Run full Node.js backend in browser!**

### Click to Open:
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/node?title=Club+Management+Demo&description=Working+demo+of+club+management+system+with+Express+API&template=node)

### Or manually:
1. Go to: https://stackblitz.com/fork/node
2. Replace `index.js` with code from: [backend/simple-demo/index.js](https://github.com/velormastmalai-ai/club-management-app/blob/main/backend/simple-demo/index.js)
3. Click "Run"

✅ **What works:**
- Full Express.js API
- JWT authentication
- RESTful endpoints
- In-memory database
- CORS enabled
- Test with cURL or Postman

**API Endpoints:**
- `POST /auth/login` - Login
- `GET /events` - List events
- `POST /events/:id/book` - Book event
- `GET /bookings` - My bookings
- `GET /stats` - Statistics (Admin/Owner)

---

## Option 3: Local Installation (Full Features) 💻

**For developers who want to explore the code**

### Prerequisites:
- Node.js 18+ installed
- Git installed

### Steps:

```bash
# 1. Clone repository
git clone https://github.com/velormastmalai-ai/club-management-app.git
cd club-management-app

# 2. Go to backend
cd backend

# 3. Install dependencies
npm install

# 4. Create .env file
cat > .env << 'EOF'
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters
EOF

# 5. Start server
npm run start:dev
```

### Access:
- **API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/docs

### Test with cURL:

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"owner@club.com","password":"password123"}'

# Get events
curl http://localhost:3000/events

# Book event (use token from login)
curl -X POST http://localhost:3000/events/1/book \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"seats":2}'
```

---

## 🎯 Demo Accounts

All options use the same demo accounts:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Owner** | owner@club.com | password123 | Full access, customize club, toggle maintenance |
| **Admin** | admin@club.com | password123 | Manage events, bookings, view stats |
| **User** | user@club.com | password123 | Browse events, book tickets |

---

## 📊 Demo Data

### Events (4 pre-loaded)
1. **Live Music Night** - Tonight, 100 capacity, ₹500
2. **Comedy Night** - Tomorrow, 150 capacity, ₹600
3. **DJ Night** - Next week, 200 capacity, ₹800
4. **Wine Tasting** - Next month, 50 capacity, ₹2,500

### Features You Can Test
- ✅ User authentication (JWT)
- ✅ Role-based access control
- ✅ Event browsing
- ✅ Booking system
- ✅ Real-time statistics
- ✅ Responsive UI

---

## 🐛 Troubleshooting

### Option 1 (HTML Demo)
**Problem**: Page doesn't load
- **Solution**: Make sure JavaScript is enabled in your browser

**Problem**: Can't login
- **Solution**: Use exact credentials: owner@club.com / password123

### Option 2 (StackBlitz)
**Problem**: StackBlitz won't load
- **Solution**: Try incognito mode or different browser

**Problem**: Server error
- **Solution**: Refresh the page and try again

### Option 3 (Local)
**Problem**: Port 3000 already in use
```bash
# Change port in .env
PORT=3001
```

**Problem**: npm install fails
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Module not found
```bash
# Make sure you're in backend directory
cd backend
npm install
```

---

## 🎓 What to Explore

### 1. Authentication Flow
- Login with different roles
- See how JWT tokens work
- Test role-based permissions

### 2. Event Management
- Browse available events
- Check capacity and pricing
- See real-time booking updates

### 3. Booking System
- Book events as a user
- View booking history
- See confirmation messages

### 4. Admin Features
- View statistics (Admin/Owner only)
- See all bookings
- Manage events

---

## 📚 Next Steps

After trying the demo:

1. **Review the Code**
   - Check `backend/src/` for implementation
   - Study the database schema
   - Understand the API structure

2. **Read Documentation**
   - `IMPLEMENTATION_GUIDE.md` - Development guide
   - `docs/ARCHITECTURE.md` - System design
   - `docs/DEPLOYMENT.md` - Deployment options

3. **Extend the Demo**
   - Add new features
   - Implement remaining modules
   - Build the frontend

---

## 💡 Why This Demo?

✅ **No Complex Setup** - Works in browser or with simple npm install
✅ **Real Code** - Production-ready patterns and architecture
✅ **Interactive** - Try all features immediately
✅ **Educational** - Learn by exploring working code
✅ **Scalable** - Foundation for full application

---

## 🤝 Need Help?

- **Issues**: https://github.com/velormastmalai-ai/club-management-app/issues
- **Documentation**: Check the `/docs` folder
- **Questions**: Open a GitHub discussion

---

## 🎉 Enjoy the Demo!

Choose the option that works best for you:
- **Quick look?** → Option 1 (HTML in browser)
- **Test API?** → Option 2 (StackBlitz)
- **Full exploration?** → Option 3 (Local install)

All options are **fully functional** and demonstrate the core features of the club management system!

---

**Built with ❤️ for seamless club management**
