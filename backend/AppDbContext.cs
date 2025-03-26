using Microsoft.EntityFrameworkCore;

namespace ParkingApp;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<ParkingSpot> ParkingSpots { get; set; }
    public DbSet<Booking> Bookings { get; set; }

}
