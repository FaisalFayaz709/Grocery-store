namespace SmartGrocery.Application.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendContactEmailAsync(string name, string email, string phone, string subject, string message);
        Task<bool> SendOrderConfirmationAsync(string customerEmail, string orderDetails);
    }
}