// using System.Net.Http;
// using System.Net.Http.Json;
// using Microsoft.Extensions.Configuration;
// using SmartGrocery.Application.Interfaces;
// using SmartGrocery.Application.DTOs.Recommendation;

// namespace SmartGrocery.Infrastructure.External
// {
//     public class PythonRecommendationClient : IPythonRecommendationClient
//     {
//         private readonly HttpClient _httpClient;
//         private readonly string _baseUrl;

//         public PythonRecommendationClient(HttpClient httpClient, IConfiguration configuration)
//         {
//             _httpClient = httpClient;
//             _baseUrl = configuration["PythonService:BaseUrl"]
//                 ?? throw new InvalidOperationException("PythonService:BaseUrl is not configured.");
//             // Example: "http://localhost:5000/api/recommendations"
//         }

//         public async Task<List<RecommendedItemDto>> GetRecommendationsAsync(Guid userId)
//         {
//             try
//             {
//                 // var url = $"{_baseUrl}/recommend?userId={userId}";

//                 // var response = await _httpClient.GetAsync(url);
//                 var url = $"{_baseUrl}/api/v1/recommend";
//                 var request = new { user_id = userId, orders = new List<object>() };

//                 var response = await _httpClient.PostAsJsonAsync(url, request);


//                 if (!response.IsSuccessStatusCode)
//                     throw new Exception($"Python service responded with {response.StatusCode}");

//                 var data = await response.Content.ReadFromJsonAsync<List<RecommendedItemDto>>();

//                 return data ?? new List<RecommendedItemDto>();
//             }
//             catch (Exception ex)
//             {
//                 throw new Exception($"Error calling Python recommendation API: {ex.Message}");
//             }
//         }

//         public async Task<bool> SendTrainingDataAsync(TrainingDataDto trainingData)
//         {
//             try
//             {
//                 var url = $"{_baseUrl}/train";

//                 var response = await _httpClient.PostAsJsonAsync(url, trainingData);

//                 return response.IsSuccessStatusCode;
//             }
//             catch (Exception ex)
//             {
//                 throw new Exception($"Error sending training data to Python API: {ex.Message}");
//             }
//         }
//     }
// }



using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.DTOs.Recommendation;

namespace SmartGrocery.Infrastructure.External
{
    public class PythonRecommendationClient : IPythonRecommendationClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        private readonly ILogger<PythonRecommendationClient> _logger;

        public PythonRecommendationClient(
            HttpClient httpClient, 
            IConfiguration configuration,
            ILogger<PythonRecommendationClient> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            
            _baseUrl = configuration["PythonService:BaseUrl"] 
                ?? "http://0.0.0.0:8001"; // Default URL for local development
            
            _httpClient.Timeout = TimeSpan.FromSeconds(30);
            
            _logger.LogInformation($"PythonRecommendationClient initialized with base URL: {_baseUrl}");
        }

        public async Task<List<RecommendedItemDto>> GetRecommendationsAsync(Guid userId)
        {
            try
            {
                var url = $"{_baseUrl}/api/v1/recommend";
                
                var request = new 
                { 
                    user_id = userId.ToString(),
                    top_n = 10 // Request top 10 recommendations
                };

                _logger.LogInformation($"Calling Python API: {url} for user {userId}");

                var response = await _httpClient.PostAsJsonAsync(url, request);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"Python service responded with {response.StatusCode}: {errorContent}");
                    return new List<RecommendedItemDto>();
                }

                var data = await response.Content.ReadFromJsonAsync<PythonRecommendationResponse>();

                if (data?.Recommendations == null || !data.Recommendations.Any())
                {
                    _logger.LogWarning($"No recommendations returned from Python API for user {userId}");
                    return new List<RecommendedItemDto>();
                }

                _logger.LogInformation($"Received {data.Recommendations.Count} recommendations from Python API");

                // Convert Python response to our DTO
                return data.Recommendations.Select(r => new RecommendedItemDto
                {
                    ProductId = Guid.Parse(r.ProductId),
                    ProductName = "", // Will be filled from database
                    Price = 0, // Will be filled from database
                    Score = r.Score
                }).ToList();
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"HTTP error calling Python recommendation API: {ex.Message}");
                return new List<RecommendedItemDto>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error calling Python recommendation API: {ex.Message}");
                return new List<RecommendedItemDto>();
            }
        }

        public async Task<bool> SendTrainingDataAsync(TrainingDataDto trainingData)
        {
            try
            {
                var url = $"{_baseUrl}/api/v1/train";

                _logger.LogInformation($"Sending training data to Python API: {url}");

                var response = await _httpClient.PostAsJsonAsync(url, trainingData);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation("Training data sent successfully");
                    return true;
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"Failed to send training data: {response.StatusCode} - {errorContent}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error sending training data to Python API: {ex.Message}");
                return false;
            }
        }

        // Response model matching Python FastAPI response
        private class PythonRecommendationResponse
        {
            public List<PythonRecommendation> Recommendations { get; set; } = new();
        }

        private class PythonRecommendation
        {
            public string ProductId { get; set; } = string.Empty;
            public double Score { get; set; }
        }
    }
}