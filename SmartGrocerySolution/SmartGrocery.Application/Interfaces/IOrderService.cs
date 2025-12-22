using SmartGrocery.Application.DTOs.Orders;

namespace SmartGrocery.Application.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto dto);
        Task<IEnumerable<OrderDto>> GetUserOrdersAsync(Guid userId);
        Task<OrderDto> GetOrderByIdAsync(Guid orderId);
        Task UpdateOrderStatusAsync(Guid orderId, string status);
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync(); // For admin
    }
}

