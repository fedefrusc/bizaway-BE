import { Module } from '@nestjs/common';
import { TripModule } from './trip/trip.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TripModule,
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/bizaway', {}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController]
})
export class AppModule {}
