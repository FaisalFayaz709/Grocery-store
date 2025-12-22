using SmartGrocery.Application.DTOs.Auth;
using SmartGrocery.Application.DTOs.Users;


namespace SmartGrocery.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);

        // 🔥 Added for JWT Middleware
        Guid? ValidateJwtToken(string token);
        Task<UserDto?> GetUserByIdAsync(Guid userId);
    }
}
