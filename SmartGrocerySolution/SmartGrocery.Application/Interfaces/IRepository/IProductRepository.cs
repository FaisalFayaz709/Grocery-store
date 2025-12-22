using SmartGrocery.Domain.Entities;

namespace SmartGrocery.Application.Interfaces.Repository
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId);
        Task<IEnumerable<Product>> GetByIdsAsync(IEnumerable<Guid> ids);
    }
}
