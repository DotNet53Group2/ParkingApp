

namespace parking_app.Services
{
    // Services
    public interface IParkingService
    {
        decimal CalculateCost(DateTime start, DateTime end);
    }

    public class ParkingService : IParkingService
    {
        private const decimal DayRate = 14;
        private const decimal NightRate = 6;
        private static readonly TimeSpan DayStart = TimeSpan.FromHours(8);
        private static readonly TimeSpan DayEnd = TimeSpan.FromHours(20);

        public decimal CalculateCost(DateTime start, DateTime end)
        {
            decimal totalCost = 0;
            while (start < end)
            {
                decimal rate = (start.TimeOfDay >= DayStart && start.TimeOfDay < DayEnd) ? DayRate : NightRate;
                totalCost += rate;
                start = start.AddHours(1);
            }
            return totalCost;
        }
    }
}