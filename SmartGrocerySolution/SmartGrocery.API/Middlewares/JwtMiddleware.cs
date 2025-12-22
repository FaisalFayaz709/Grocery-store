using Microsoft.Extensions.DependencyInjection;
using SmartGrocery.Application.Interfaces;

namespace SmartGrocery.API.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (!string.IsNullOrWhiteSpace(token))
                await AttachUserToContext(context, token);

            await _next(context);
        }

        private async Task AttachUserToContext(HttpContext context, string token)
        {
            var authService = context.RequestServices.GetRequiredService<IAuthService>();

            var userId = authService.ValidateJwtToken(token);
            if (!userId.HasValue)
                return;

            var user = await authService.GetUserByIdAsync(userId.Value);
            if (user == null)
                return;

            context.Items["UserId"] = user.Id;
            context.Items["User"] = user;
        }
    }
}
