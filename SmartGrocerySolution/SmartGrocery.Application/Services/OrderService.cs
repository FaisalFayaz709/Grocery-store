
// using SmartGrocery.Application.DTOs.Orders;
// using SmartGrocery.Application.Exceptions;
// using SmartGrocery.Application.Interfaces;
// using SmartGrocery.Application.Interfaces.Repository;
// using SmartGrocery.Domain.Entities;
// using SmartGrocery.Domain.Enums;
// using System.Linq;

// namespace SmartGrocery.Application.Services
// {
//     public class OrderService : IOrderService
//     {
//         private readonly IOrderRepository _orderRepo;
//         private readonly ICartRepository _cartRepo;
//         private readonly IProductRepository _productRepo;

//         public OrderService(
//             IOrderRepository orderRepo,
//             ICartRepository cartRepo,
//             IProductRepository productRepo)
//         {
//             _orderRepo = orderRepo;
//             _cartRepo = cartRepo;
//             _productRepo = productRepo;
//         }

//         public async Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto dto)
//         {
//             // Get user's cart items
//             var cartItems = await _cartRepo.GetUserCartAsync(userId);
            
//             if (!cartItems.Any())
//                 throw new ValidationException("Cart is empty");

//             // Calculate total
//             decimal totalAmount = 0;
//             var orderItems = new List<OrderItem>();

//             foreach (var cartItem in cartItems)
//             {
//                 var product = cartItem.Product ?? await _productRepo.GetByIdAsync(cartItem.ProductId);
                
//                 if (product == null)
//                     throw new NotFoundException($"Product not found: {cartItem.ProductId}");

//                 if (product.Stock < cartItem.Quantity)
//                     throw new ValidationException($"Insufficient stock for {product.Name}");

//                 // Create order item
//                 var orderItem = new OrderItem
//                 {
//                     ProductId = product.Id,
//                     Quantity = cartItem.Quantity,
//                     UnitPrice = product.Price
//                 };

//                 orderItems.Add(orderItem);
//                 totalAmount += product.Price * cartItem.Quantity;

//                 // Reduce stock
//                 product.Stock -= cartItem.Quantity;
//                 await _productRepo.UpdateAsync(product);
//             }

//             // Create order
//             var order = new Order
//             {
//                 UserId = userId,
//                 TotalAmount = totalAmount,
//                 Status = OrderStatus.Pending,
//                 OrderItems = orderItems
//             };

//             var createdOrder = await _orderRepo.AddAsync(order);

//             // Clear cart
//             await _cartRepo.ClearCartAsync(userId);

//             return MapToDto(createdOrder);
//         }

//         public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(Guid userId)
//         {
//             var orders = await _orderRepo.GetUserOrdersAsync(userId);
//             return orders.Select(MapToDto);
//         }

//         public async Task<OrderDto> GetOrderByIdAsync(Guid orderId)
//         {
//             var order = await _orderRepo.GetByIdWithItemsAsync(orderId);
//             if (order == null)
//                 throw new NotFoundException("Order not found");

//             return MapToDto(order);
//         }

//         public async Task UpdateOrderStatusAsync(Guid orderId, string status)
//         {
//             var order = await _orderRepo.GetByIdAsync(orderId);
//             if (order == null)
//                 throw new NotFoundException("Order not found");

//             if (Enum.TryParse<OrderStatus>(status, out var orderStatus))
//             {
//                 order.Status = orderStatus;
//                 await _orderRepo.UpdateAsync(order);
//             }
//             else
//             {
//                 throw new ValidationException("Invalid status");
//             }
//         }

//         public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
//         {
//             var orders = await _orderRepo.GetAllAsync();
//             return orders.Select(MapToDto);
//         }

