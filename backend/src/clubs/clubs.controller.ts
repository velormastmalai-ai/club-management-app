import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('clubs')
@Controller('clubs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Create club (Owner only)' })
  create(@Body() createClubDto: CreateClubDto, @Request() req) {
    return this.clubsService.create(createClubDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clubs' })
  findAll() {
    return this.clubsService.findAll();
  }

  @Get('my-club')
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get my club' })
  findMyClub(@Request() req) {
    return this.clubsService.findByOwner(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get club by ID' })
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Update club (Owner only)' })
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubsService.update(id, updateClubDto);
  }

  @Post(':id/maintenance')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Toggle maintenance mode (Owner only)' })
  toggleMaintenance(
    @Param('id') id: string,
    @Body() body: { enabled: boolean; message?: string; until?: Date },
  ) {
    return this.clubsService.toggleMaintenance(
      id,
      body.enabled,
      body.message,
      body.until,
    );
  }

  @Delete(':id')
  @Roles(UserRole.OWNER)
  @ApiOperation({ summary: 'Delete club (Owner only)' })
  remove(@Param('id') id: string) {
    return this.clubsService.remove(id);
  }
}
