// using SmartGrocery.Application.DTOs.Recommendation;

// namespace SmartGrocery.Application.Interfaces
// {
//     public interface IRecommendationService
//     {
//         Task<IEnumerable<RecommendedItemDto>> GetRecommendationsAsync(Guid userId);

//         Task<IEnumerable<ProductDto>> GetPopularProductsAsync();

//     }
// }

// SmartGrocery.Application/Interfaces/IRecommendationService.cs
using SmartGrocery.Application.DTOs.Recommendation;
using SmartGrocery.Application.DTOs.Products;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartGrocery.Application.Interfaces
{
    public interface IRecommendationService
    {
        Task<IEnumerable<RecommendedItemDto>> GetRecommendationsAsync(Guid userId);

        Task<IEnumerable<ProductDto>> GetPopularProductsAsync();
    }
}
