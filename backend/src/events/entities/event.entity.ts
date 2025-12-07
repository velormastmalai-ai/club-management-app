import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Club } from '../../clubs/entities/club.entity';
import { Booking } from '../../bookings/entities/booking.entity';

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum EventType {
  SINGLE = 'single',
  RECURRING = 'recurring',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Club, (club) => club.events)
  @JoinColumn({ name: 'club_id' })
  club: Club;

  @Column({ name: 'club_id' })
  clubId: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.SINGLE,
  })
  type: EventType;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'jsonb', nullable: true })
  recurringRules: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    daysOfWeek: number[];
    endDate: Date;
    occurrences: number;
  };

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  bookedSeats: number;

  @Column({ type: 'jsonb' })
  priceTiers: Array<{
    id: string;
    name: string;
    price: number;
    currency: string;
    capacity: number;
    description: string;
  }>;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ nullable: true })
  venue: string;

  @Column({ type: 'jsonb', nullable: true })
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;

  @Column({ default: true })
  bookingOpen: boolean;

  @Column({ default: false })
  enableWaitlist: boolean;

  @Column({ default: false })
  enableSeatSelection: boolean;

  @Column({ type: 'jsonb', nullable: true })
  seatMap: any;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
