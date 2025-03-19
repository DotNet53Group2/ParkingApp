using Microsoft.AspNetCore.Mvc;
using parking_app.Data;
using parking_app.Models;
using parking_app.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace parking_app.Controllers
{
    // // Controllers
    // [Route("api/parking")]
    // [ApiController]
    // public class ParkingController : ControllerBase
    // {
    //     private readonly ParkingDBContext _context;
    //     private readonly IParkingService _parkingService;

    //     public ParkingController(ParkingDBContext context, IParkingService parkingService)
    //     {
    //         _context = context;
    //         _parkingService = parkingService;
    //     }

    //     [HttpPost("begin")] 
    //     public async Task<IActionResult> BeginPeriod([FromBody] int carId)
    //     {
    //         var car = await _context.Cars.FindAsync(carId);
    //         if (car == null) return NotFound("Car not found");

    //         if (_context.ParkingPeriods.Any(p => p.CarId == carId && p.EndTime == null))
    //             return BadRequest("A parking session is already active for this car.");

    //         var period = new ParkingPeriod { CarId = carId, StartTime = DateTime.Now };
    //         _context.ParkingPeriods.Add(period);
    //         await _context.SaveChangesAsync();
    //         return Ok(period);
    //     }

    //     [HttpPost("end")] 
    //     public async Task<IActionResult> EndPeriod([FromBody] int carId)
    //     {
    //         var period = _context.ParkingPeriods.FirstOrDefault(p => p.CarId == carId && p.EndTime == null);
    //         if (period == null) return NotFound("No active parking period found");

    //         period.EndTime = DateTime.Now;
    //         var hours = _parkingService.CalculateCost(period.StartTime, period.EndTime.Value);

    //         var car = await _context.Cars.FindAsync(carId);
    //         var user = await _context.Users.FindAsync(car.UserId);
    //         user.AccountBalance += hours;
    //         await _context.SaveChangesAsync();
    //         return Ok(new { period.Id, Cost = hours });
    //     }

    //     [HttpGet("current/{carId}")]
    //     public async Task<IActionResult> GetCurrentPeriod(int carId)
    //     {
    //         var period = await _context.ParkingPeriods.FirstOrDefaultAsync(p => p.CarId == carId && p.EndTime == null);
    //         if (period == null) return NotFound("No active parking session found.");
    //         return Ok(period);
    //     }
    // }


    // Controllers
    [Route("api/parking")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private readonly ParkingDBContext _context;
        private const decimal DayRate = 14;
        private const decimal NightRate = 6;
        private static readonly TimeSpan DayStart = TimeSpan.FromHours(8);
        private static readonly TimeSpan DayEnd = TimeSpan.FromHours(20);

        public ParkingController(ParkingDBContext context)
        {
            _context = context;
        }

        [HttpPost("begin/{carId}")]
        public async Task<IActionResult> BeginPeriod(int carId)
        {
            var car = await _context.Cars.FindAsync(carId);
            if (car == null) return NotFound("Car not found");

            if (_context.ParkingPeriods.Any(p => p.CarId == carId && p.EndTime == null))
                return BadRequest("A parking session is already active for this car.");

            var period = new ParkingPeriod { CarId = carId, StartTime = DateTime.Now };
            _context.ParkingPeriods.Add(period);
            await _context.SaveChangesAsync();
            return Ok(period);
        }

        [HttpPost("end/{carId}")]
        public async Task<IActionResult> EndPeriod(int carId)
        {
            var period = _context.ParkingPeriods.FirstOrDefault(p => p.CarId == carId && p.EndTime == null);
            if (period == null) return NotFound("No active parking period found");

            period.EndTime = DateTime.Now;
            var hours = CalculateCost(period.StartTime, period.EndTime.Value);

            var car = await _context.Cars.FindAsync(carId);
            var user = await _context.Users.FindAsync(car.UserId);
            user.AccountBalance += hours;
            await _context.SaveChangesAsync();
            return Ok(new { period.Id, Cost = hours });
        }

        [HttpGet("current/{carId}")]
        public IActionResult GetCurrentPeriod(int carId)
        {
            var period = _context.ParkingPeriods.FirstOrDefault(p => p.CarId == carId && p.EndTime == null);
            if (period == null) return NotFound("No active parking period found");
            return Ok(period);
        }
       

        private decimal CalculateCost(DateTime start, DateTime end)
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