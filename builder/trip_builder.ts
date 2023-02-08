import dayjs from "dayjs";
import { Trip, TripManual } from "./trip";

abstract class TripBuilder {
  abstract reset: () => void;
  abstract setDates: (departureDate: Date, returnDate: Date) => void;
  abstract setTransportation: (transportation: string) => void;
  abstract setAccommodation: (accommodation: string) => void;
  abstract setRestaurant: (restaurant: string) => void;
  abstract getResult: () => object;
}

class ConcreteTripBuilder implements TripBuilder {
  private trip: Trip;
  constructor() {
    this.reset();
  }
  reset() {
    this.trip = new Trip();
    return this;
  }
  setDates(departureDate: Date, returnDate: Date) {
    this.trip.departureDate = departureDate;
    this.trip.returnDate = returnDate;
    this.trip.duration = dayjs(returnDate).diff(departureDate, "day");
    return this;
  }
  setTransportation(transportation: string) {
    this.trip.transportation = transportation;
    return this;
  }
  setAccommodation(accommodation: string) {
    this.trip.accommodation = accommodation;
    return this;
  }
  setRestaurant(restaurant: string) {
    this.trip.restaurant = restaurant;
    return this;
  }
  getResult() {
    return this.trip;
  }
}

class ConcreteTripManualBuilder implements TripBuilder {
  private manual: TripManual;
  constructor() {
    this.reset();
  }
  reset() {
    this.manual = new TripManual();
    return this;
  }
  setDates(departureDate: Date, returnDate: Date) {
    this.manual.departureDate = departureDate;
    this.manual.returnDate = returnDate;
    return this;
  }
  setTransportation(transportation: string) {
    this.manual.transportation = transportation;
    return this;
  }
  setAccommodation(accommodation: string) {
    this.manual.accommodation = accommodation;
    return this;
  }
  setRestaurant(restaurant: string) {
    this.manual.restaurant = restaurant;
    return this;
  }
  setContactNumber(number: string) {
    this.manual.contactNumber = number;
    return this;
  }
  getResult() {
    return this.manual;
  }
}

export { ConcreteTripBuilder, ConcreteTripManualBuilder };
