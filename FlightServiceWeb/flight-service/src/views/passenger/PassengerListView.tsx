import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Passenger from "../../models/passenger";
import APIService from "../../services/apiService";

type PassengerListViewProps = {

}

type PassengerListState = {
    passengers: Passenger[];
}

export class PassengerListView extends React.Component<PassengerListViewProps, PassengerListState> {

    constructor(props: PassengerListViewProps) {
        super(props);
        this.state = {
          passengers: []
        }
    }
    
      componentDidMount() {
        APIService.getPassengers()
          .then((response) => {
            this.setState({
              passengers: response.data
            });
          })
          .catch((err: Error) => {
            console.log(err);
          });
      }

      deletePassenger(id:number) {
          APIService.deletePassenger(id)
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
                    <h2>Passenger List</h2>
                </div>
                <div>
                    <LinkContainer to={"/passengersAdd/"}>
                        <Nav.Link className="btn btn-primary">
                            Add Passenger
                        </Nav.Link>
                    </LinkContainer>
                </div>
                <table className="table table-striped table-bordered table-hover table-highlight">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {this.state.passengers.map( (passenger: Passenger) =>  (           
                            <React.Fragment key={passenger.Id} >
                            <tr id = {"passenger-" + passenger.FirstName}>
                                <td>{passenger.Id}</td>
                                <td>{passenger.FirstName}</td>
                                <td>{passenger.LastName}</td>
                                
                                <td>
                                    <LinkContainer to={"/passengerInfo/" + passenger.Id}>
                                        <Nav.Link className="btn btn-primary">
                                            Details
                                        </Nav.Link>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <LinkContainer to={"/passenger"}>
                                        <Nav.Link className="btn btn-primary" onClick={() => this.deletePassenger(passenger.Id)}>
                                            Delete
                                        </Nav.Link>
                                    </LinkContainer>
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

export default PassengerListView;