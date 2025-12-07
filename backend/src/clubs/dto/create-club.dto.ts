import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({ example: 'Elite Club' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Premium club for exclusive events' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  brandAssets?: {
    logo: string;
    favicon: string;
    heroImage: string;
    banners: string[];
  };

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    customCss: string;
  };
}
