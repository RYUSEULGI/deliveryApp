export interface Coordinate {
  latitude: number;
  longitude: number;
}
export interface IOrder {
  orderId: string;
  price: number;
  start: Coordinate;
  end: Coordinate;
}
