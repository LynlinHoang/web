using APIWeb.Model.Domain;
using APIWeb.Model.DTO;

namespace APIWeb.Repositories
{
    public interface ISupplierRepository
    {
        Task<Suppliers> CreateAsync(Suppliers supplier);
        Task<List<Suppliers>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000);
        Task<Suppliers?> UpdateAsync(Guid id, Suppliers supplier);
        Task<Suppliers?> DeleteAsync(Guid id);
        Task<Suppliers?> GetByIdAsync(Guid id);
        Task<int?> getPageCount(int pageSize = 100, string? filterQuery = null);
        Task<bool> IsUsedAsync(Guid id);
    }
}
