using Microsoft.EntityFrameworkCore;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using SmartGrocery.Infrastructure.Persistence;
using System.Linq;

namespace SmartGrocery.Infrastructure.Repositories
{
    public class CartRepository : GenericRepository<CartItem>, ICartRepository
    {
        public CartRepository(GroceryDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<CartItem>> GetUserCartAsync(Guid userId)
        {
            return await _dbSet
                .Include(ci => ci.Product)
                .Where(ci => ci.UserId == userId)
                .ToListAsync();
        }

        public async Task<CartItem?> GetCartItemAsync(Guid userId, Guid productId)
        {
            return await _dbSet
                .Include(ci => ci.Product)
                .FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == productId);
        }

        public async Task ClearCartAsync(Guid userId)
        {
            var items = _dbSet.Where(ci => ci.UserId == userId);
            _dbSet.RemoveRange(items);
            await _context.SaveChangesAsync();
        }
    }
}

