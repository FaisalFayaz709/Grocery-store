using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using SmartGrocery.Infrastructure.Persistence;

namespace SmartGrocery.Infrastructure.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(GroceryDbContext context) : base(context)
        {
        }
    }
}







