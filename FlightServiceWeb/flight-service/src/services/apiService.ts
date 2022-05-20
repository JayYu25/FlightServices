import axios from "axios";
import Passenger from "../models/passenger";
import Flight from "../models/flight";

const http = axios.create({
    baseURL: "https://localhost:7028",
    headers: {
        'Content-Type': 'application/json'
    }
});

const getPassengers = () => {
    return http.get<Array<Passenger>>("/api/Passengers");
};

const getPassenger = (id: number) => {
    return http.get<Passenger>(`api/Passengers/${id}`);
};

const createPassenger = (passenger: Passenger) => {
    return http.post<Passenger>("api/Passengers", passenger);
};

const editPassenger = (passenger : Passenger) => {
    return http.put<Passenger>(`api/Passengers/${passenger.Id}`, passenger);
};

const deletePassenger = (id: number) => {
    return http.delete<Passenger>(`api/Passengers/${id}`);
};

const getFlights = () => {
    return http.get<Array<Flight>>("/api/Flights");
};

const getFlight = (id: number) => {
    return http.get<Flight>(`api/Flights/${id}`);
};

const createFlight = (flight: Flight) => {
    return http.post<Flight>("api/Flights", flight);
};

const editFlight = (flight : Flight) => {
    return http.put<Flight>(`api/flights/${flight.Id}`, flight);
};

const deleteFlight = (id: number) => {
    return http.delete<Flight>(`api/Flights/${id}`);
};

const addPassengerToFlight = (flightId: number, passengerId: number) => {
    return http.post<Flight>(`api/Flights/${flightId}/Passengers/${passengerId}`);
}

const deletePassengerFromFlight = (flightId: number, passengerId: number) => {
    return http.delete<Flight>(`api/Flights/${flightId}/Passengers/${passengerId}`);
}
 
const APIService = {
    getPassengers,
    getPassenger,
    createPassenger,
    editPassenger,
    deletePassenger,
    getFlights,
    getFlight,
    createFlight,
    editFlight,
    deleteFlight,
    addPassengerToFlight,
    deletePassengerFromFlight
};

export default APIService;