
using Microsoft.EntityFrameworkCore;
using parking_app.Models;

namespace parking_app.Data
{

    public class ParkingDBContext : DbContext
    {
        public ParkingDBContext(DbContextOptions<ParkingDBContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<ParkingPeriod> ParkingPeriods { get; set; }
    }
}