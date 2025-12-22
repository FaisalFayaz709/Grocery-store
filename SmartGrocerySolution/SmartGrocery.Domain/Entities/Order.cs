

// using SmartGrocery.Domain.Common;
// using SmartGrocery.Domain.Enums;

// namespace SmartGrocery.Domain.Entities
// {
//     public class Order : BaseEntity
//     {
//         public Guid UserId { get; set; }
//         public User? User { get; set; }

//         public decimal TotalAmount { get; set; }
//         public OrderStatus Status { get; set; } = OrderStatus.Pending;

//         public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
//     }
// }



using SmartGrocery.Domain.Common;
using SmartGrocery.Domain.Enums;

namespace SmartGrocery.Domain.Entities
{
    public class Order : BaseEntity
    {
        // ✅ Removed duplicate Id - inherited from BaseEntity
        public Guid UserId { get; set; }
        
        public decimal TotalAmount { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        
        // Delivery Information
        public string DeliveryAddress { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        
        // ✅ Removed duplicate CreatedAt - inherited from BaseEntity
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public User? User { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; } = new List<OrderItem>();
    }
}