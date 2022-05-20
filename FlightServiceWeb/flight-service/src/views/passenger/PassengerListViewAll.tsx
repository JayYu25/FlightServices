import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import APIService from "../../services/apiService";
import Flight from "../../models/flight";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function PassengerListViewAll() {
    const [passenger, setPassenger] = useState<any | null>(null);
    const passengerId = useParams().id as unknown as number; // parses out the id from path.

    useEffect(() => {
        APIService.getPassenger(passengerId)
            .then((response) => {
                setPassenger(response.data);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, [])
    


    if (passenger != null) {
        return (
            
            <div className ="App container">
                <div className="jumbotron">
                    <h2> Passenger Details </h2>
                </div>
                <div>
                    <td>
                        <LinkContainer to={"/passengersEdit/" + passenger.Id}>
                            <Nav.Link className="btn btn-primary">
                                Edit
                            </Nav.Link>
                        </LinkContainer>
                    </td>
                </div>
                <table className="table table-striped table-bordered table-hover table-highlight">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Occupation</th>
                            <th>Email</th>
                            <th>Confirmation Number</th>
                        </tr>
                    </thead>   
                    <td>{passenger.Id}</td>
                    <td>{passenger.FirstName}</td>
                    <td>{passenger.LastName}</td>
                    <td>{passenger.Age}</td>
                    <td>{passenger.Job}</td>
                    <td>{passenger.Email}</td>
                    <td>{passenger.ConfirmationNumber}</td>
                    
                </table>
        
                <div className="jumbotron">
                    <h2>Flights</h2>
                </div>
                <div>
                    <td>
                        <LinkContainer to={"/passengerBook/" + passenger.Id}>
                            <Nav.Link className="btn btn-primary">
                                Book Flight
                            </Nav.Link>
                        </LinkContainer>
                    </td>
                    <td>
                        <LinkContainer to={"/passengerUnbook/" + passenger.Id}>
                            <Nav.Link className="btn btn-primary">
                                Unbook Flight
                            </Nav.Link>
                        </LinkContainer>
                    </td>
                </div>

                <table className="table table-striped table-bordered table-hover table-highlight">
                    <thead>
                            <tr>
                                <th>Id</th>
                                <th>Flight Number</th>
                                <th>Depart Airport</th>
                                <th>Depart Date</th>
                                <th>Depart Time</th>
                                <th>Arrival Airport</th>
                                <th>Arrival Date</th>
                                <th>Arrival Time</th>
                                <th>Seats Occupied</th>
                                <th>Capacity</th>
                            </tr>
                    </thead>   
                    <tbody>
                        {passenger.Flights.map((flight: Flight) => (
                            <React.Fragment key ={flight.Id}>
                                <tr id = {"flight-" + flight.FlightNumber}>
                                    <td>{flight.Id}</td>
                                    <td>{flight.FlightNumber}</td>
                                    <td>{flight.DepartAirport}</td>
                                    <td>
                                        {new Intl.DateTimeFormat("en-GB", {
                                            month: "long",
                                            day: "2-digit"
                                        }).format(Date.parse(flight.DepartDate))}
                                    </td>
                                    <td>
                                        {new Intl.DateTimeFormat("en-GB", {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true

                                        }).format(Date.parse(flight.DepartDate))}
                                    </td>
                                    <td>{flight.ArrivalAirport}</td>
                                    <td>
                                        {new Intl.DateTimeFormat("en-GB", {
                                            month: "long",
                                            day: "2-digit"
                                        }).format(Date.parse(flight.ArrivalDate))}
                                    </td>
                                    <td>
                                        {new Intl.DateTimeFormat("en-GB", {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true

                                        }).format(Date.parse(flight.ArrivalDate))}
                                    </td>
                                    <td>{flight.SeatsOccupied}</td>
                                    <td>{flight.Capacity}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div>Loading...</div>
    )
}
export default PassengerListViewAll;