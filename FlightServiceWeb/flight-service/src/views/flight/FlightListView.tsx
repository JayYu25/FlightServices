import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Flight from "../../models/flight";
import APIService from "../../services/apiService";

type FlightViewProps = {
    
}

type FlightViewState = {
    flights: Flight[];
}

class FlightListView extends React.Component<FlightViewProps, FlightViewState> {

    constructor(props: FlightViewProps) {
        super(props);
        this.state = {
          flights: []
        }
      }
    
      componentDidMount() {
        APIService.getFlights()
          .then((response) => {
            this.setState({
              flights: response.data
            });
          })
          .catch((err: Error) => {
            console.log(err);
          });
      }

      deleteFlight(id:number) {
        APIService.deleteFlight(id)
          .then((response) => {
              console.log(response.data)
              //alert(id);
          })
          .catch((err: Error) => {
              console.log(err);
          });
          
          window.location.reload();
    }

    render(): React.ReactNode {
        return (
            <div className="App container">
                <div className="jumbotron">
                    <h2>Flight List</h2>
                </div>
                <div>
                    <LinkContainer to={"/flightsAdd/"}>
                        <Nav.Link className="btn btn-primary">
                            Add Flight
                        </Nav.Link>
                    </LinkContainer>
                </div>
                <table className="table table-striped table-bordered table-hover table-highlight">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Flight Number</th>
                            <th>Depart Airport</th>
                            <th>Depart Date</th>
                            <th>Arrival Airport</th>
                            <th>Arrival Date</th>
                            <th>Seats Occupied</th>
                            <th>Max Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.flights.map( (flight: Flight) =>  (           
                            <React.Fragment key={flight.Id}>
                            <tr id={"flight-" + flight.Id}>
                                <td>{flight.Id}</td>
                                <td>{flight.FlightNumber}</td>
                                <td>{flight.DepartAirport}</td>
                                <td>
                                    {new Intl.DateTimeFormat("en-GB", {
                                        month: "long",
                                        day: "2-digit"
                                    }).format(Date.parse(flight.DepartDate))}
                                </td>
                                <td>{flight.ArrivalAirport}</td>
                                <td>
                                    {new Intl.DateTimeFormat("en-GB", {
                                        month: "long",
                                        day: "2-digit"

                                    }).format(Date.parse(flight.ArrivalDate))}
                                </td>
            
                                <td>{flight.SeatsOccupied}</td>
                                <td>{flight.Capacity}</td>

                                <td>
                                    <LinkContainer to={"/flightsInfo/" + flight.Id}>
                                        <Nav.Link className="btn btn-primary">
                                            Details
                                        </Nav.Link>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => this.deleteFlight(flight.Id)}>Delete</button>                  
                                </td>
                            </tr>
                            </React.Fragment>
                        ))};
                    </tbody>
                </table>
            </div>
        );
    }
}

export default FlightListView;