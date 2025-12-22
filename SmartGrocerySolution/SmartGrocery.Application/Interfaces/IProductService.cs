using SmartGrocery.Application.DTOs.Products;

namespace SmartGrocery.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> GetProductByIdAsync(Guid id);
        Task<ProductDto> CreateProductAsync(ProductDto dto);
        Task<ProductDto> UpdateProductAsync(Guid id, ProductDto dto);
        Task<bool> DeleteProductAsync(Guid id);
    }
}
