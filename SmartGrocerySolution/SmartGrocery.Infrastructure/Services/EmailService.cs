// using System.Net;
// using System.Net.Mail;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.Logging;
// using SmartGrocery.Application.Interfaces;

// namespace SmartGrocery.Application.Services
// {
//     public class EmailService : IEmailService
//     {
//         private readonly IConfiguration _configuration;
//         private readonly ILogger<EmailService> _logger;
//         private readonly string _smtpHost;
//         private readonly int _smtpPort;
//         private readonly string _smtpUsername;
//         private readonly string _smtpPassword;
//         private readonly string _fromEmail;
//         private readonly string _adminEmail;

//         public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
//         {
//             _configuration = configuration;
//             _logger = logger;

//             _smtpHost = _configuration["EmailSettings:SmtpHost"] ?? "smtp.gmail.com";
//             _smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
//             _smtpUsername = _configuration["EmailSettings:Username"] ?? "";
//             _smtpPassword = _configuration["EmailSettings:Password"] ?? "";
//             _fromEmail = _configuration["EmailSettings:FromEmail"] ?? "noreply@grocery.com";
//             _adminEmail = _configuration["EmailSettings:AdminEmail"] ?? "admin@grocery.com";
//         }

//         public async Task<bool> SendContactEmailAsync(string name, string email, string phone, string subject, string message)
//         {
//             try
//             {
//                 using var smtpClient = new SmtpClient(_smtpHost, _smtpPort)
//                 {
//                     EnableSsl = true,
//                     Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
//                 };

//                 var mailMessage = new MailMessage
//                 {
//                     From = new MailAddress(_fromEmail, "Smart Grocery Store"),
//                     Subject = $"Contact Form: {subject}",
//                     Body = $@"
//                         <html>
//                         <body style='font-family: Arial, sans-serif;'>
//                             <div style='background-color: #f9f9f9; padding: 20px;'>
//                                 <div style='background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;'>
//                                     <h2 style='color: #4CAF50; margin-bottom: 20px;'>New Contact Form Submission</h2>
                                    
//                                     <div style='margin-bottom: 15px;'>
//                                         <strong style='color: #333;'>Name:</strong>
//                                         <p style='margin: 5px 0; color: #666;'>{name}</p>
//                                     </div>
                                    
//                                     <div style='margin-bottom: 15px;'>
//                                         <strong style='color: #333;'>Email:</strong>
//                                         <p style='margin: 5px 0; color: #666;'>{email}</p>
//                                     </div>
                                    
//                                     <div style='margin-bottom: 15px;'>
//                                         <strong style='color: #333;'>Phone:</strong>
//                                         <p style='margin: 5px 0; color: #666;'>{phone}</p>
//                                     </div>
                                    
//                                     <div style='margin-bottom: 15px;'>
//                                         <strong style='color: #333;'>Subject:</strong>
//                                         <p style='margin: 5px 0; color: #666;'>{subject}</p>
//                                     </div>
                                    
//                                     <div style='margin-bottom: 15px;'>
//                                         <strong style='color: #333;'>Message:</strong>
//                                         <div style='background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;'>
//                                             <p style='margin: 0; color: #666; white-space: pre-wrap;'>{message}</p>
//                                         </div>
//                                     </div>
                                    
//                                     <hr style='border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;'>
                                    
//                                     <p style='color: #999; font-size: 12px; margin: 0;'>
//                                         This email was sent from the Smart Grocery Store contact form.
//                                     </p>
//                                 </div>
//                             </div>
//                         </body>
//                         </html>
//                     ",
//                     IsBodyHtml = true
//                 };

//                 mailMessage.To.Add(_adminEmail);
//                 mailMessage.ReplyToList.Add(new MailAddress(email, name));

//                 await smtpClient.SendMailAsync(mailMessage);

//                 _logger.LogInformation($"Contact email sent successfully from {email}");
//                 return true;
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, $"Failed to send contact email from {email}");
//                 return false;
//             }
//         }

//         public async Task<bool> SendOrderConfirmationAsync(string customerEmail, string orderDetails)
//         {
//             try
//             {
//                 using var smtpClient = new SmtpClient(_smtpHost, _smtpPort)
//                 {
//                     EnableSsl = true,
//                     Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
//                 };

