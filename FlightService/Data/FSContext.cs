using Microsoft.EntityFrameworkCore;
using FlightService.Model;

namespace FlightService.Data
{
    public class FSContext : DbContext
    {
        public FSContext()
        {

        }
        public FSContext(DbContextOptions<FSContext> options) : base(options)
        {

        }

        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<FlightAPassenger> Confirmation {get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelbuilder.entity<flight>()
            //     .hasmany(p => p.passengers)
            //     .withmany(f => f.flights)
            //     .usingentity<flightapassenger>();

            //modelbuilder.entity<passenger>()
            //    .hasmany(f => f.flights)
            //    .withmany(p => p.passengers)
            //    .usingentity<flightapassenger>();

        }

    }
}
