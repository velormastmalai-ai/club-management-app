import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole, UserStatus } from '../../users/entities/user.entity';
import { Club } from '../../clubs/entities/club.entity';
import { Event, EventStatus, EventType } from '../../events/entities/event.entity';
import { Booking, BookingStatus } from '../../bookings/entities/booking.entity';
import { Payment, PaymentProvider, PaymentStatus } from '../../payments/entities/payment.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'club_user',
    password: process.env.DATABASE_PASSWORD || 'club_password',
    database: process.env.DATABASE_NAME || 'club_management',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true,
  });

  await dataSource.initialize();

  console.log('🌱 Seeding database...');

  // Clear existing data
  await dataSource.query('TRUNCATE TABLE payments CASCADE');
  await dataSource.query('TRUNCATE TABLE bookings CASCADE');
  await dataSource.query('TRUNCATE TABLE events CASCADE');
  await dataSource.query('TRUNCATE TABLE clubs CASCADE');
  await dataSource.query('TRUNCATE TABLE users CASCADE');

  const userRepository = dataSource.getRepository(User);
  const clubRepository = dataSource.getRepository(Club);
  const eventRepository = dataSource.getRepository(Event);
  const bookingRepository = dataSource.getRepository(Booking);
  const paymentRepository = dataSource.getRepository(Payment);

  // Create Users
  console.log('Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const owner = userRepository.create({
    email: 'owner@club.com',
    password: hashedPassword,
    name: 'Club Owner',
    role: UserRole.OWNER,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    preferences: {
      notifications: { email: true, push: true, sms: false },
      language: 'en',
      currency: 'INR',
    },
  });
  await userRepository.save(owner);

  const admin = userRepository.create({
    email: 'admin@club.com',
    password: hashedPassword,
    name: 'Club Admin',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    preferences: {
      notifications: { email: true, push: true, sms: false },
      language: 'en',
      currency: 'INR',
    },
  });
  await userRepository.save(admin);

  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = userRepository.create({
      email: `user${i}@example.com`,
      password: hashedPassword,
      name: `User ${i}`,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      preferences: {
        notifications: { email: true, push: true, sms: false },
        language: 'en',
        currency: 'INR',
      },
    });
    await userRepository.save(user);
    users.push(user);
  }

  // Create Club
  console.log('Creating club...');
  const club = clubRepository.create({
    name: 'Elite Club',
    description: 'Premium club for exclusive events and experiences',
    ownerId: owner.id,
    enabled: true,
    brandAssets: {
      logo: 'https://via.placeholder.com/200x200?text=Elite+Club',
      favicon: 'https://via.placeholder.com/32x32',
      heroImage: 'https://via.placeholder.com/1920x600?text=Welcome+to+Elite+Club',
      banners: [
        'https://via.placeholder.com/1200x400?text=Banner+1',
        'https://via.placeholder.com/1200x400?text=Banner+2',
      ],
    },
    theme: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#0369a1',
      accentColor: '#f59e0b',
      fontFamily: 'Inter, sans-serif',
      customCss: '',
    },
    settings: {
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      language: 'en',
      bookingSettings: {
        requireApproval: false,
        allowCancellation: true,
        cancellationDeadlineHours: 24,
        maxBookingsPerUser: 10,
      },
      paymentSettings: {
        provider: 'razorpay',
        acceptedMethods: ['card', 'upi', 'netbanking'],
        refundPolicy: 'Full refund up to 24 hours before event',
      },
      notificationSettings: {
        enableEmail: true,
        enablePush: true,
        enableSms: false,
        reminderHours: [24, 2],
      },
    },
    customContent: {
      homepage: {
        title: 'Welcome to Elite Club',
        subtitle: 'Experience exclusive events and premium entertainment',
        featuredEvents: [],
        sections: [
          {
            type: 'text',
            title: 'About Us',
            content: 'Elite Club offers the finest events and experiences for our members.',
            order: 1,
          },
        ],
      },
      footer: {
        text: '© 2025 Elite Club. All rights reserved.',
        links: [
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Service', url: '/terms' },
        ],
      },
    },
  });
  await clubRepository.save(club);

  // Create Events
  console.log('Creating events...');
  const now = new Date();
  const events = [];

  // Event 1: Live Music Night (Tonight)
  const event1 = eventRepository.create({
    clubId: club.id,
    title: 'Live Music Night',
    description: 'Enjoy an evening of live music with top local artists',
    type: EventType.SINGLE,
    startTime: new Date(now.getTime() + 6 * 60 * 60 * 1000), // 6 hours from now
    endTime: new Date(now.getTime() + 10 * 60 * 60 * 1000), // 10 hours from now
    capacity: 100,
    bookedSeats: 45,
    priceTiers: [
      {
        id: '1',
        name: 'General Admission',
        price: 500,
        currency: 'INR',
        capacity: 70,
        description: 'Standing area',
      },
      {
        id: '2',
        name: 'VIP',
        price: 1000,
        currency: 'INR',
        capacity: 30,
        description: 'Reserved seating with complimentary drinks',
      },
    ],
    images: [
      'https://via.placeholder.com/800x600?text=Live+Music+Night',
    ],
    venue: 'Main Hall',
    location: {
      address: '123 Club Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      zipCode: '400001',
      coordinates: { lat: 19.0760, lng: 72.8777 },
    },
    status: EventStatus.PUBLISHED,
    bookingOpen: true,
    enableWaitlist: true,
    tags: ['music', 'live', 'entertainment'],
  });
  await eventRepository.save(event1);
  events.push(event1);

  // Event 2: Comedy Show (Tomorrow)
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20, 0, 0, 0);

  const event2 = eventRepository.create({
    clubId: club.id,
    title: 'Stand-Up Comedy Night',
    description: 'Laugh out loud with India\'s funniest comedians',
    type: EventType.SINGLE,
    startTime: tomorrow,
    endTime: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000),
    capacity: 150,
    bookedSeats: 78,
    priceTiers: [
      {
        id: '1',
        name: 'Standard',
        price: 600,
        currency: 'INR',
        capacity: 100,
        description: 'Regular seating',
      },
      {
        id: '2',
        name: 'Premium',
        price: 1200,
        currency: 'INR',
        capacity: 50,
        description: 'Front row seating',
      },
    ],
    images: [
      'https://via.placeholder.com/800x600?text=Comedy+Night',
    ],
    venue: 'Comedy Hall',
    status: EventStatus.PUBLISHED,
    bookingOpen: true,
    tags: ['comedy', 'entertainment', 'standup'],
  });
  await eventRepository.save(event2);
  events.push(event2);

  // Event 3: DJ Night (Next Week)
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(22, 0, 0, 0);

  const event3 = eventRepository.create({
    clubId: club.id,
    title: 'Electronic Dance Night',
    description: 'Dance the night away with international DJs',
    type: EventType.SINGLE,
    startTime: nextWeek,
    endTime: new Date(nextWeek.getTime() + 5 * 60 * 60 * 1000),
    capacity: 200,
    bookedSeats: 120,
    priceTiers: [
      {
        id: '1',
        name: 'Early Bird',
        price: 800,
        currency: 'INR',
        capacity: 100,
        description: 'Limited early bird tickets',
      },
      {
        id: '2',
        name: 'Regular',
        price: 1200,
        currency: 'INR',
        capacity: 80,
        description: 'Regular entry',
      },
      {
        id: '3',
        name: 'VIP',
        price: 2000,
        currency: 'INR',
        capacity: 20,
        description: 'VIP lounge access',
      },
    ],
    images: [
      'https://via.placeholder.com/800x600?text=DJ+Night',
    ],
    venue: 'Main Dance Floor',
    status: EventStatus.PUBLISHED,
    bookingOpen: true,
    enableWaitlist: true,
    tags: ['dj', 'dance', 'electronic', 'party'],
  });
  await eventRepository.save(event3);
  events.push(event3);

  // Event 4: Wine Tasting (Next Month)
  const nextMonth = new Date(now);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setHours(18, 0, 0, 0);

  const event4 = eventRepository.create({
    clubId: club.id,
    title: 'Premium Wine Tasting',
    description: 'Sample the finest wines from around the world',
    type: EventType.SINGLE,
    startTime: nextMonth,
    endTime: new Date(nextMonth.getTime() + 3 * 60 * 60 * 1000),
    capacity: 50,
    bookedSeats: 15,
    priceTiers: [
      {
        id: '1',
        name: 'Standard Tasting',
        price: 2500,
        currency: 'INR',
        capacity: 30,
        description: '5 wine samples',
      },
      {
        id: '2',
        name: 'Premium Tasting',
        price: 5000,
        currency: 'INR',
        capacity: 20,
        description: '10 premium wine samples',
      },
    ],
    images: [
      'https://via.placeholder.com/800x600?text=Wine+Tasting',
    ],
    venue: 'Wine Lounge',
    status: EventStatus.PUBLISHED,
    bookingOpen: true,
    tags: ['wine', 'tasting', 'premium', 'exclusive'],
  });
  await eventRepository.save(event4);
  events.push(event4);

  // Create Bookings
  console.log('Creating bookings...');
  for (let i = 0; i < 20; i++) {
    const user = users[i % users.length];
    const event = events[i % events.length];
    const priceTier = event.priceTiers[i % event.priceTiers.length];

    const booking = bookingRepository.create({
      userId: user.id,
      eventId: event.id,
      status: i < 15 ? BookingStatus.CONFIRMED : BookingStatus.PENDING,
      seats: Math.floor(Math.random() * 3) + 1,
      amountPaid: priceTier.price,
      currency: 'INR',
      priceTierId: priceTier.id,
      priceTierName: priceTier.name,
      ticketNumber: `TKT-${Date.now()}-${i}`,
      qrCode: `QR-${Date.now()}-${i}`,
    });
    await bookingRepository.save(booking);

    // Create Payment
    if (i < 15) {
      const payment = paymentRepository.create({
        bookingId: booking.id,
        provider: i % 2 === 0 ? PaymentProvider.RAZORPAY : PaymentProvider.STRIPE,
        providerPaymentId: `pay_${Date.now()}${i}`,
        providerOrderId: `order_${Date.now()}${i}`,
        amount: priceTier.price,
        currency: 'INR',
        status: PaymentStatus.SUCCEEDED,
        paymentMethod: i % 3 === 0 ? 'card' : i % 3 === 1 ? 'upi' : 'netbanking',
        paidAt: new Date(),
      });
      await paymentRepository.save(payment);
    }
  }

  console.log('✅ Seed completed successfully!');
  console.log('\n📧 Demo Accounts:');
  console.log('Owner: owner@club.com / password123');
  console.log('Admin: admin@club.com / password123');
  console.log('Users: user1@example.com to user10@example.com / password123');
  console.log('\n🎉 You can now login and explore the demo!');

  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});
