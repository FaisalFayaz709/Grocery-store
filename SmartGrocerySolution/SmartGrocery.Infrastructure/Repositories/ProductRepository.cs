using Microsoft.EntityFrameworkCore;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using SmartGrocery.Infrastructure.Persistence;

namespace SmartGrocery.Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(GroceryDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId)
        {
            return await _dbSet
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();
        }

        // ADD THIS
        public async Task<IEnumerable<Product>> GetByIdsAsync(IEnumerable<Guid> ids)
        {
            return await _dbSet
                .Where(p => ids.Contains(p.Id))
                .ToListAsync();
        }
    }
}
