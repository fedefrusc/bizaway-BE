/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

const iata = [
  'ATL',
  'PEK',
  'LAX',
  'DXB',
  'HND',
  'ORD',
  'LHR',
  'PVG',
  'CDG',
  'DFW',
  'AMS',
  'FRA',
  'IST',
  'CAN',
  'JFK',
  'SIN',
  'DEN',
  'ICN',
  'BKK',
  'SFO',
  'LAS',
  'CLT',
  'MIA',
  'KUL',
  'SEA',
  'MUC',
  'EWR',
  'MAD',
  'HKG',
  'MCO',
  'PHX',
  'IAH',
  'SYD',
  'MEL',
  'GRU',
  'YYZ',
  'LGW',
  'BCN',
  'MAN',
  'BOM',
  'DEL',
  'ZRH',
  'SVO',
  'DME',
  'JNB',
  'ARN',
  'OSL',
  'CPH',
  'HEL',
  'VIE',
];

export class GetTripsQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(iata, {
    message: `Origin must be one of the following IATA codes: ${iata.join(', ')}`,
  })
  origin: string;
  @IsString()
  @IsNotEmpty()
  @IsIn(iata, {
    message: `Destination must be one of the following IATA codes: ${iata.join(', ')}`,
  })
  destination: string;
  @IsString()
  @IsOptional()
  @IsIn(['fastest', 'cheapest'])
  sort_by?: 'fastest' | 'cheapest';
}

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
  @IsString()
  @IsNotEmpty()
  origin: string;
  @IsString()
  @IsNotEmpty()
  destination: string;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  cost: number;
  @IsNotEmpty()
  duration: number; // in minutes
  @IsString()
  @IsNotEmpty()
  display_name: string; // number of stops
}

export class GetListTripsDto {
  @IsString()
  @IsOptional()
  origin?: string;
  @IsString()
  @IsOptional()
  destination?: string;
  @IsString()
  @IsOptional()
  type?: string;
  @IsNotEmpty()
  @IsOptional()
  cost?: number;
  @IsNotEmpty()
  @IsOptional()
  duration?: number; // in minutes
}
