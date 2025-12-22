using SmartGrocery.Application.DTOs.Auth;
using SmartGrocery.Application.DTOs.Users;
using SmartGrocery.Application.Exceptions;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Application.Interfaces.Security;
using SmartGrocery.Domain.Entities;
using SmartGrocery.Domain.Enums;

namespace SmartGrocery.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwt;

        public AuthService(IUserRepository userRepository, IJwtTokenGenerator jwt)
        {
            _userRepository = userRepository;
            _jwt = jwt;
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
                throw new NotFoundException("User not found.");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                throw new ValidationException("Invalid password.");

            var token = _jwt.GenerateToken(user);

            return new AuthResponse
            {
                Token = token.Token,
                ExpiresAt = token.ExpiresAt,
                User = MapToDto(user)
            };
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            var existing = await _userRepository.GetByEmailAsync(request.Email);
            if (existing != null)
                throw new ValidationException("Email already registered.");

            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = UserRole.User
            };

            await _userRepository.AddAsync(user);

            var token = _jwt.GenerateToken(user);

            return new AuthResponse
            {
                Token = token.Token,
                ExpiresAt = token.ExpiresAt,
                User = MapToDto(user)
            };
        }

        public Guid? ValidateJwtToken(string token) =>
            _jwt.ValidateToken(token);

        public async Task<UserDto?> GetUserByIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return user == null ? null : MapToDto(user);
        }

        private static UserDto MapToDto(User user) =>
            new()
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                Role = user.Role.ToString(),
                CreatedAt = user.CreatedAt
            };
    }
}
