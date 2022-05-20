using System.ComponentModel.DataAnnotations;

namespace FlightService.Model
{
    public class Flight
    {
        
        public int Id { get; set; }
        public string FlightNumber { get; set; } = String.Empty;
        public string DepartAirport { get; set; } = String.Empty;
        public string ArrivalAirport { get; set; } = String.Empty;

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DepartDate { get; set; } = new DateTime();

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime ArrivalDate { get; set; } = new DateTime();

        public int Capacity { get; set; }

        // testing
        //public Passenger Passenger { get; set; } = null!;
        public ICollection<Passenger>? Passengers { get; set; } = new List<Passenger>();

        public int SeatsOccupied => Passengers == null ? 0 : Passengers.Count;

    }
}
