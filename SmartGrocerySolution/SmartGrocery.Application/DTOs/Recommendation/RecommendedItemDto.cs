namespace SmartGrocery.Application.DTOs.Recommendation
{
    public class RecommendedItemDto
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int Stock { get; set; }
        public double Score { get; set; } // Confidence score from ML model
    }
}