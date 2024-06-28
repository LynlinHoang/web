using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface IOrderRepository
    {
        Task<Order> CreateAsync(Order order);

        Task<Order?> GetByIdAsync(Guid id);

        Task<List<Order>> GetAllAsync(string? filterOn = null, string? filterQuery = null,
            DateTime? fromTime = null,  DateTime? timeTo = null,string? filterOnStatus = null,
            int? filterQueryStatus = 1, int pageNumber = 1, int pageSize = 1000);

        Task<Order?> DeleteAsync(Guid id);
        Task<Order?> UpdateAsync(Guid id, Order order);

        Task<int?> getPageCount(string? filterQuery = null,
            DateTime? fromTime = null, DateTime? timeTo = null,
            int? filterQueryStatus = 1, int pageSize = 1000);
    }
}
