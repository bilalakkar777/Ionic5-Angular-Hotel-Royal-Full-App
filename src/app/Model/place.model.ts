import { PlaceLocation } from './location.model';

export class Place {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
  //  public short_description: string,
    public description: string,
    public price: number,
    public avg: number,
    public email: string,
    public Website: string,
    public mobile: number,
    public star: number,
    public availableFrom: Date,
    public availableTo: Date,
    public location: PlaceLocation,
    public imageUrl: string,
  ) {}
}