//                 var mailMessage = new MailMessage
//                 {
//                     From = new MailAddress(_fromEmail, "Smart Grocery Store"),
//                     Subject = "Order Confirmation - Smart Grocery Store",
//                     Body = orderDetails,
//                     IsBodyHtml = true
//                 };

//                 mailMessage.To.Add(customerEmail);

//                 await smtpClient.SendMailAsync(mailMessage);

//                 _logger.LogInformation($"Order confirmation email sent to {customerEmail}");
//                 return true;
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, $"Failed to send order confirmation to {customerEmail}");
//                 return false;
//             }
//         }
//     }
// }


using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SmartGrocery.Application.Interfaces;

namespace SmartGrocery.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly string _fromEmail;
        private readonly string _adminEmail;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;

            _smtpHost = _configuration["EmailSettings:SmtpHost"] ?? "smtp.gmail.com";
            _smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
            _smtpUsername = _configuration["EmailSettings:Username"] ?? "";
            _smtpPassword = _configuration["EmailSettings:Password"] ?? "";
            _fromEmail = _configuration["EmailSettings:FromEmail"] ?? "noreply@grocery.com";
            _adminEmail = _configuration["EmailSettings:AdminEmail"] ?? "admin@grocery.com";
        }

        public async Task<bool> SendContactEmailAsync(string name, string email, string phone, string subject, string message)
        {
            try
            {
                using var smtpClient = new SmtpClient(_smtpHost, _smtpPort)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_fromEmail, "Smart Grocery Store"),
                    Subject = $"Contact Form: {subject}",
                    Body = $@"
                        <html>
                        <body style='font-family: Arial, sans-serif;'>
                            <div style='background-color: #f9f9f9; padding: 20px;'>
                                <div style='background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;'>
                                    <h2 style='color: #4CAF50; margin-bottom: 20px;'>New Contact Form Submission</h2>
                                    
                                    <div style='margin-bottom: 15px;'>
                                        <strong style='color: #333;'>Name:</strong>
                                        <p style='margin: 5px 0; color: #666;'>{name}</p>
                                    </div>
                                    
                                    <div style='margin-bottom: 15px;'>
                                        <strong style='color: #333;'>Email:</strong>
                                        <p style='margin: 5px 0; color: #666;'>{email}</p>
                                    </div>
                                    
                                    <div style='margin-bottom: 15px;'>
                                        <strong style='color: #333;'>Phone:</strong>
                                        <p style='margin: 5px 0; color: #666;'>{phone}</p>
                                    </div>
                                    
                                    <div style='margin-bottom: 15px;'>
                                        <strong style='color: #333;'>Subject:</strong>
                                        <p style='margin: 5px 0; color: #666;'>{subject}</p>
                                    </div>
                                    
                                    <div style='margin-bottom: 15px;'>
                                        <strong style='color: #333;'>Message:</strong>
                                        <div style='background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;'>
                                            <p style='margin: 0; color: #666; white-space: pre-wrap;'>{message}</p>
                                        </div>
                                    </div>
                                    
                                    <hr style='border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;'>
                                    
                                    <p style='color: #999; font-size: 12px; margin: 0;'>
                                        This email was sent from the Smart Grocery Store contact form.
                                    </p>
                                </div>
                            </div>
                        </body>
                        </html>
                    ",
                    IsBodyHtml = true
                };

                mailMessage.To.Add(_adminEmail);
                mailMessage.ReplyToList.Add(new MailAddress(email, name));

                await smtpClient.SendMailAsync(mailMessage);

                _logger.LogInformation($"Contact email sent successfully from {email}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send contact email from {email}");
                return false;
            }
        }

        public async Task<bool> SendOrderConfirmationAsync(string customerEmail, string orderDetails)
        {
            try
            {
                using var smtpClient = new SmtpClient(_smtpHost, _smtpPort)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_fromEmail, "Smart Grocery Store"),
                    Subject = "Order Confirmation - Smart Grocery Store",
                    Body = orderDetails,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(customerEmail);

                await smtpClient.SendMailAsync(mailMessage);

                _logger.LogInformation($"Order confirmation email sent to {customerEmail}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send order confirmation to {customerEmail}");
                return false;
            }
        }
    }
}