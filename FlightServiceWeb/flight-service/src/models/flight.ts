import Passenger from "./passenger";

interface Flight {
    Id: number;
    FlightNumber: string;
    DepartAirport: string;
    ArrivalAirport: string;
    DepartDate: string;
    ArrivalDate: string;
    Capacity: number;
    Passengers: Passenger[];
    SeatsOccupied: number;
}
// export so other ts extensions can use.
export default Flight;