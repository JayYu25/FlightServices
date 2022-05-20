import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Passenger from "../../models/passenger";
import APIService from "../../services/apiService";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function FlightListViewAll() {
    const [flight, setFlight] = useState<any | null>(null);
    const flightId = useParams().id as unknown as number; // parses out the id from path.

    useEffect(() => {
        APIService.getFlight(flightId)
            .then((response) => {
                setFlight(response.data);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, [])
    


    if (flight != null) {
        return (
            
            <div className ="App container">
                <div className="jumbotron">
                    <h2> Flight Details </h2>
                </div>
                <div>
                    <td>
                        <LinkContainer to={"/flightEdit/" + flight.Id}>
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
                        <td>{flight.Id}</td>
                        <td>{flight.FlightNumber}</td>
                        <td>{flight.DepartAirport}</td>
                        <td>
                            {new Intl.DateTimeFormat("en-US", {
                                month: "long",
                                day: "2-digit"
                            }).format(Date.parse(flight.DepartDate))}
                        </td>
                        <td>
                            {new Intl.DateTimeFormat("default", {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true

                            }).format(Date.parse(flight.DepartDate))}
                        </td>
                        <td>{flight.ArrivalAirport}</td>
                        <td>
                            {new Intl.DateTimeFormat("default", {
                                month: "long",
                                day: "2-digit"
                            }).format(Date.parse(flight.ArrivalDate))}
                        </td>
                        <td>
                            {new Intl.DateTimeFormat("default", {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true

                            }).format(Date.parse(flight.ArrivalDate))}
                        </td>
                        <td>{flight.SeatsOccupied}</td>
                        <td>{flight.Capacity}</td>
                </table>
                <div className="jumbotron">
                    <h2>Passengers</h2>
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
                    <tbody>
                        {flight.Passengers.map((passenger: Passenger) => (
                            <React.Fragment key ={passenger.Id}>
                                <tr id = {"passenger-" + passenger.FirstName}>
                                    <td>{passenger.Id}</td>
                                    <td>{passenger.FirstName}</td>
                                    <td>{passenger.LastName}</td>
                                    <td>{passenger.Age}</td>
                                    <td>{passenger.Job}</td>
                                    <td>{passenger.Email}</td>
                                    <td>{passenger.ConfirmationNumber}</td>
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
export default FlightListViewAll;