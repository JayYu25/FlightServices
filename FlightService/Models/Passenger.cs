namespace FlightService.Model
{
    public class Passenger
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public int Age { get; set; }
        public string Job { get; set; } = String.Empty;

        public string Email { get; set; } = String.Empty;
        public int ConfirmationNumber { get; set; }

        public ICollection<Flight>? Flights { get; set; } = new List<Flight>();

        // Could possibily add count for number of flights.

    }
}