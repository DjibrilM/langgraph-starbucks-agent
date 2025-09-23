import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  drink: string;

  @Prop({ default: null })
  size: string;

  @Prop({ default: null })
  milk: string;

  @Prop({ default: null })
  syrup: string;

  @Prop({ default: null })
  sweeter: string;

  @Prop({ default: null })
  toppings: string;

  @Prop({ default: 1 })
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
