// using Microsoft.EntityFrameworkCore;
// using SmartGrocery.Application.Interfaces.Repository;
// using SmartGrocery.Domain.Entities;
// using SmartGrocery.Infrastructure.Persistence;
// using System.Linq;

// namespace SmartGrocery.Infrastructure.Repositories
// {
//     public class OrderRepository : GenericRepository<Order>, IOrderRepository
//     {
//         public OrderRepository(GroceryDbContext context) : base(context)
//         {
//         }

//         public async Task<IEnumerable<Order>> GetOrdersByUserAsync(Guid userId)
//         {
//             return await _dbSet
//                 .Include(o => o.OrderItems!)
//                 .ThenInclude(oi => oi.Product)
//                 .Where(o => o.UserId == userId)
//                 .OrderByDescending(o => o.CreatedAt)
//                 .ToListAsync();
//         }

//         public async Task<Order?> GetOrderWithItemsAsync(Guid orderId)
//         {
//             return await _dbSet
//                 .Include(o => o.OrderItems!)
//                 .ThenInclude(oi => oi.Product)
//                 .FirstOrDefaultAsync(o => o.Id == orderId);
//         }

//         public async Task<OrderItem> AddOrderItemAsync(OrderItem orderItem)
//         {
//             await _context.OrderItems.AddAsync(orderItem);
//             await _context.SaveChangesAsync();
//             return orderItem;
//         }
//     }
// }


// using Microsoft.EntityFrameworkCore;
// using SmartGrocery.Application.Interfaces.Repository;
// using SmartGrocery.Domain.Entities;
// using SmartGrocery.Infrastructure.Persistence;
// using System.Linq;

// namespace SmartGrocery.Infrastructure.Repositories
// {
//     public class OrderRepository : GenericRepository<Order>, IOrderRepository
//     {
//         public OrderRepository(GroceryDbContext context) : base(context)
//         {
//         }

//         // ✅ Changed method name to match interface
//         public async Task<IEnumerable<Order>> GetUserOrdersAsync(Guid userId)
//         {
//             return await _dbSet
//                   .Include(o => o.User)
//         .Include(o => o.OrderItems!)
//             .ThenInclude(oi => oi.Product!)
//                 .ThenInclude(p => p.Category)
//         .Where(o => o.UserId == userId)
//         .OrderByDescending(o => o.CreatedAt)
//         .ToListAsync();
//         }

//         // ✅ Changed method name to match interface
//         public async Task<Order?> GetByIdWithItemsAsync(Guid orderId)
//         {
//             return await _dbSet
//                 .Include(o => o.User)
//         .Include(o => o.OrderItems!)
//             .ThenInclude(oi => oi.Product!)
//                 .ThenInclude(p => p.Category)
//         .FirstOrDefaultAsync(o => o.Id == orderId);

//         }


//         // For GetAllOrdersAsync - modify GetAllAsync or create a new method:
//         public async Task<IEnumerable<Order>> GetAllAsync()
//         {
//             return await _dbSet
//                 .Include(o => o.User)
//                 .Include(o => o.OrderItems!)
//                     .ThenInclude(oi => oi.Product!)
//                         .ThenInclude(p => p.Category)
//                 .OrderByDescending(o => o.CreatedAt)
//                 .ToListAsync();


//         }
//         public async Task<OrderItem> AddOrderItemAsync(OrderItem orderItem)
//         {
//             await _context.OrderItems.AddAsync(orderItem);
//             await _context.SaveChangesAsync();
//             return orderItem;
//         }
//     }
// }

using Microsoft.EntityFrameworkCore;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using SmartGrocery.Infrastructure.Persistence;
using System.Linq;

namespace SmartGrocery.Infrastructure.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(GroceryDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Order>> GetUserOrdersAsync(Guid userId)
        {
            return await _dbSet
                .Include(o => o.User)
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.Product!)
                        .ThenInclude(p => p.Category)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();
        }

        public async Task<Order?> GetByIdWithItemsAsync(Guid orderId)
        {
            return await _dbSet
                .Include(o => o.User)
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.Product!)
                        .ThenInclude(p => p.Category)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        // ✅ Renamed to avoid hiding base method
        public async Task<IEnumerable<Order>> GetAllWithDetailsAsync()
        {
            return await _dbSet
                .Include(o => o.User)
                .Include(o => o.OrderItems!)
                    .ThenInclude(oi => oi.Product!)
                        .ThenInclude(p => p.Category)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();
        }

        public async Task<OrderItem> AddOrderItemAsync(OrderItem orderItem)
        {
            await _context.OrderItems.AddAsync(orderItem);
            await _context.SaveChangesAsync();
            return orderItem;
        }
    }
}