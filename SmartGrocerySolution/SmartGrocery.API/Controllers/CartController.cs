using Microsoft.AspNetCore.Mvc;
using SmartGrocery.Application.DTOs.Cart;
using SmartGrocery.Application.DTOs.Users;
using SmartGrocery.Application.Interfaces;

namespace SmartGrocery.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var user = HttpContext.Items["User"] as UserDto;
            if (user == null) return Unauthorized();

            return Ok(await _cartService.GetUserCartAsync(user.Id));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddItem([FromBody] CartItemDto item)
        {
            var user = HttpContext.Items["User"] as UserDto;
            if (user == null) return Unauthorized();

            var result = await _cartService.AddToCartAsync(user.Id, item.ProductId, item.Quantity);
            return Ok(result);
        }

        // [HttpPut("{cartItemId}")]
        // public async Task<IActionResult> UpdateItem(Guid cartItemId, [FromBody] CartItemDto item)
        // {
        //     var user = HttpContext.Items["User"] as UserDto;
        //     if (user == null) return Unauthorized();

        //     var updated = await _cartService.UpdateCartItemAsync(cartItemId, item.Quantity);
        //     return Ok(updated);
        // }

               // FIXED: Update by PRODUCT ID not CartItemId
        [HttpPut("update/{productId}")]
        public async Task<IActionResult> UpdateItem(Guid productId, [FromBody] CartItemDto item)
        {
            var user = HttpContext.Items["User"] as UserDto;
            if (user == null) return Unauthorized();

            var updated = await _cartService.UpdateCartItemAsync(user.Id, productId, item.Quantity);
            return Ok(updated);
        }

        // [HttpDelete("{cartItemId}")]
        // public async Task<IActionResult> RemoveItem(Guid cartItemId)
        // {
        //     var user = HttpContext.Items["User"] as UserDto;
        //     if (user == null) return Unauthorized();

        //     await _cartService.RemoveCartItemAsync(cartItemId);
        //     return NoContent();
        // }

                // FIXED: Remove by PRODUCT ID not CartItemId
        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> RemoveItem(Guid productId)
        {
            var user = HttpContext.Items["User"] as UserDto;
            if (user == null) return Unauthorized();

            await _cartService.RemoveItemByProductAsync(user.Id, productId);
            return NoContent();
        }


        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var user = HttpContext.Items["User"] as UserDto;
            if (user == null) return Unauthorized();

            await _cartService.ClearCartAsync(user.Id);
            return NoContent();
        }
    }
}
