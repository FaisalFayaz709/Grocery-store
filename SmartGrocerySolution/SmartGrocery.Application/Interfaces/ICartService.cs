using SmartGrocery.Application.DTOs.Cart;

namespace SmartGrocery.Application.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<CartItemDto>> GetUserCartAsync(Guid userId);

        Task<CartItemDto> AddToCartAsync(Guid userId, Guid productId, int quantity);

        Task<CartItemDto> UpdateCartItemAsync(Guid cartItemId, int quantity);

        Task<bool> RemoveCartItemAsync(Guid cartItemId);

        Task<bool> ClearCartAsync(Guid userId);

        Task<CartItemDto> UpdateCartItemAsync(Guid userId, Guid productId, int quantity);
Task RemoveItemByProductAsync(Guid userId, Guid productId);

    }
}
