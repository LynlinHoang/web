using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface IDetailsOrderRepository
    {
        Task<DetailOrder> CreateAsync(DetailOrder detailOrder);
        Task<List<DetailOrder>> GetAllByIdAsync(Guid orderId);
        Task<DetailOrder?> UpdateAsync(Guid id, DetailOrder detailOrder);
        Task<DetailOrder?> DeleteAsync(Guid id);

        Task<int?> Count(Guid id);

    }
}
