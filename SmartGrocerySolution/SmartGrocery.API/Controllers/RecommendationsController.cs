using Microsoft.AspNetCore.Mvc;
using SmartGrocery.Application.Interfaces;

namespace SmartGrocery.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationsController : ControllerBase
    {
        private readonly IRecommendationService _recommendationService;
        public RecommendationsController(IRecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
        }

        // [HttpGet("{userId}")]
        // public async Task<IActionResult> GetRecommendations(Guid userId)
        // {
        //     var recommendations = await _recommendationService.GetRecommendationsAsync(userId);
        //     return Ok(recommendations);
        // }

                // /recommendations/user/:id
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserRecommendations(Guid userId)
        {
            var result = await _recommendationService.GetRecommendationsAsync(userId);
            return Ok(result);
        }

                  // NEW: /recommendations/popular
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularRecommendations()
        {
            var result = await _recommendationService.GetPopularProductsAsync();
            return Ok(result);
        }

        
    }
}
