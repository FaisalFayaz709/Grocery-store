using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartGrocery.Domain.Entities;
using SmartGrocery.Domain.Enums;

namespace SmartGrocery.Infrastructure.Persistence.Configurations
{
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.Id);

            builder.Property(o => o.TotalAmount)
                .HasColumnType("decimal(10,2)");

     
            builder.Property(o => o.Status)
                .HasConversion<string>()   // Store enum as string
                .HasDefaultValue(OrderStatus.Pending)  // ✅ Use enum value, not string
                .IsRequired();

            builder.Property(o => o.CreatedAt)
                .HasDefaultValueSql("NOW()");

            builder.HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId);
        }
    }
}
