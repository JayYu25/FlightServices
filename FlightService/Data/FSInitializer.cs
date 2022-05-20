using FlightService.Model;
using Microsoft.EntityFrameworkCore;

namespace FlightService.Data
{
    public static class FSInitializer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new FSContext(serviceProvider.GetRequiredService<DbContextOptions<FSContext>>()))
            {
                //context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                if (!context.Passengers.Any())
                {
                    var pgrsToAdd = new Passenger[]
                    {
                        new Passenger {FirstName = "Jay", LastName = "Yuan", Age = 20, Job = "Software Engineer", Email = "JayExample@gmail.com", ConfirmationNumber = 0 },
                        new Passenger {FirstName = "Joe", LastName = "Cherette", Age = 40, Job = "Singer", Email = "JoeExample@gmail.com", ConfirmationNumber = 0 },
                        new Passenger {FirstName = "Caelie", LastName = "Abby", Age = 26, Job = "Mechanical Engineer", Email = "CaelieExample@gmail.com", ConfirmationNumber = 0 },
                        new Passenger {FirstName = "Rorie", LastName = "Syd", Age = 60, Job = "Doctor", Email = "RorieExample@gmail.com", ConfirmationNumber = 0 },
                        new Passenger {FirstName = "Christabelle", LastName = "Jules", Age = 19, Job = "Student", Email = "ChristaExample@gmail.com", ConfirmationNumber = 0 },

                    };
                    context.Passengers.AddRange(pgrsToAdd); // Tracks all entities and inserts into database when SaveChanges() is called.
                    context.SaveChanges();
                }

                if (!context.Flights.Any())
                {
                    var flightsToAdd = new Flight[]
                    {
                        new Flight {FlightNumber = "A100", DepartAirport = "MOB", ArrivalAirport = "FLL", DepartDate = new DateTime(2022,05,29,10,35,5), ArrivalDate = new DateTime(2022,05,29,16,35,5), Capacity = 3},
                        new Flight {FlightNumber = "A101",DepartAirport = "NYC", ArrivalAirport = "MIA", DepartDate = new DateTime(2022,05,29,10,35,5), ArrivalDate = new DateTime(2022,05,29,22,35,5), Capacity = 15},
                        new Flight {FlightNumber = "B100",DepartAirport = "QLA", ArrivalAirport = "SFO", DepartDate = new DateTime(2022,05,29,10,35,5), ArrivalDate = new DateTime(2022,05,29,14,35,5), Capacity = 30},
                    };
                    context.Flights.AddRange(flightsToAdd);
                    context.SaveChanges();
                }


            }
        }
    }
}
