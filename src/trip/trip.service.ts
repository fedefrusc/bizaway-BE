import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { GetTripsQueryParams, TripInterface, TripsHttpResponse } from './trip.interfaces';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TripsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectConnection() private connection: Connection,
  ) {}
  /**
   * Fetches trips from an external API based on origin and destination.
   * @param params - The query parameters containing origin and destination.
   * @returns A promise that resolves to the trips data.
   */
  public async getTrips(
    queryparams: GetTripsQueryParams,
  ): Promise<TripsHttpResponse> {

    const apiUrl = `https://${process.env.EXTERNAL_API_DOMAIN}/default/trips?origin=${queryparams.origin}&destination=${queryparams.destination}`;
    const res = await this.httpService.axiosRef.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.EXTERNAL_API_KEY,
      },
    });
    const normData = res.data.map((trip: any) => ({
      _id: trip.id,
      origin: trip.origin,
      destination: trip.destination,
      type: trip.type,
      cost: trip.cost,
      duration: trip.duration,
      display_name: `${trip.origin} to ${trip.destination} (${trip.type})`,
    })) as TripInterface[];
    const data = normData;
    if (queryparams?.sort_by === 'fastest') {
      // Sort by fastest
      return data.sort((a, b) => a.duration - b.duration);
    } else if (queryparams?.sort_by === 'cheapest') {
      // Sort by cheapest
      return data.sort((a, b) => a.cost - b.cost);
    }
    return data;
  }
  /**
   * Saves a trip to the database.
   * @param trip - The trip data to save.
   * @returns A promise that resolves when the trip is saved.
   */
  public async saveTrip(trip: TripInterface): Promise<void> {
    const TripModel = this.connection.model('Trip');
    const tripData = new TripModel({
      _id: trip._id,
      origin: trip.origin,
      destination: trip.destination,
      type: trip.type,
      cost: trip.cost,
      duration: trip.duration,
      display_name: trip.display_name,
    });
    try {
      await tripData.save();
    } catch (error) {
      throw new HttpException(error.errorResponse.errmsg, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * Lists all trips from the database.
   * @returns A promise that resolves to an array of trips.
   */
  public async listTrips(): Promise<TripInterface[]> {
    const TripModel = this.connection.model('Trip');
    const trips = await TripModel.find().exec();
    return trips.map((trip) => ({
      _id: trip._id,
      origin: trip.origin,
      destination: trip.destination,
      type: trip.type,
      cost: trip.cost,
      duration: trip.duration,
      display_name: trip.display_name,
    }));
  }

  /**
   * Deletes a trip by its ID.
   * @param id - The ID of the trip to delete.
   * @returns A promise that resolves when the trip is deleted.
   */
  public async deleteTrip(id: string): Promise<void> {
    const TripModel = this.connection.model('Trip');

    try {
      const res = await TripModel.deleteOne({ _id: id.toString() }).exec();
      if (res.deletedCount === 0) {
        throw new HttpException('Trip not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
