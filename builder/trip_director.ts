import { ConcreteTripBuilder, ConcreteTripManualBuilder } from "./trip_builder";

class TripDirector {
  static buildLongWeekendTripWithManual(
    tripDetails: { [k: string]: any },
    tripBuilder: ConcreteTripBuilder,
    manualBuilder: ConcreteTripManualBuilder
  ) {
    const {
      departureDate,
      returnDate,
      accommodation,
      restaurant,
      transportation,
      contactNumber,
    } = tripDetails;
    const trip = tripBuilder
      .setDates(departureDate, returnDate)
      .setAccommodation(accommodation)
      .setRestaurant(restaurant)
      .setTransportation(transportation)
      .getResult();

    const manual = manualBuilder
      .setDates(departureDate, returnDate)
      .setAccommodation(accommodation)
      .setRestaurant(restaurant)
      .setTransportation(transportation)
      .setContactNumber(contactNumber)
      .getResult();

    return {
      trip,
      manual,
    };
  }
}

export { TripDirector };
