using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface IProductRepository
    {
        Task<Products> CreateAsync(Products products);
        Task<List<Products>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000);
        Task<Products?> UpdateAsync(Guid id, Products products);
        Task<Products?> DeleteAsync(Guid id);
        Task<Products?> GetByIdAsync(Guid id);
        Task<int?> getPageCount(int pageSize, string? filterQuery = null);

        Task<bool> IsUsedAsync(Guid id);
    }
}
