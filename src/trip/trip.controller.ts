import { Controller, Get, Post, Query, Body, HttpCode, Delete, Param } from '@nestjs/common';
import { TripsService } from './trip.service';
import { TripInterface } from './trip.interfaces';
import { CreateTripDto, GetTripsQueryDto } from './trip.dto';

@Controller('/trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  getTrips(@Query() queryParams: GetTripsQueryDto): Promise<TripInterface[]> {
    return this.tripsService.getTrips(queryParams);
  }

  @Post('save')
  @HttpCode(201)
  createTrip(@Body() tripData: CreateTripDto): Promise<void> {
    return this.tripsService.saveTrip(tripData);
  }

  @Get('list')
  listTrips(): Promise<TripInterface[]> {
    return this.tripsService.listTrips();
  }
  @Delete('delete/:id')
  @HttpCode(204)
  deleteTrip(@Param('id') id: string): Promise<void> {
    return this.tripsService.deleteTrip(id);
  }
}
