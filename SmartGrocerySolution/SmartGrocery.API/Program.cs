
// using Microsoft.EntityFrameworkCore;
// using Microsoft.OpenApi.Models;
// using SmartGrocery.API.Middlewares;
// using SmartGrocery.Application.Interfaces;
// using SmartGrocery.Application.Interfaces.Repository;
// using SmartGrocery.Application.Interfaces.Security;
// using SmartGrocery.Infrastructure.External;
// using SmartGrocery.Infrastructure.Persistence;
// using SmartGrocery.Infrastructure.Repositories;
// using SmartGrocery.Infrastructure.Security;
// using SmartGrocery.Infrastructure.Services;

// var builder = WebApplication.CreateBuilder(args);

// // Add DbContext
// builder.Services.AddDbContext<GroceryDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// // Register Repositories
// builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
// builder.Services.AddScoped<IUserRepository, UserRepository>();
// builder.Services.AddScoped<IProductRepository, ProductRepository>();
// builder.Services.AddScoped<IOrderRepository, OrderRepository>();
// builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
// builder.Services.AddScoped<ICartRepository, CartRepository>();
// builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
// // builder.Services.AddHttpClient<IPythonRecommendationClient, PythonRecommendationClient>();
// builder.Services.AddScoped<IRecommendationService, RecommendationService>();


// // Register Services
// builder.Services.AddScoped<IAuthService, SmartGrocery.Application.Services.AuthService>();
// builder.Services.AddScoped<ICartService, SmartGrocery.Application.Services.CartService>();
// builder.Services.AddScoped<IProductService, SmartGrocery.Application.Services.ProductService>();
// builder.Services.AddScoped<IOrderService, SmartGrocery.Application.Services.OrderService>();
// builder.Services.AddScoped<IRecommendationService, SmartGrocery.Application.Services.RecommendationService>();
// builder.Services.AddScoped<ICategoryService, SmartGrocery.Application.Services.CategoryService>();

// // External Python Recommendation Client
// builder.Services.AddHttpClient<IPythonRecommendationClient, PythonRecommendationClient>();

// // Register Email Service
// builder.Services.AddScoped<IEmailService, EmailService>();

// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();

// // Swagger
// builder.Services.AddSwaggerGen(c =>
// {
//     c.SwaggerDoc("v1", new OpenApiInfo
//     {
//         Title = "Smart Grocery API",
//         Version = "v1",
//         Description = "API for Smart Grocery Shopping Platform"
//     });
// });

// // ✅ CORS Configuration
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//     {
//         policy
//             .WithOrigins("http://localhost:3000")  // frontend URL
//             .AllowAnyHeader()
//             .AllowAnyMethod()
//             .AllowCredentials();
//     });
// });

// var app = builder.Build();

// // ✅ CRITICAL FIX: UseCors() MUST BE FIRST
// app.UseCors("AllowAll");

// // Middleware - order matters!
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(c =>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "Smart Grocery API v1");
//         c.RoutePrefix = string.Empty;
//     });
// }

// // app.UseHttpsRedirection(); // optional

// // Exception handling middleware
// app.UseMiddleware<GlobalExceptionMiddleware>();

// // JWT middleware (for protected routes)
// app.UseMiddleware<JwtMiddleware>();

// app.UseAuthorization();
// app.MapControllers();

// app.Run();


// using Microsoft.EntityFrameworkCore;
// using Microsoft.OpenApi.Models;
// using SmartGrocery.API.Middlewares;
// using SmartGrocery.Application.Interfaces;
// using SmartGrocery.Application.Interfaces.Repository;
// using SmartGrocery.Application.Interfaces.Security;
// using SmartGrocery.Infrastructure.Persistence;
// using SmartGrocery.Infrastructure.Repositories;
// using SmartGrocery.Infrastructure.Security;
// using SmartGrocery.Infrastructure.Services; // ✅ ADD THIS

// var builder = WebApplication.CreateBuilder(args);

// // Add DbContext
// builder.Services.AddDbContext<GroceryDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// // Register Repositories
// builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
// builder.Services.AddScoped<IUserRepository, UserRepository>();
// builder.Services.AddScoped<IProductRepository, ProductRepository>();
// builder.Services.AddScoped<IOrderRepository, OrderRepository>();
// builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
// builder.Services.AddScoped<ICartRepository, CartRepository>();

// // Register Security
// builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

// // Register Services
// builder.Services.AddScoped<IAuthService, SmartGrocery.Application.Services.AuthService>();
// builder.Services.AddScoped<ICartService, SmartGrocery.Application.Services.CartService>();
// builder.Services.AddScoped<IProductService, SmartGrocery.Application.Services.ProductService>();
// builder.Services.AddScoped<IOrderService, SmartGrocery.Application.Services.OrderService>();
// builder.Services.AddScoped<ICategoryService, SmartGrocery.Application.Services.CategoryService>();

// // ✅ Register Recommendation Service (Without Python Client)
// builder.Services.AddScoped<IRecommendationService, SmartGrocery.Application.Services.RecommendationService>();

// // ✅ Register Email Service
// builder.Services.AddScoped<IEmailService, EmailService>();

// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();

// // Swagger
// builder.Services.AddSwaggerGen(c =>
// {
//     c.SwaggerDoc("v1", new OpenApiInfo
//     {
//         Title = "Smart Grocery API",
//         Version = "v1",
//         Description = "API for Smart Grocery Shopping Platform"
//     });
// });

// // CORS Configuration
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//     {
//         policy
//             .WithOrigins("http://localhost:3000")
//             .AllowAnyHeader()
//             .AllowAnyMethod()
//             .AllowCredentials();
//     });
// });

// var app = builder.Build();

// // CORS must be first
// app.UseCors("AllowAll");

// // Middleware - order matters!
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(c =>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "Smart Grocery API v1");
//         c.RoutePrefix = string.Empty;
//     });
// }

// // Exception handling middleware
// app.UseMiddleware<GlobalExceptionMiddleware>();

// // JWT middleware
// app.UseMiddleware<JwtMiddleware>();

// app.UseAuthorization();
// app.MapControllers();

// app.Run();

// using Microsoft.EntityFrameworkCore;
// using Microsoft.OpenApi.Models;
// using SmartGrocery.API.Middlewares;
// using SmartGrocery.Application.Interfaces;
// using SmartGrocery.Application.Interfaces.Repository;
// using SmartGrocery.Application.Interfaces.Security;
// using SmartGrocery.Infrastructure.Persistence;
// using SmartGrocery.Infrastructure.Repositories;
// using SmartGrocery.Infrastructure.Security;
// using SmartGrocery.Infrastructure.Services;

// var builder = WebApplication.CreateBuilder(args);

// // Add DbContext
// builder.Services.AddDbContext<GroceryDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// // Register Repositories
// builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
// builder.Services.AddScoped<IUserRepository, UserRepository>();
// builder.Services.AddScoped<IProductRepository, ProductRepository>();
// builder.Services.AddScoped<IOrderRepository, OrderRepository>();
// builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
// builder.Services.AddScoped<ICartRepository, CartRepository>();

// // Register Security
// builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

// // Register Services
// builder.Services.AddScoped<IAuthService, SmartGrocery.Application.Services.AuthService>();
// builder.Services.AddScoped<ICartService, SmartGrocery.Application.Services.CartService>();
// builder.Services.AddScoped<IProductService, SmartGrocery.Application.Services.ProductService>();
// builder.Services.AddScoped<IOrderService, SmartGrocery.Application.Services.OrderService>();
// builder.Services.AddScoped<ICategoryService, SmartGrocery.Application.Services.CategoryService>();

// // ✅ Recommendation Service (NO Python client needed)
// builder.Services.AddScoped<IRecommendationService, SmartGrocery.Application.Services.RecommendationService>();

// // ✅ Email Service
// builder.Services.AddScoped<IEmailService, EmailService>();

// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();

// // Swagger
// builder.Services.AddSwaggerGen(c =>
// {
//     c.SwaggerDoc("v1", new OpenApiInfo
//     {
//         Title = "Smart Grocery API",
//         Version = "v1",
//         Description = "API for Smart Grocery Shopping Platform"
//     });
// });

// // CORS Configuration
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//     {
//         policy
//             .WithOrigins("http://localhost:3000")
//             .AllowAnyHeader()
//             .AllowAnyMethod()
//             .AllowCredentials();
//     });
// });

// var app = builder.Build();

// // CORS must be first
// app.UseCors("AllowAll");

// // Middleware - order matters!
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(c =>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "Smart Grocery API v1");
//         c.RoutePrefix = string.Empty;
//     });
// }

// // Exception handling middleware
// app.UseMiddleware<GlobalExceptionMiddleware>();

// // JWT middleware
// app.UseMiddleware<JwtMiddleware>();

// app.UseAuthorization();
// app.MapControllers();

// app.Run();


using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SmartGrocery.API.Middlewares;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Application.Interfaces.Security;
using SmartGrocery.Infrastructure.Persistence;
using SmartGrocery.Infrastructure.Repositories;
using SmartGrocery.Infrastructure.Security;
using SmartGrocery.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<GroceryDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register Repositories
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();

// Register Security
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

// Register Application Services
builder.Services.AddScoped<IAuthService, SmartGrocery.Application.Services.AuthService>();
builder.Services.AddScoped<ICartService, SmartGrocery.Application.Services.CartService>();
builder.Services.AddScoped<IProductService, SmartGrocery.Application.Services.ProductService>();
builder.Services.AddScoped<IOrderService, SmartGrocery.Application.Services.OrderService>();
builder.Services.AddScoped<ICategoryService, SmartGrocery.Application.Services.CategoryService>();

// ✅ Register Infrastructure Services
builder.Services.AddScoped<IRecommendationService, RecommendationService>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Smart Grocery API",
        Version = "v1",
        Description = "API for Smart Grocery Shopping Platform"
    });
});

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Enable Swagger in all environments for easier testing
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Smart Grocery API v1");
    c.RoutePrefix = string.Empty;
});

app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseMiddleware<JwtMiddleware>();
app.UseAuthorization();
app.MapControllers();

app.Run();