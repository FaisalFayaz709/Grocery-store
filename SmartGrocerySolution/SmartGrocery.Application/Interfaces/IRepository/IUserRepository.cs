using SmartGrocery.Domain.Entities;

namespace SmartGrocery.Application.Interfaces.Repository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
    }
}
