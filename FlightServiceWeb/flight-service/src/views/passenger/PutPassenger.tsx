import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../../services/apiService";
import Passenger from "../../models/passenger";
import { useParams } from 'react-router-dom'

function PutPassenger() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const passengerId = useParams().id as unknown as number // parses out the id from path.
  const [passengerInit, setPassengerInit] = useState<any | null>(null);
  //const [passengerInit, setPassengerInit] = useState(null);
  
  
  useEffect(() => {
        
    APIService.getPassenger(passengerId)
    .then((response) => {
        setPassengerInit(response.data)
        console.log(response.data)
      })
      .catch((err: Error) => {
        console.log(err);
      });
}, [])

  const onSubmit = (data: any) => {

    var passenger : Passenger = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Age: data.age,
        Job: data.job,
        Email: data.email,
        Id: passengerId,
        ConfirmationNumber: passengerInit.ConfirmationNumber,
        Flights: []
    }
    
    APIService.editPassenger(passenger)
        .then((response) => {
            alert("Passenger " + passenger.FirstName + " has been updated!")
          })
          .catch((err: Error) => {
            console.log(err);
          });
    
    
  }

  if (passengerInit != null) {
    return (
      <div className = "App container">
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  
                  <input {...register("firstName", {required: true})} defaultValue={passengerInit.FirstName}/>
                  
              </div>
              <div>
                  
                  <input {...register("lastName", {required: true})} defaultValue={passengerInit.LastName}/>

              </div>
              <div>
                  
                  <input {...register("age", {required: true})} defaultValue={passengerInit.Age}/>
              </div>
              <div>
                  
                  <input {...register("job")} defaultValue={passengerInit.Job}/>
              </div>
              <div>
                
                  <input {...register("email", {required: true})} defaultValue={passengerInit.Email}/>
                  
              </div>
          
              <input type="submit" />
          </form>
      </div>
    );
  }
  return (
    <div>Loading failed..</div>
  )
}

export default PutPassenger;