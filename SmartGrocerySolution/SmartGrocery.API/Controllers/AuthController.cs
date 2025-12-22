using Microsoft.AspNetCore.Mvc;
using SmartGrocery.Application.DTOs.Auth;
using SmartGrocery.Application.DTOs.Users;
using SmartGrocery.Application.Interfaces;

namespace SmartGrocery.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var response = await _authService.RegisterAsync(request);
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginAsync(request);
            return Ok(response);
        }

        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var user = HttpContext.Items["User"] as UserDto;
            if (user == null) return Unauthorized();

            return Ok(user);
        }
    }
}
