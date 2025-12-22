using SmartGrocery.Application.DTOs.Products;
using SmartGrocery.Application.Exceptions;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using System.Linq;

namespace SmartGrocery.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepo;
        private readonly ICategoryRepository _categoryRepo;

        public ProductService(IProductRepository productRepo, ICategoryRepository categoryRepo)
        {
            _productRepo = productRepo;
            _categoryRepo = categoryRepo;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var products = await _productRepo.GetAllAsync();

            return products.Select(MapToDto);
        }

        public async Task<ProductDto> GetProductByIdAsync(Guid id)
        {
            var p = await _productRepo.GetByIdAsync(id);
            if (p == null)
                throw new NotFoundException("Product not found.");

            return MapToDto(p);
        }

        public async Task<ProductDto> CreateProductAsync(ProductDto dto)
        {
            await EnsureCategoryExists(dto.CategoryId);

            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                ImageUrl = dto.ImageUrl,
                CategoryId = dto.CategoryId,
                Stock = dto.Stock
            };

            var created = await _productRepo.AddAsync(product);

            return MapToDto(created);
        }

        public async Task<ProductDto> UpdateProductAsync(Guid id, ProductDto dto)
        {
            await EnsureCategoryExists(dto.CategoryId);

            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
                throw new NotFoundException("Product not found.");

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.ImageUrl = dto.ImageUrl;
            product.CategoryId = dto.CategoryId;
            product.Stock = dto.Stock;

            await _productRepo.UpdateAsync(product);

            return MapToDto(product);
        }

        public async Task<bool> DeleteProductAsync(Guid id)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
                throw new NotFoundException("Product not found.");

            await _productRepo.DeleteAsync(product);
            return true;
        }

        private async Task EnsureCategoryExists(Guid categoryId)
        {
            var category = await _categoryRepo.GetByIdAsync(categoryId);
            if (category == null)
                throw new ValidationException("Invalid category.");
        }

        private static ProductDto MapToDto(Product product) =>
            new()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                CategoryId = product.CategoryId,
                Stock = product.Stock,
                CreatedAt = product.CreatedAt
            };
    }
}
