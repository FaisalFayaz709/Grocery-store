using Microsoft.EntityFrameworkCore;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using SmartGrocery.Infrastructure.Persistence;

namespace SmartGrocery.Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(GroceryDbContext context) : base(context)
        {
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
