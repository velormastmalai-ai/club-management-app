import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
  ) {}

  async create(createClubDto: CreateClubDto, ownerId: string): Promise<Club> {
    const club = this.clubsRepository.create({
      ...createClubDto,
      ownerId,
      enabled: true,
      settings: {
        timezone: 'UTC',
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
    });

    return this.clubsRepository.save(club);
  }

  async findAll(): Promise<Club[]> {
    return this.clubsRepository.find();
  }

  async findOne(id: string): Promise<Club> {
    const club = await this.clubsRepository.findOne({ where: { id } });
    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
    return club;
  }

  async findByOwner(ownerId: string): Promise<Club> {
    const club = await this.clubsRepository.findOne({ where: { ownerId } });
    if (!club) {
      throw new NotFoundException(`Club for owner ${ownerId} not found`);
    }
    return club;
  }

  async update(id: string, updateClubDto: UpdateClubDto): Promise<Club> {
    await this.clubsRepository.update(id, updateClubDto);
    return this.findOne(id);
  }

  async toggleMaintenance(
    id: string,
    enabled: boolean,
    message?: string,
    until?: Date,
  ): Promise<Club> {
    await this.clubsRepository.update(id, {
      enabled,
      maintenanceMessage: message,
      maintenanceUntil: until,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.clubsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
  }
}
