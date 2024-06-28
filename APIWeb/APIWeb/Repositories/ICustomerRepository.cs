using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface ICustomerRepository
    {
        Task<Customers> CreateAsync(Customers customers);
        Task<List<Customers>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000, int rowcount = 0);
        Task<Customers?> UpdateAsync(Guid id, Customers customers);
        Task<Customers?> DeleteAsync(Guid id);
        Task<Customers?> GetByIdAsync(Guid id);
        Task<int?> getPageCount(int pageSize=100, string? filterQuery = null);
        Task<bool> IsUsedAsync(Guid id);
    }
}
