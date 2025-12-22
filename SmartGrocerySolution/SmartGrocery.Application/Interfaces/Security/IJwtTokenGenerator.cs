using SmartGrocery.Domain.Entities;

namespace SmartGrocery.Application.Interfaces.Security
{
    public record JwtTokenResult(string Token, DateTime ExpiresAt);

    public interface IJwtTokenGenerator
    {
        JwtTokenResult GenerateToken(User user);
        Guid? ValidateToken(string token);
    }
}







