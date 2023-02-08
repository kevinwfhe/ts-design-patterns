class Trip {
  public departureDate: Date;
  public returnDate: Date;
  public duration: number;
  public transportation: string;
  public accommodation: string;
  public restaurant: string;
}

class TripManual {
  public departureDate: Date;
  public returnDate: Date;
  public transportation: string;
  public accommodation: string;
  public restaurant: string;
  public contactNumber: string;
}

export { Trip, TripManual };
