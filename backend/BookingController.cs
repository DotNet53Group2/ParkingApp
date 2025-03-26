using Microsoft.AspNetCore.Mvc;
using ParkingApp;
using System.Linq;

namespace ParkingApp;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateBooking([FromBody] Booking booking)
    {
        _context.Bookings.Add(booking);
        _context.SaveChanges();
        return Ok(booking);
    }

    [HttpGet]
    public IActionResult GetBookings()
    {
        return Ok(_context.Bookings.ToList());
    }
    [HttpDelete("{id}")]
public IActionResult DeleteBooking(int id)
{
    var booking = _context.Bookings.FirstOrDefault(b => b.Id == id);
    if (booking == null)
    {
        return NotFound();
    }

    _context.Bookings.Remove(booking);
    _context.SaveChanges();
    return NoContent();
}

}
