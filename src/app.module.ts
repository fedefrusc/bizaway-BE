import { Module } from '@nestjs/common';
import { TripModule } from './trip/trip.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TripsService } from './trip/trip.service';

@Module({
  imports: [
    TripModule,
    MongooseModule.forRoot('mongodb://localhost/bizaway'),
  ],
  controllers: [AppController],
  providers: [TripsService]
})
export class AppModule {}
