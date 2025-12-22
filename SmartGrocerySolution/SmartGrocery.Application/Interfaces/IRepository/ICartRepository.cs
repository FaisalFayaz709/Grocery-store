using SmartGrocery.Domain.Entities;

namespace SmartGrocery.Application.Interfaces.Repository
{
    public interface ICartRepository : IGenericRepository<CartItem>
    {
        Task<IEnumerable<CartItem>> GetUserCartAsync(Guid userId);
        Task<CartItem?> GetCartItemAsync(Guid userId, Guid productId);
        Task ClearCartAsync(Guid userId);
    }
}






