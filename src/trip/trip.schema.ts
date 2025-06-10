
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TripDocument = HydratedDocument<Trip>;

@Schema()
export class Trip {
  @Prop({ required: true })
  _id: string;
  @Prop({ required: true })
  origin: string;
  @Prop({ required: true })
  destination: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  cost: number;
  @Prop({ required: true })
  duration: number; // in minutes
  @Prop({ required: true })
  display_name: string; // number of stops
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
