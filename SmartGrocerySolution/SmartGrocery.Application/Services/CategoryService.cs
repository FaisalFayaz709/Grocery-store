// SmartGrocery.Application/Services/CategoryService.cs
using SmartGrocery.Application.DTOs.Products;
using SmartGrocery.Application.Interfaces;
using SmartGrocery.Application.Interfaces.Repository;
using SmartGrocery.Domain.Entities;

namespace SmartGrocery.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoryService(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            var categories = await _categoryRepo.GetAllAsync();
            return categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name
            });
        }

        public async Task<CategoryDto> CreateAsync(CategoryDto dto)
        {
            var entity = new Category
            {
                Id = Guid.NewGuid(),
                Name = dto.Name
            };

            var created = await _categoryRepo.AddAsync(entity);

            return new CategoryDto
            {
                Id = created.Id,
                Name = created.Name
            };
        }

        public async Task UpdateAsync(Guid id, CategoryDto dto)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null)
                throw new KeyNotFoundException("Category not found.");

            category.Name = dto.Name;
            await _categoryRepo.UpdateAsync(category);
        }

        public async Task DeleteAsync(Guid id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null)
                throw new KeyNotFoundException("Category not found.");

            await _categoryRepo.DeleteAsync(category);
        }
    }
}
