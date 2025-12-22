namespace SmartGrocery.Application.DTOs.Recommendation
{
    public class TrainingDataDto
    {
        public Guid UserId { get; set; }
        public List<Guid> PurchasedProductIds { get; set; } = new List<Guid>();
    }
}
