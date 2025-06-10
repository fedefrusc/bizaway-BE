import { Get, Controller, Render, Query, Post, Body, Delete, Param } from '@nestjs/common';
import { TripsService } from './trip/trip.service';
import { TripInterface } from './trip/trip.interfaces';

const iata = [
  'ATL', 'PEK', 'LAX', 'DXB', 'HND', 'ORD', 'LHR', 'PVG', 'CDG', 'DFW',
  'AMS', 'FRA', 'IST', 'CAN', 'JFK', 'SIN', 'DEN', 'ICN', 'BKK', 'SFO',
  'LAS', 'CLT', 'MIA', 'KUL', 'SEA', 'MUC', 'EWR', 'MAD', 'HKG', 'MCO',
  'PHX', 'IAH', 'SYD', 'MEL', 'GRU', 'YYZ', 'LGW', 'BCN', 'MAN', 'BOM',
  'DEL', 'ZRH', 'SVO', 'DME', 'JNB', 'ARN', 'OSL', 'CPH', 'HEL', 'VIE',
];

@Controller()
export class AppController {
  constructor(private readonly tripsService: TripsService) { }
  @Get()
  @Render('index')
  root() {
    return { origins: iata, destinations: iata };
  }
  @Get('search')
  @Render('search')
  async search(@Query() query) {
    const results = await this.tripsService.getTrips(query) as (TripInterface & { is_saved?: boolean })[];
    const savedTrips = await this.tripsService.listTrips();
    results.forEach(result => {
      result.is_saved = savedTrips.some(trip => trip._id === result._id);
    });
    return { results, query };
  }
  @Get('saved-trips')
  @Render('saved-trips')
  async savedTrips() {
    const trips = await this.tripsService.listTrips();
    return { trips };
  } 
  @Post('save-trip')
  async saveTrip(@Body() body) {
    const tripData = {
      _id: body._id, 
      origin: body.origin,
      destination: body.destination,
      type: body.type,
      cost: parseFloat(body.cost),
      duration: parseInt(body.duration, 10),
      display_name: `${body.origin} to ${body.destination}`,
    };
    await this.tripsService.saveTrip(tripData);
  } 
  @Delete('delete-trip/:id') 
  @Render('/saved-trips')
  async deleteTrip(@Param('id') id: string) {
    await this.tripsService.deleteTrip(id);
  }
}