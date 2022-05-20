import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../../services/apiService";
import Passenger from "../../models/passenger";
import { useParams } from 'react-router-dom'

function PassengerBookFlight() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const passengerId = useParams().id as unknown as number; // parses out the id from path.

  const onSubmit = (data: any) => {

    APIService.addPassengerToFlight(data.fId, passengerId)
        .then((response) => {
            alert("Passenger added.")
          })
          .catch((err: Error) => {
            alert("Flight capacity reached!");
          });
  }

  return (
    <div className = "App container">        
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className = "jumbotron">
                <h4>Add flight for passenger</h4>
            </div>
            <div>
                <input {...register("fId", {required: true})} placeholder="Flight ID"/>
                
            </div>
            
            <input type="submit" />
        </form>
    </div>
  );

  
}

export default PassengerBookFlight;