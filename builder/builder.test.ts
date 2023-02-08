import { describe, test, expect } from "@jest/globals";
import { TripDirector } from "./trip_director";
import { ConcreteTripBuilder, ConcreteTripManualBuilder } from "./trip_builder";

const MOCK_LONG_WEEKEND_TRIP = {
  departureDate: new Date("2023-02-01"),
  returnDate: new Date("2023-02-04"),
  accommodation: "Hilton",
  restaurant: "Kesley's",
  transportation: "Airline",
  contactNumber: "098-765-4321",
};

describe("Builder", () => {
  test("Use builder to create a trip", () => {
    const tripBuilder = new ConcreteTripBuilder();
    const trip = tripBuilder
      .setDates(new Date("2023-01-01"), new Date("2023-01-08"))
      .setTransportation("Car")
      .setAccommodation("Hotel")
      .setRestaurant("HolyDeli")
      .getResult();
    expect(trip.accommodation).toBe("Hotel");
    expect(trip.transportation).toBe("Car");
    expect(trip.restaurant).toBe("HolyDeli");
    expect(trip.duration).toBe(7);
  });

  test("Use builder to create a trip manual", () => {
    const manualBuilder = new ConcreteTripManualBuilder();
    const manual = manualBuilder
      .setDates(new Date("2023-01-01"), new Date("2023-01-08"))
      .setTransportation("Bus")
      .setAccommodation("Campsite")
      .setRestaurant("KFC")
      .setContactNumber("123-456-7890")
      .getResult();
    expect(manual.departureDate).toEqual(new Date("2023-01-01"));
    expect(manual.returnDate).toEqual(new Date("2023-01-08"));
    expect(manual.accommodation).toBe("Campsite");
    expect(manual.transportation).toBe("Bus");
    expect(manual.restaurant).toBe("KFC");
    expect(manual.contactNumber).toBe("123-456-7890");
  });

  test("Use Director to create a popular trip together with manual", () => {
    const { trip, manual } = TripDirector.buildLongWeekendTripWithManual(
      MOCK_LONG_WEEKEND_TRIP,
      new ConcreteTripBuilder(),
      new ConcreteTripManualBuilder()
    );
    expect(trip.departureDate).toEqual(MOCK_LONG_WEEKEND_TRIP.departureDate);
    expect(trip.returnDate).toEqual(MOCK_LONG_WEEKEND_TRIP.returnDate);
    expect(trip.duration).toBe(3);
    expect(trip.transportation).toBe(MOCK_LONG_WEEKEND_TRIP.transportation);
    expect(trip.accommodation).toBe(MOCK_LONG_WEEKEND_TRIP.accommodation);
    expect(trip.restaurant).toBe(MOCK_LONG_WEEKEND_TRIP.restaurant);

    expect(manual.departureDate).toEqual(MOCK_LONG_WEEKEND_TRIP.departureDate);
    expect(manual.returnDate).toEqual(MOCK_LONG_WEEKEND_TRIP.returnDate);
    expect(manual.transportation).toBe(MOCK_LONG_WEEKEND_TRIP.transportation);
    expect(manual.accommodation).toBe(MOCK_LONG_WEEKEND_TRIP.accommodation);
    expect(manual.restaurant).toBe(MOCK_LONG_WEEKEND_TRIP.restaurant);
    expect(manual.contactNumber).toBe(MOCK_LONG_WEEKEND_TRIP.contactNumber);
  });
});
