using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartGrocery.Domain.Entities;

namespace SmartGrocery.Infrastructure.Persistence.Configurations
{
    public class CartItemConfig : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Quantity)
                .IsRequired()
                .HasDefaultValue(1);

            builder.HasIndex(c => new { c.UserId, c.ProductId })
                .IsUnique();
        }
    }
}
