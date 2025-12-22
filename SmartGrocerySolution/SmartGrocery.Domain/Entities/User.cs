

using SmartGrocery.Domain.Common;
using SmartGrocery.Domain.Enums;

namespace SmartGrocery.Domain.Entities
{
    public class User : BaseEntity
    {
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }

        public UserRole Role { get; set; } = UserRole.User;

        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
