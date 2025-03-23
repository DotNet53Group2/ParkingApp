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
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ParkingDBContext _context;
        private readonly IAuthService _authService;

        public AuthController(ParkingDBContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            bool success = await _authService.RegisterUser(user);
            if (!success) return BadRequest("Username already exists");
            return Ok(new { message = "Registration successful" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var token = await _authService.LoginUser(req.Username, req.Password);
            if (token == null) return Unauthorized("Invalid username or password");
            return Ok(new { token });
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.Include(u => u.Cars).ToListAsync();
            return Ok(users);
        }

        [HttpGet("users/{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            var user = await _context.Users.Include(u => u.Cars).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return NotFound("User not found");
            return Ok(user);
        }

        [HttpGet("cost/{userId}")]
        public async Task<IActionResult> GetCost(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound("User not found");
            return Ok(new { user.AccountBalance });
        }
    }
}