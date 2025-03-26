using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ParkingApp;

namespace ParkingApp;

[ApiController]
[Route("api/[controller]")]
public class ParkingController : ControllerBase
{
    private readonly AppDbContext _context;

    public ParkingController(AppDbContext context)
    {
        _context = context;

        if (!_context.ParkingSpots.Any())
        {
            _context.ParkingSpots.Add(new ParkingSpot { Location = "A1", IsAvailable = true });
            _context.SaveChanges();
        }
    }

    [HttpGet]
    public IEnumerable<ParkingSpot> Get()
    {
        return _context.ParkingSpots.ToList();
    }

    [HttpPost]
public IActionResult Create(ParkingSpot spot)
{
    _context.ParkingSpots.Add(spot);
    _context.SaveChanges();
    return CreatedAtAction(nameof(Get), new { id = spot.Id }, spot);
}

}
