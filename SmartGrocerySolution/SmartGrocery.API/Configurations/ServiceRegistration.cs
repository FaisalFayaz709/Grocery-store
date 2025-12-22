using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Application.Interfaces.Security;
using SmartGrocery.Application.Services;
using SmartGrocery.Infrastructure.Persistence;
using SmartGrocery.Infrastructure.Repositories;
using SmartGrocery.Infrastructure.Security;
using SmartGrocery.Infrastructure.External;
using SmartGrocery.Infrastructure.Services;

namespace SmartGrocery.API.Configurations
{
    public static class ServicesRegistration
    {
        public static void RegisterServices(this IServiceCollection services, string connectionString)
        {
            // ----------------------
            // DbContext
            // ----------------------
            services.AddDbContext<GroceryDbContext>(options =>
                options.UseNpgsql(connectionString));

            // ----------------------
            // Application Services
            // ----------------------
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IRecommendationService, RecommendationService>();

            // ----------------------
            // Infrastructure Repositories
            // ----------------------
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            // ----------------------
            // Security
            // ----------------------
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

            // ----------------------
            // External Services
            // ----------------------
            services.AddHttpClient<PythonRecommendationClient>();
        }
    }
}
