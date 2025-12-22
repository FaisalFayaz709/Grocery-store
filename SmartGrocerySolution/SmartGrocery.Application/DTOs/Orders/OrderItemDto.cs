// namespace SmartGrocery.Application.DTOs.Orders
// {
//      public class OrderItemDto
//     {
//         public Guid Id { get; set; }
//         public Guid ProductId { get; set; }
//         public string ProductName { get; set; } = string.Empty;
//         public string ProductImage { get; set; } = string.Empty;
//         public int Quantity { get; set; }
//         public decimal UnitPrice { get; set; }
//         public decimal TotalPrice => Quantity * UnitPrice;
//     }
// }


namespace SmartGrocery.Application.DTOs.Orders
{
    public class OrderItemDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        
        // Product Details
        public string ProductName { get; set; } = string.Empty;
        public string ProductImage { get; set; } = string.Empty;
        public string ProductDescription { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        
        // Order Item Details
        public int Quantity { get; set; }
        public decimal Price { get; set; } // Price at time of order
        public decimal TotalPrice => Quantity * Price;
    }
}