using SmartGrocery.Domain.Entities;
using SmartGrocery.Domain.Enums;  // <-- Add this
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SmartGrocery.Infrastructure.Persistence.Configurations
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.FullName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(120);

            builder.HasIndex(u => u.Email)
                .IsUnique();

            builder.Property(u => u.PasswordHash)
                .IsRequired();

      
            // ✅ Convert enum to string and set default
            builder.Property(u => u.Role)
                .HasConversion<string>()
                .HasDefaultValue(UserRole.User)
                .IsRequired();

            builder.Property(u => u.CreatedAt)
                .HasDefaultValueSql("NOW()");

            // Relationships
            builder.HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId);

            builder.HasMany(u => u.CartItems)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);
        }
    }
}
