import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import APIService from "../../services/apiService";
import { useParams } from 'react-router-dom'
import Flight from "../../models/flight";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PutFlight() {
  const { register, watch, control, handleSubmit, formState: { errors } } = useForm();
  const flightId = useParams().id as unknown as number // parses out the id from path.
  const [flightInit, setFlightInit] = useState<any | null>(null);

  useEffect(() => {
        
    APIService.getFlight(flightId)
    .then((response) => {
        setFlightInit(response.data)
        console.log(response.data)
      })
      .catch((err: Error) => {
        console.log(err);
      });
}, [])

  const onSubmit = (data: any) => {

    var flight : Flight = {
        Id: flightId,
        FlightNumber: data.flightNum,
        DepartAirport: data.departAirport,
        ArrivalAirport: data.arrivalAirport,
        DepartDate: data.departDate,
        ArrivalDate: data.arrivalDate,
        Capacity: data.maxCapacity,
        Passengers: [],
        SeatsOccupied: 0
    }
    
    
    APIService.editFlight(flight)
        .then((response) => {
            alert("Flight " + flight.FlightNumber + " has been updated!")
          })
          .catch((err: Error) => {
            console.log(err);
          });
  }
  

  if (flightInit != null) {
    return (
          <div className = "App container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input {...register("flightNum")} defaultValue={flightInit.FlightNumber}/>       
                </div>
                <div>
                  <input {...register("departAirport", {required: true})} defaultValue={flightInit.DepartAirport}/>
                </div>
                <div>
                  <Controller
                    control={control}
                    name="departDate"
                    render={({ field = flightInit.DepartAirport }) => (
                      <DatePicker
                        placeholderText="Select depart date"
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        showTimeInput
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="Pp"
                        selected={field.value}
                        
                      />
                    )}
                  />
                </div>
                  <div>
                      <input {...register("arrivalAirport")} defaultValue={flightInit.ArrivalAirport}/>
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
                      <input {...register("maxCapacity")} defaultValue={flightInit.Capacity}/>
                  </div>
              
                  <input className = "btn btn-outline-primary" type="submit" />
              </form>
          </div>
      );
  }
  return (
      <div>loading failed...</div>
  )
}

export default PutFlight;