using parking_app.Services;
using Microsoft.EntityFrameworkCore;
using parking_app.Models;
using parking_app.Data;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace parking_app.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUser(User user);
        Task<string?> LoginUser(string username, string password);
    }

    public class AuthService : IAuthService
    {
        private readonly ParkingDBContext _context;

        public AuthService(ParkingDBContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterUser(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return false;

            var hashedPassword = HashPassword(user.PasswordHash);
            user.PasswordHash = hashedPassword;
            
             _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string?> LoginUser(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null || user.PasswordHash != HashPassword(password))
                return null;

            return Convert.ToBase64String(Encoding.UTF8.GetBytes(username));
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}