//         private static OrderDto MapToDto(Order order)
//         {
//             return new OrderDto
//             {
//                 Id = order.Id,
//                 UserId = order.UserId,
//                 TotalAmount = order.TotalAmount,
//                 Status = order.Status.ToString(),
//                 CreatedAt = order.CreatedAt,
//                 Items = order.OrderItems?.Select(oi => new OrderItemDto
//                 {
//                     Id = oi.Id,
//                     ProductId = oi.ProductId,
//                     ProductName = oi.Product?.Name ?? string.Empty,
//                     ProductImage = oi.Product?.ImageUrl ?? string.Empty,
//                     Quantity = oi.Quantity,
//                     UnitPrice = oi.UnitPrice
//                 }).ToList() ?? new List<OrderItemDto>()
//             };
//         }
//     }
// }


// using SmartGrocery.Application.DTOs.Orders;
// using SmartGrocery.Application.Exceptions;
// using SmartGrocery.Application.Interfaces;
// using SmartGrocery.Application.Interfaces.Repository;
// using SmartGrocery.Domain.Entities;
// using SmartGrocery.Domain.Enums;
// using System.Linq;

// namespace SmartGrocery.Application.Services
// {
//     public class OrderService : IOrderService
//     {
//         private readonly IOrderRepository _orderRepo;
//         private readonly ICartRepository _cartRepo;
//         private readonly IProductRepository _productRepo;
//         private readonly IUserRepository _userRepo;

//         public OrderService(
//             IOrderRepository orderRepo,
//             ICartRepository cartRepo,
//             IProductRepository productRepo,
//             IUserRepository userRepo)
//         {
//             _orderRepo = orderRepo;
//             _cartRepo = cartRepo;
//             _productRepo = productRepo;
//             _userRepo = userRepo;
//         }

//         public async Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto dto)
//         {
//             // Get user's cart items
//             var cartItems = await _cartRepo.GetUserCartAsync(userId);
            
//             if (!cartItems.Any())
//                 throw new ValidationException("Cart is empty");

//             // Calculate total
//             decimal totalAmount = 0;
//             var orderItems = new List<OrderItem>();

//             foreach (var cartItem in cartItems)
//             {
//                 var product = cartItem.Product ?? await _productRepo.GetByIdAsync(cartItem.ProductId);
                
//                 if (product == null)
//                     throw new NotFoundException($"Product not found: {cartItem.ProductId}");

//                 if (product.Stock < cartItem.Quantity)
//                     throw new ValidationException($"Insufficient stock for {product.Name}");

//                 // Create order item
//                 var orderItem = new OrderItem
//                 {
//                     ProductId = product.Id,
//                     Quantity = cartItem.Quantity,
//                     UnitPrice = product.Price
//                 };

//                 orderItems.Add(orderItem);
//                 totalAmount += product.Price * cartItem.Quantity;

//                 // Reduce stock
//                 product.Stock -= cartItem.Quantity;
//                 await _productRepo.UpdateAsync(product);
//             }

//             // Create order with delivery information
//             var order = new Order
//             {
//                 UserId = userId,
//                 TotalAmount = totalAmount,
//                 Status = OrderStatus.Pending,
//                 DeliveryAddress = dto.DeliveryAddress,
//                 City = dto.City,
//                 PostalCode = dto.PostalCode,
//                 Phone = dto.Phone,
//                 PaymentMethod = dto.PaymentMethod,
//                 CreatedAt = DateTime.UtcNow,
//                 UpdatedAt = DateTime.UtcNow,
//                 OrderItems = orderItems
//             };

//             var createdOrder = await _orderRepo.AddAsync(order);

//             // Clear cart
//             await _cartRepo.ClearCartAsync(userId);

//             // Get user for response
//             var user = await _userRepo.GetByIdAsync(userId);
//             return await MapToDtoAsync(createdOrder, user);
//         }

//         public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(Guid userId)
//         {
//             var orders = await _orderRepo.GetUserOrdersAsync(userId);
//             var user = await _userRepo.GetByIdAsync(userId);
            
//             var orderDtos = new List<OrderDto>();
//             foreach (var order in orders)
//             {
//                 orderDtos.Add(await MapToDtoAsync(order, user));
//             }
            
//             return orderDtos;
//         }

