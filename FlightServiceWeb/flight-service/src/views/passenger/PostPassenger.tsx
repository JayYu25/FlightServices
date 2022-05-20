import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../../services/apiService";
import Passenger from "../../models/passenger";
import { useParams } from 'react-router-dom'

function PostPassenger() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {

    var passenger : Passenger = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Age: data.age,
        Job: data.job,
        Email: data.email,
        Id: 0,
        ConfirmationNumber: 0,
        Flights: []
    }
     
    APIService.createPassenger(passenger)
        .then((response) => {
            alert("Passenger " + passenger.FirstName + " has been added!")
          })
          .catch((err: Error) => {
            console.log(err);
          });
  }


  return (
    <div className = "App container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <input {...register("firstName", {required: true})} placeholder="First Name"/>
                {errors.firstName?.type === 'required' && "First name is required"}
            </div>
            <div className="mb-3">
                <input {...register("lastName", {required: true})} placeholder="Last Name"/>
                {errors.lastName?.type === 'required' && "Last name is required"}
            </div>
            <div className="mb-3">
                <input {...register("age", {required: true})} placeholder="Age"/>
                {errors.age?.type === 'required' && "Age required"}
            </div>
            <div>
                <input className="mb-3" {...register("job")} placeholder="Occupation"/>
            </div>
            <div>
                <input className="mb-3" {...register("email", {required: true})} placeholder="Email Address"/>
                {errors.email?.type === 'required' && "Email address is required"}
            </div>
        
            <input type="submit" />
        </form>
    </div>
  );
}

export default PostPassenger;