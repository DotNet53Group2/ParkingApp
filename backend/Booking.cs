using System;

namespace ParkingApp;

public class Booking
{
    public int Id { get; set; }
    public int ParkingSpotId { get; set; } 
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public ParkingSpot? ParkingSpot { get; set; } 
}
