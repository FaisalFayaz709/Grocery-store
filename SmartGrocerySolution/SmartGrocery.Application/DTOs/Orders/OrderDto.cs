// namespace SmartGrocery.Application.DTOs.Orders
// {
//     public class OrderDto
//     {
//         public Guid Id { get; set; }
//         public Guid UserId { get; set; }

//         public decimal TotalAmount { get; set; }
//         public string Status { get; set; } = string.Empty;

//         public DateTime CreatedAt { get; set; }

//         public List<OrderItemDto> Items { get; set; } = new();
//     }
// }


namespace SmartGrocery.Application.DTOs.Orders
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        
        // User Information
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string UserPhone { get; set; } = string.Empty;

        // Order Details
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        
        // Delivery Information
        public string DeliveryAddress { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Order Items with full product details
        public List<OrderItemDto> OrderItems { get; set; } = new();
    }
}