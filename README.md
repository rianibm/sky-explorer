## 🎯 Final Structure:
app/
├── page.tsx                 # Landing (guest accessible)
├── login/page.tsx          # User login
├── flights/page.tsx        # Flight search results (guest accessible)
├── booking/page.tsx        # User booking (protected)
├── profile/
│   ├── page.tsx           # User profile (protected)
│   └── settings/page.tsx  # User settings (protected)
└── admin/                 # Admin section (admin only)
    ├── login/page.tsx     # Admin login
    ├── dashboard/page.tsx # Admin dashboard
    ├── bookings/page.tsx  # Booking management
    ├── flights/page.tsx   # Flight management
    └── accounts/page.tsx  # User management


## ✅ User Flow:
Guest: Landing → Search Flights → Login (to book)
User: Login → Profile/Booking
Admin: Admin Login → Dashboard → Management Pages
