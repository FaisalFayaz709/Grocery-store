namespace SmartGrocery.Application.DTOs.Cart
{
    public class CartItemDto
    {
        public Guid Id { get; set; }

        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ProductImage { get; set; } = string.Empty;

        public decimal UnitPrice { get; set; }

        public int Quantity { get; set; }

        public decimal TotalPrice => Quantity * UnitPrice;
    }
}
