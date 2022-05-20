using FlightService.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FlightService.Model
{
    public class FlightAPassenger
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("Flight")]
        public int FlightId { get; set; }
        [ForeignKey("Passenger")]
        public int PassengerId { get; set; }
        public DateTime AddedDate { get; set; }

    }
}