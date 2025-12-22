using SmartGrocery.Application.DTOs.Recommendation;

namespace SmartGrocery.Application.Interfaces
{
    public interface IPythonRecommendationClient
    {
        Task<List<RecommendedItemDto>> GetRecommendationsAsync(Guid userId);
        Task<bool> SendTrainingDataAsync(TrainingDataDto trainingData);
    }
}
