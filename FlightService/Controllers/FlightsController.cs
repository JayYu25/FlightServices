using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlightService.Data;
using FlightService.Model;

namespace FlightService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly FSContext _context;

        public FlightsController(FSContext context)
        {
            _context = context;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
          if (_context.Flights == null)
          {
              return NotFound();
          }
            //return await _context.Flights.ToListAsync();
            return await _context.Flights.Include(p => p.Passengers).ToListAsync();
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
          if (_context.Flights == null)
          {
              return NotFound();
          }
            //var flight = await _context.Flights.Include(p => p.Passengers).ToListAsync(id);
            var flight = await _context.Flights.Include(p => p.Passengers).FirstAsync(f => f.Id == id);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, Flight flight)
        {
            if (id != flight.Id)
            {
                return BadRequest();
            }

            _context.Entry(flight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Flight>> PostFlight(Flight flight)
        {
          if (_context.Flights == null)
          {
              return Problem("Entity set 'FSContext.Flights'  is null.");
          }
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { id = flight.Id }, flight);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            if (_context.Flights == null)
            {
                return NotFound();
            }
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        // POST: api/Flights/5/Passenger
        [HttpPost("{flightId}/Passengers/{passengerId}")]
        public async Task<ActionResult<Flight>> AddPassengerToFlight(int flightId, int passengerId)
        {
            Random rd = new Random();
            int ran_num = rd.Next(10000, 99999);

            var flight = await _context.Flights.Include(p => p.Passengers).FirstAsync(f => f.Id == flightId);
            var passenger = await _context.Passengers.FindAsync(passengerId);

            if (flight == null || passenger == null)
            {
                return BadRequest();
            }

            if (flight.SeatsOccupied == flight.Capacity)
            {
                return BadRequest("Error: Plane is at max seating capacity!");
            }
            passenger.ConfirmationNumber = ran_num;
            flight.Passengers.Add(passenger);
            await _context.SaveChangesAsync();

            return Ok(flight);
        }

        // DELETE: api/Flight/5/Passenger/5
        [HttpDelete("{flightId}/Passengers/{passengerId}")]

        public async Task<IActionResult> DeletePassengerFromFlight(int flightId, int passengerId)
        //public async Task<ActionResult<Flight>> DeletePassengerFromFlight(int flightId, int passengerId)
        {
            var flight = await _context.Flights.Include(p => p.Passengers).FirstAsync(f => f.Id == flightId);

            // Why does adding .Include(p => p.Passengers) saves the changes of delete?
            // AddPassengerToFlight doesn't need it.

            //var flight = await _context.Flights.FirstAsync(f => f.Id == flightId);
            var passenger = await _context.Passengers.FindAsync(passengerId);

            if (flight == null || passenger == null)
            {
                return BadRequest();
            }

            passenger.ConfirmationNumber = 0;
            flight.Passengers.Remove(passenger);
            await _context.SaveChangesAsync();

            // return NoContent();
            return Ok(flight);
        }

        private bool FlightExists(int id)
        {
            return (_context.Flights?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
