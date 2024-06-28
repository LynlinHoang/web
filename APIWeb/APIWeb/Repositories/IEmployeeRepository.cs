using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface IEmployeeRepository
    {
        Task<Employees> CreateAsync(Employees employees);
        Task<List<Employees>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000, int rowcount = 0);
        Task<Employees?> UpdateAsync(Guid id, Employees employees);
        Task<Employees?> DeleteAsync(Guid id);
        Task<Employees?> GetByIdAsync(Guid id);
        Task<int?> getPageCount(int pageSize=100, string? filterQuery = null);

        Task<bool> IsUsedAsync(Guid id);
    }
}
