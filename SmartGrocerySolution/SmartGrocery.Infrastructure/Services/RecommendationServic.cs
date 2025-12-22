using SmartGrocery.Application.DTOs.Products;
using SmartGrocery.Application.DTOs.Recommendation;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using Microsoft.Extensions.Logging;

namespace SmartGrocery.Infrastructure.Services
{
    public class RecommendationService : IRecommendationService
    {
        private readonly IProductRepository _productRepo;
        private readonly IOrderRepository _orderRepo;
        private readonly ILogger<RecommendationService> _logger;

        public RecommendationService(
            IProductRepository productRepo,
            IOrderRepository orderRepo,
            ILogger<RecommendationService> logger)
        {
            _productRepo = productRepo;
            _orderRepo = orderRepo;
            _logger = logger;
        }

        public async Task<IEnumerable<RecommendedItemDto>> GetRecommendationsAsync(Guid userId)
        {
            try
            {
                _logger.LogInformation($"Fetching recommendations for user {userId}");

                // Get best-selling products
                var popularProducts = await GetBestSellingProductsAsync(10);

                if (!popularProducts.Any())
                {
                    _logger.LogWarning("No best-selling products found, returning all products");
                    var allProducts = await _productRepo.GetAllAsync();
                    return allProducts
                        .Where(p => p.Stock > 0)
                        .Take(10)
                        .Select(p => new RecommendedItemDto
                        {
                            ProductId = p.Id,
                            ProductName = p.Name,
                            Description = p.Description,
                            Price = p.Price,
                            ImageUrl = p.ImageUrl,
                            Stock = p.Stock,
                            Score = 0.5
                        }).ToList();
                }

                return popularProducts.Select(p => new RecommendedItemDto
                {
                    ProductId = p.Id,
                    ProductName = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    Stock = p.Stock,
                    Score = 1.0
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting recommendations for user {userId}");
                return new List<RecommendedItemDto>();
            }
        }

        public async Task<IEnumerable<ProductDto>> GetPopularProductsAsync()
        {
            try
            {
                _logger.LogInformation("Fetching popular products");

                var bestSellingProducts = await GetBestSellingProductsAsync(20);

                if (!bestSellingProducts.Any())
                {
                    var allProducts = await _productRepo.GetAllAsync();
                    return allProducts
                        .Where(p => p.Stock > 0)
                        .Take(20)
                        .Select(p => new ProductDto
                        {
                            Id = p.Id,
                            Name = p.Name,
                            Description = p.Description,
                            Price = p.Price,
                            ImageUrl = p.ImageUrl,
                            CategoryId = p.CategoryId,
                            Stock = p.Stock,
                            CreatedAt = p.CreatedAt
                        })
                        .ToList();
                }

                return bestSellingProducts.Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    CategoryId = p.CategoryId,
                    Stock = p.Stock,
                    CreatedAt = p.CreatedAt
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching popular products");
                return Enumerable.Empty<ProductDto>();
            }
        }

        private async Task<List<Product>> GetBestSellingProductsAsync(int count)
        {
            try
            {
                var orders = await _orderRepo.GetAllWithDetailsAsync();

                if (orders == null || !orders.Any())
                {
                    _logger.LogInformation("No orders found, returning empty list");
                    return new List<Product>();
                }

                var productSales = orders
                    .SelectMany(o => o.OrderItems ?? new List<OrderItem>())
                    .GroupBy(oi => oi.ProductId)
                    .Select(g => new
                    {
                        ProductId = g.Key,
                        TotalQuantity = g.Sum(oi => oi.Quantity),
                        OrderCount = g.Count()
                    })
                    .OrderByDescending(x => x.TotalQuantity)
                    .ThenByDescending(x => x.OrderCount)
                    .Take(count)
                    .ToList();

                if (!productSales.Any())
                {
                    return new List<Product>();
                }

                var productIds = productSales.Select(ps => ps.ProductId).ToList();
                var products = await _productRepo.GetByIdsAsync(productIds);

                var orderedProducts = productSales
                    .Join(products,
                        ps => ps.ProductId,
                        p => p.Id,
                        (ps, p) => p)
                    .Where(p => p.Stock > 0)
                    .ToList();

                return orderedProducts;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating best-selling products");
                return new List<Product>();
            }
        }
    }
}