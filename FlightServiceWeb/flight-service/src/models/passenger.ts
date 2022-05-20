import Flight from "./flight"

interface Passenger {
    Id: number;
    FirstName: string;
    LastName: string;
    Age: number;
    Job: string;
    Email: string;
    ConfirmationNumber: number;
    Flights: Flight[];
}
// export so other ts extensions can use.
export default Passenger;