// using SmartGrocery.Domain.Entities;

// namespace SmartGrocery.Application.Interfaces.Repository
// {
//     public interface IOrderRepository : IGenericRepository<Order>
//     {
//         Task<IEnumerable<Order>> GetOrdersByUserAsync(Guid userId);
//         Task<Order?> GetOrderWithItemsAsync(Guid orderId);
//         Task<OrderItem> AddOrderItemAsync(OrderItem orderItem);
//     }
// }

using SmartGrocery.Domain.Entities;

namespace SmartGrocery.Application.Interfaces.Repository
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IEnumerable<Order>> GetUserOrdersAsync(Guid userId);
        Task<Order?> GetByIdWithItemsAsync(Guid orderId);

        Task<IEnumerable<Order>> GetAllWithDetailsAsync(); // ✅ Add this
        Task<OrderItem> AddOrderItemAsync(OrderItem orderItem); 
    }
}