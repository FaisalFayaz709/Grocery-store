using Microsoft.AspNetCore.Mvc;
using SmartGrocery.Application.DTOs.Contact;
using SmartGrocery.Application.Interfaces;

namespace SmartGrocery.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IEmailService emailService, ILogger<ContactController> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> SendContactMessage([FromBody] ContactMessageDto dto)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(dto.Name) ||
                    string.IsNullOrWhiteSpace(dto.Email) ||
                    string.IsNullOrWhiteSpace(dto.Phone) ||
                    string.IsNullOrWhiteSpace(dto.Subject) ||
                    string.IsNullOrWhiteSpace(dto.Message))
                {
                    return BadRequest(new ContactMessageResponseDto
                    {
                        Success = false,
                        Message = "All fields are required"
                    });
                }

                // Send email to admin
                var emailSent = await _emailService.SendContactEmailAsync(
                    dto.Name,
                    dto.Email,
                    dto.Phone,
                    dto.Subject,
                    dto.Message
                );

                if (emailSent)
                {
                    _logger.LogInformation($"Contact message received from {dto.Email}");
                    
                    return Ok(new ContactMessageResponseDto
                    {
                        Success = true,
                        Message = "Your message has been sent successfully! We'll get back to you soon."
                    });
                }
                else
                {
                    _logger.LogWarning($"Failed to send contact email from {dto.Email}");
                    
                    return StatusCode(500, new ContactMessageResponseDto
                    {
                        Success = false,
                        Message = "Failed to send email. Please try again later or contact us directly."
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing contact form submission");
                
                return StatusCode(500, new ContactMessageResponseDto
                {
                    Success = false,
                    Message = "An error occurred while processing your request"
                });
            }
        }
    }
}