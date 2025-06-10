import { Module } from '@nestjs/common';
import { TripsController } from './trip.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsService } from './trip.service';
import { HttpModule } from '@nestjs/axios';
import { Trip, TripSchema } from './trip.schema';
@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService, HttpModule],
})
export class TripModule { }
