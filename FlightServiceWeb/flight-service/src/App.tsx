import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import HomeView from './views/home/HomeView';
import PassengerListView from './views/passenger/PassengerListView';
import FlightListView from './views/flight/FlightListView';
import PostPassenger from './views/passenger/PostPassenger';
import PutPassenger from './views/passenger/PutPassenger';
import PassengerBookFlight from './views/passenger/PassengerBookFlight';
import PassengerUnbookFlight from './views/passenger/PassengerUnbookFlight';
import PassengerListViewAll from './views/passenger/PassengerListViewAll';
import PostFlight from './views/flight/PostFlight';
import PutFlight from './views/flight/PutFlight';
import FlightListViewAll from './views/flight/FlightListViewAll';

class App extends React.Component {
  render() {
    return (
      <main>
        <NavigationBar />
        <Routes>
            <Route path="/" element={ <HomeView />} />

            <Route path="/passenger/*" element={  
                    <React.Suspense fallback={<>...</>}>
                      <PassengerListView />
                    </React.Suspense>} />
            
            <Route path="/flight/*" element={  
                    <React.Suspense fallback={<>...</>}>
                      <FlightListView />
                    </React.Suspense>} />
            
            <Route path="/passengersAdd/*" element={  
                    <React.Suspense fallback={<>...</>}>
                      <PostPassenger />
                    </React.Suspense>} />

            <Route path="/passengersEdit/:id" element={  
                    <React.Suspense fallback={<>...</>}>
                      <PutPassenger />
                    </React.Suspense>} />

            <Route path="/passengerBook/:id" element={  
                    <React.Suspense fallback={<>...</>}>
                      <PassengerBookFlight />
                    </React.Suspense>} />

            <Route path="/passengerUnbook/:id" element={  
                    <React.Suspense fallback={<>...</>}>
                      <PassengerUnbookFlight />
                    </React.Suspense>} />

            <Route path="/passengerInfo/:id" element={  
                    <React.Suspense fallback={<>...</>}>
                      <PassengerListViewAll />
                    </React.Suspense>} />

            <Route path="/flightsAdd/" element={  
                    <React.Suspense fallback={<>...</>}>
                      <PostFlight />
                    </React.Suspense>} />

            <Route path="/flightEdit/:id" element={  
                    <React.Suspense fallback={<>...</>}>
                      <PutFlight />
                    </React.Suspense>} />

            <Route path="/flightsInfo/:id" element={  
                    <React.Suspense fallback={<>...</>}>
                      <FlightListViewAll />
                    </React.Suspense>} />

        </Routes>
      </main>
    );
  }
}
export default App;
