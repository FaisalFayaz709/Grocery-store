
using Microsoft.AspNetCore.Mvc;
using SmartGrocery.Application.DTOs.Orders;
using SmartGrocery.Application.DTOs.Users;
using SmartGrocery.Application.Interfaces;

namespace SmartGrocery.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(
            IOrderService orderService,
            ILogger<OrdersController> logger)
        {
            _orderService = orderService;
            _logger = logger;
        }

        // Get user's orders
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            try
            {
                var user = HttpContext.Items["User"] as UserDto;
                if (user == null) return Unauthorized();

                var orders = await _orderService.GetUserOrdersAsync(user.Id);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching orders");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // Create order (checkout)
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] CreateOrderDto dto)
        {
            try
            {
                var user = HttpContext.Items["User"] as UserDto;
                if (user == null) return Unauthorized();

                var order = await _orderService.CreateOrderAsync(user.Id, dto);
                return Ok(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating order");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // ✅ MOVED UP - Get all orders (Admin only) - MUST BE BEFORE {orderId} route
        [HttpGet("admin/all")]
        public async Task<IActionResult> GetAllOrders()
        {
            _logger.LogInformation("GetAllOrders endpoint hit");
            try
            {
                var user = HttpContext.Items["User"] as UserDto;
                _logger.LogInformation($"User: {user?.Email}, Role: {user?.Role}");

                if (user == null || user.Role != "Admin")
                    return Unauthorized(new { error = "Admin access required" });

                var orders = await _orderService.GetAllOrdersAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all orders");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // Get single order details - NOW THIS IS AFTER admin/all
        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById(Guid orderId)
        {
            try
            {
                var order = await _orderService.GetOrderByIdAsync(orderId);
                return Ok(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching order");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // Update order status (Admin only)
        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(
            Guid orderId,
            [FromBody] UpdateOrderStatusDto dto)
        {
            try
            {
                var user = HttpContext.Items["User"] as UserDto;
                if (user == null || user.Role != "Admin")
                    return Unauthorized(new { error = "Admin access required" });

                await _orderService.UpdateOrderStatusAsync(orderId, dto.Status);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating order status");
                return StatusCode(500, new { error = ex.Message });
            }
        }


        // Add this method to OrdersController.cs

        [HttpPut("{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder(Guid orderId)
        {
            try
            {
                var user = HttpContext.Items["User"] as UserDto;
                if (user == null) return Unauthorized();

                var order = await _orderService.GetOrderByIdAsync(orderId);

                // Check if user owns this order
                if (order.UserId != user.Id && user.Role != "Admin")
                    return Unauthorized(new { error = "You can only cancel your own orders" });

                // Check if order can be cancelled (only Pending orders)
                if (order.Status != "Pending")
                    return BadRequest(new { error = "Only pending orders can be cancelled" });

                await _orderService.UpdateOrderStatusAsync(orderId, "Cancelled");
                return Ok(new { message = "Order cancelled successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error cancelling order");
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}