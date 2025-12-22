

// SmartGrocery.Application/Services/CartService.cs
using SmartGrocery.Application.DTOs.Cart;
using SmartGrocery.Application.Exceptions;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using System.Linq;

namespace SmartGrocery.Application.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepo;
        private readonly IProductRepository _productRepo;

        public CartService(ICartRepository cartRepo, IProductRepository productRepo)
        {
            _cartRepo = cartRepo;
            _productRepo = productRepo;
        }

        public async Task<IEnumerable<CartItemDto>> GetUserCartAsync(Guid userId)
        {
            var items = await _cartRepo.GetUserCartAsync(userId);
            return items.Select(item => MapToDto(item));
        }

        public async Task<CartItemDto> AddToCartAsync(Guid userId, Guid productId, int qty)
        {
            if (qty <= 0)
                throw new ValidationException("Quantity must be greater than zero.");

            var product = await _productRepo.GetByIdAsync(productId);
            if (product == null)
                throw new NotFoundException("Product not found.");

            var existingItem = await _cartRepo.GetCartItemAsync(userId, productId);

            if (existingItem != null)
            {
                existingItem.Quantity += qty;
                await _cartRepo.UpdateAsync(existingItem);
                return MapToDto(existingItem, product);
            }

            var newItem = new CartItem
            {
                UserId = userId,
                ProductId = productId,
                Quantity = qty
            };

            var created = await _cartRepo.AddAsync(newItem);
            return MapToDto(created, product);
        }

        public async Task<CartItemDto> UpdateCartItemAsync(Guid cartItemId, int quantity)
        {
            if (quantity <= 0)
                throw new ValidationException("Quantity must be greater than zero.");

            var cartItem = await _cartRepo.GetByIdAsync(cartItemId);
            if (cartItem == null)
                throw new NotFoundException("Cart item not found.");

            cartItem.Quantity = quantity;
            await _cartRepo.UpdateAsync(cartItem);

            var product = cartItem.Product ?? await _productRepo.GetByIdAsync(cartItem.ProductId)
                ?? throw new NotFoundException("Product not found.");

            return MapToDto(cartItem, product);
        }

        public async Task<bool> RemoveCartItemAsync(Guid cartItemId)
        {
            var cartItem = await _cartRepo.GetByIdAsync(cartItemId);
            if (cartItem == null)
                return false;

            await _cartRepo.DeleteAsync(cartItem);
            return true;
        }

        public async Task<bool> ClearCartAsync(Guid userId)
        {
            await _cartRepo.ClearCartAsync(userId);
            return true;
        }

        // ---- NEW: Update by userId + productId ----
        public async Task<CartItemDto> UpdateCartItemAsync(Guid userId, Guid productId, int quantity)
        {
            if (quantity <= 0)
                throw new ValidationException("Quantity must be greater than zero.");

            var cartItem = await _cartRepo.GetCartItemAsync(userId, productId);
            if (cartItem == null)
                throw new NotFoundException("Cart item not found.");

            cartItem.Quantity = quantity;
            await _cartRepo.UpdateAsync(cartItem);

            var product = cartItem.Product ?? await _productRepo.GetByIdAsync(productId)
                ?? throw new NotFoundException("Product not found.");

            return MapToDto(cartItem, product);
        }

        // ---- NEW: Remove by userId + productId ----
        public async Task RemoveItemByProductAsync(Guid userId, Guid productId)
        {
            var cartItem = await _cartRepo.GetCartItemAsync(userId, productId);
            if (cartItem == null)
                return;

            await _cartRepo.DeleteAsync(cartItem);
        }

        private static CartItemDto MapToDto(CartItem item, Product? productOverride = null)
        {
            var product = productOverride ?? item.Product;

            return new CartItemDto
            {
                Id = item.Id,
                ProductId = item.ProductId,
                ProductName = product?.Name ?? string.Empty,
                ProductImage = product?.ImageUrl ?? string.Empty,
                Quantity = item.Quantity,
                UnitPrice = product?.Price ?? 0
            };
        }
    }
}
