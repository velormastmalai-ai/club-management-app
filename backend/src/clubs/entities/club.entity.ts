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
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @Column({ type: 'jsonb', nullable: true })
  brandAssets: {
    logo: string;
    favicon: string;
    heroImage: string;
    banners: string[];
  };

  @Column({ type: 'jsonb', nullable: true })
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    customCss: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  settings: {
    timezone: string;
    currency: string;
    language: string;
    bookingSettings: {
      requireApproval: boolean;
      allowCancellation: boolean;
      cancellationDeadlineHours: number;
      maxBookingsPerUser: number;
    };
    paymentSettings: {
      provider: 'razorpay' | 'stripe';
      acceptedMethods: string[];
      refundPolicy: string;
    };
    notificationSettings: {
      enableEmail: boolean;
      enablePush: boolean;
      enableSms: boolean;
      reminderHours: number[];
    };
  };

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'text', nullable: true })
  maintenanceMessage: string;

  @Column({ type: 'timestamp', nullable: true })
  maintenanceUntil: Date;

  @Column({ type: 'jsonb', nullable: true })
  customContent: {
    homepage: {
      title: string;
      subtitle: string;
      featuredEvents: string[];
      sections: Array<{
        type: string;
        title: string;
        content: string;
        order: number;
      }>;
    };
    footer: {
      text: string;
      links: Array<{
        label: string;
        url: string;
      }>;
    };
  };

  @OneToMany(() => Event, (event) => event.club)
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