//         public async Task<OrderDto> GetOrderByIdAsync(Guid orderId)
//         {
//             var order = await _orderRepo.GetByIdWithItemsAsync(orderId);
//             if (order == null)
//                 throw new NotFoundException("Order not found");

//             var user = await _userRepo.GetByIdAsync(order.UserId);
//             return await MapToDtoAsync(order, user);
//         }

//         public async Task UpdateOrderStatusAsync(Guid orderId, string status)
//         {
//             var order = await _orderRepo.GetByIdAsync(orderId);
//             if (order == null)
//                 throw new NotFoundException("Order not found");

//             if (Enum.TryParse<OrderStatus>(status, out var orderStatus))
//             {
//                 order.Status = orderStatus;
//                 order.UpdatedAt = DateTime.UtcNow;
//                 await _orderRepo.UpdateAsync(order);
//             }
//             else
//             {
//                 throw new ValidationException("Invalid status");
//             }
//         }

//         public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
//         {
//             var orders = await _orderRepo.GetAllAsync();
            
//             var orderDtos = new List<OrderDto>();
//             foreach (var order in orders)
//             {
//                 var user = await _userRepo.GetByIdAsync(order.UserId);
//                 orderDtos.Add(await MapToDtoAsync(order, user));
//             }
            
//             return orderDtos;
//         }

//         private async Task<OrderDto> MapToDtoAsync(Order order, User? user)
//         {
//             return new OrderDto
//             {
//                 Id = order.Id,
//                 UserId = order.UserId,
                
//                 // User Information
//                 UserName = user?.Name ?? "Unknown User",
//                 UserEmail = user?.Email ?? "",
//                 UserPhone = user?.Phone ?? "",
                
//                 // Order Details
//                 TotalAmount = order.TotalAmount,
//                 Status = order.Status.ToString(),
                
//                 // Delivery Information
//                 DeliveryAddress = order.DeliveryAddress,
//                 City = order.City,
//                 PostalCode = order.PostalCode,
//                 Phone = order.Phone,
//                 PaymentMethod = order.PaymentMethod,
                
//                 CreatedAt = order.CreatedAt,
//                 UpdatedAt = order.UpdatedAt,
                
//                 // Order Items with full product details
//                 OrderItems = order.OrderItems?.Select(oi => new OrderItemDto
//                 {
//                     Id = oi.Id,
//                     ProductId = oi.ProductId,
//                     ProductName = oi.Product?.Name ?? "Unknown Product",
//                     ProductImage = oi.Product?.ImageUrl ?? "",
//                     ProductDescription = oi.Product?.Description ?? "",
//                     CategoryName = oi.Product?.Category?.Name ?? "",
//                     Quantity = oi.Quantity,
//                     Price = oi.UnitPrice
//                 }).ToList() ?? new List<OrderItemDto>()
//             };
//         }
//     }
// }


using SmartGrocery.Application.DTOs.Orders;
using SmartGrocery.Application.Exceptions;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;
using SmartGrocery.Domain.Enums;
using System.Linq;

