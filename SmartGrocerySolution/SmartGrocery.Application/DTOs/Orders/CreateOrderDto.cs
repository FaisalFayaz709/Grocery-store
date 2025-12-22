namespace SmartGrocery.Application.DTOs.Orders
{
       public class CreateOrderDto
    {
        public string DeliveryAddress { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty; // "COD", "Card", "Online"
    }
}