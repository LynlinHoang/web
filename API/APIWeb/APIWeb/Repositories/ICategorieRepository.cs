using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface ICategorieRepository
    {
        Task<Categories> CreateAsync(Categories categories);
        Task<List<Categories>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000, int rowcount = 0);
        Task<Categories?> UpdateAsync(Guid id, Categories categories);
        Task<Categories?> DeleteAsync(Guid id);
        Task<Categories?> GetByIdAsync(Guid id);
        Task<int?> getPageCount(int pageSize=100, string? filterQuery = null);
        Task<bool> IsUsedAsync(Guid id);
    }
}