namespace SmartGrocery.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepo;
        private readonly ICartRepository _cartRepo;
        private readonly IProductRepository _productRepo;
        private readonly IUserRepository _userRepo;

        public OrderService(
            IOrderRepository orderRepo,
            ICartRepository cartRepo,
            IProductRepository productRepo,
            IUserRepository userRepo)
        {
            _orderRepo = orderRepo;
            _cartRepo = cartRepo;
            _productRepo = productRepo;
            _userRepo = userRepo;
        }

        public async Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto dto)
        {
            // Get user's cart items
            var cartItems = await _cartRepo.GetUserCartAsync(userId);
            
            if (!cartItems.Any())
                throw new ValidationException("Cart is empty");

            // Calculate total
            decimal totalAmount = 0;
            var orderItems = new List<OrderItem>();

            foreach (var cartItem in cartItems)
            {
                var product = cartItem.Product ?? await _productRepo.GetByIdAsync(cartItem.ProductId);
                
                if (product == null)
                    throw new NotFoundException($"Product not found: {cartItem.ProductId}");

                if (product.Stock < cartItem.Quantity)
                    throw new ValidationException($"Insufficient stock for {product.Name}");

                // Create order item
                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = cartItem.Quantity,
                    UnitPrice = product.Price
                };

                orderItems.Add(orderItem);
                totalAmount += product.Price * cartItem.Quantity;

                // Reduce stock
                product.Stock -= cartItem.Quantity;
                await _productRepo.UpdateAsync(product);
            }

            // Create order with delivery information
            var order = new Order
            {
                UserId = userId,
                TotalAmount = totalAmount,
                Status = OrderStatus.Pending,
                DeliveryAddress = dto.DeliveryAddress,
                City = dto.City,
                PostalCode = dto.PostalCode,
                Phone = dto.Phone,
                PaymentMethod = dto.PaymentMethod,
                UpdatedAt = DateTime.UtcNow,
                OrderItems = orderItems
            };

            var createdOrder = await _orderRepo.AddAsync(order);

            // Clear cart
            await _cartRepo.ClearCartAsync(userId);

            // Get user for response
            var user = await _userRepo.GetByIdAsync(userId);
            return MapToDto(createdOrder, user);
        }

        public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(Guid userId)
        {
            var orders = await _orderRepo.GetUserOrdersAsync(userId);
            var user = await _userRepo.GetByIdAsync(userId);
            
            var orderDtos = new List<OrderDto>();
            foreach (var order in orders)
            {
                orderDtos.Add(MapToDto(order, user));
            }
            
            return orderDtos;
        }

        public async Task<OrderDto> GetOrderByIdAsync(Guid orderId)
        {
            var order = await _orderRepo.GetByIdWithItemsAsync(orderId);
            if (order == null)
                throw new NotFoundException("Order not found");

            var user = await _userRepo.GetByIdAsync(order.UserId);
            return MapToDto(order, user);
        }

        public async Task UpdateOrderStatusAsync(Guid orderId, string status)
        {
            var order = await _orderRepo.GetByIdAsync(orderId);
            if (order == null)
                throw new NotFoundException("Order not found");

            if (Enum.TryParse<OrderStatus>(status, out var orderStatus))
            {
                order.Status = orderStatus;
                order.UpdatedAt = DateTime.UtcNow;
                await _orderRepo.UpdateAsync(order);
            }
            else
            {
                throw new ValidationException("Invalid status");
            }
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _orderRepo.GetAllAsync();
            
            var orderDtos = new List<OrderDto>();
            foreach (var order in orders)
            {
                var user = await _userRepo.GetByIdAsync(order.UserId);
                orderDtos.Add(MapToDto(order, user));
            }
            
            return orderDtos;
        }

        // ✅ Changed to synchronous - no need for async
        private static OrderDto MapToDto(Order order, User? user)
        {
            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                
                // User Information - ✅ Changed Name to FullName
                UserName = user?.FullName ?? "Unknown User",
                UserEmail = user?.Email ?? "",
                // UserPhone = user?.Phone ?? "",
                
                // Order Details
                TotalAmount = order.TotalAmount,
                Status = order.Status.ToString(),
                
                // Delivery Information
                DeliveryAddress = order.DeliveryAddress,
                City = order.City,
                PostalCode = order.PostalCode,
                Phone = order.Phone,
                PaymentMethod = order.PaymentMethod,
                
                CreatedAt = order.CreatedAt,
                UpdatedAt = order.UpdatedAt,
                
                // Order Items with full product details
                OrderItems = order.OrderItems?.Select(oi => new OrderItemDto
                {
                    Id = oi.Id,
                    ProductId = oi.ProductId,
                    ProductName = oi.Product?.Name ?? "Unknown Product",
                    ProductImage = oi.Product?.ImageUrl ?? "",
                    ProductDescription = oi.Product?.Description ?? "",
                    CategoryName = oi.Product?.Category?.Name ?? "",
                    Quantity = oi.Quantity,
                    Price = oi.UnitPrice
                }).ToList() ?? new List<OrderItemDto>()
            };
        }
    }
}