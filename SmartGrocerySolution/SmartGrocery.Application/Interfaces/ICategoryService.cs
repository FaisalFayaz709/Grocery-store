// using SmartGrocery.Application.DTOs.Orders;

// namespace SmartGrocery.Application.Interfaces
// {
//     public interface ICategoryService
//     {
//         Task<IEnumerable<CategoryDto>> GetAllAsync();
//         Task<CategoryDto> CreateAsync(CategoryDto dto);
//         Task UpdateAsync(Guid id, CategoryDto dto);
//         Task DeleteAsync(Guid id);


//     }
// }

// SmartGrocery.Application/Interfaces/ICategoryService.cs
using SmartGrocery.Application.DTOs.Products; // <- CategoryDto lives here
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartGrocery.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();
        Task<CategoryDto> CreateAsync(CategoryDto dto);
        Task UpdateAsync(Guid id, CategoryDto dto);
        Task DeleteAsync(Guid id);
    }
}
