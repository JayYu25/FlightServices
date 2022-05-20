import React from "react";
import { Controller, useForm } from "react-hook-form";
import APIService from "../../services/apiService";
import Flight from "../../models/flight";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PostFlight() {
  const { register, control, watch, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {

    var flight: Flight = {
        Id: 0,
        FlightNumber: data.flightNum,
        DepartAirport: data.departAirport,
        ArrivalAirport: data.arrivalAirport,
        DepartDate: data.departDate,
        ArrivalDate: data.arrivalDate,
        Capacity: data.maxCapacity,
        Passengers: [],
        SeatsOccupied: 0
    }
     
    APIService.createFlight(flight)
        .then((response) => {
            alert("Flight " + flight.FlightNumber + " has been added!")
          })
          .catch((err: Error) => {
            console.log(err);
          });
  }

  console.log(watch("departDate"));
  console.log(watch("departTime"));

  return (
    <div className = "App container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register("flightNum", {required: true})} placeholder="Flight Number"/>
                
            </div>
            <div>
                <input {...register("departAirport", {required: true})} placeholder="Depart Airport"/>
                
            </div>
            <div>
                <Controller
                    control={control}
                    name="departDate"
                    render={({ field }) => (
                        <DatePicker
                            placeholderText="Select depart date"
                            onChange={(date) => field.onChange(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="Pp"
                            selected={field.value}
                        />
                    )}
                />
            </div>
                
            <div>
                <input {...register("arrivalAirport")} placeholder="Arrival Airport"/>
            </div>
            <div>
                <Controller
                    control={control}
                    name="arrivalDate"
                    render={({ field }) => (
                        <DatePicker
                            placeholderText="Select arrival date"
                            onChange={(date) => field.onChange(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="Pp"
                            selected={field.value}
                        />
                    )}
                />
            </div>
            <div>
                <input {...register("maxCapacity")} placeholder="Capacity"/>
            </div>
            
        
            <input type="submit" />
        </form>
    </div>
  );
}

export default PostFlight;