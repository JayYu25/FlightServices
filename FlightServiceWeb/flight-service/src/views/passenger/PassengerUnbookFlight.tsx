import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../../services/apiService";
import Passenger from "../../models/passenger";
import { useParams } from 'react-router-dom'

function PassengerUnbookFlight() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const passengerId = useParams().id as unknown as number // parses out the id from path.
  const [passengerInit, setPassengerInit] = useState<any | null>(null);
  
  useEffect(() => {
      
      APIService.getPassenger(passengerId)
      .then((response) => {
          setPassengerInit(response.data)
        })
        .catch((err: Error) => {
          console.log(err);
        });
  }, [])

  const onSubmit = (data: any) => {

    APIService.deletePassengerFromFlight(data.fId, passengerId)
        .then((response) => {
            alert("Passenger removed.")
          })
          .catch((err: Error) => {
            console.log(err)
          });
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className = "App container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className = "jumbotron">
                <h4>Remove flight for passenger</h4>
            </div>
            <div>
                <input {...register("fId", {required: true})} placeholder="Flight ID"/>
                
            </div>
            

            <input type="submit" />
        </form>
    </div>
  );
}

export default PassengerUnbookFlight;