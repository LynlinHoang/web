using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface IShipperRepository
    {
        Task<Shippers> CreateAsync(Shippers shippers);
        Task<List<Shippers>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000, int rowcount = 0);
        Task<Shippers?> UpdateAsync(Guid id, Shippers shippers);
        Task<Shippers?> DeleteAsync(Guid id);
        Task<Shippers?> GetByIdAsync(Guid id);
        Task<int?> getPageCount(int pageSize=100, string? filterQuery = null);
        Task<bool> IsUsedAsync(Guid id);
    }
}
