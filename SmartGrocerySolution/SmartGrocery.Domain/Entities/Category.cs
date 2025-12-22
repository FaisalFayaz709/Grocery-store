// using SmartGrocery.Domain.Common;

// namespace SmartGrocery.Domain.Entities
// {
//     public class Category : BaseEntity
//     {
//         public string Name { get; set; } = string.Empty;
//         public ICollection<Product>? Products { get; set; }
//     }
// }


using SmartGrocery.Domain.Common;

namespace SmartGrocery.Domain.Entities
{
    public class Category : BaseEntity
    {
        public required string Name { get; set; }

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
