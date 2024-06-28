using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLDetailsOrderRepository : IDetailsOrderRepository
    {
        private APIDbContext aPIDbContext;

        public SQLDetailsOrderRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;
        }

        public async Task<int?> Count(Guid id)
        {
            int Count = await aPIDbContext.DetailOrder.Where(x => x.OrderID == id).CountAsync();

            return Count;
        }

        public async Task<DetailOrder> CreateAsync(DetailOrder detailOrder)
        {
            await aPIDbContext.DetailOrder.AddAsync(detailOrder);
            await aPIDbContext.SaveChangesAsync();
            return detailOrder;
        }

        public async Task<DetailOrder?> DeleteAsync(Guid id)
        {
            var existingDetail = await aPIDbContext.DetailOrder.FirstOrDefaultAsync(x => x.Id == id);
            if (existingDetail == null)
            {
                return null;
            }
            aPIDbContext.DetailOrder.Remove(existingDetail);
            await aPIDbContext.SaveChangesAsync();
            return existingDetail;
        }

        public async Task<List<DetailOrder>> GetAllByIdAsync(Guid orderId)
        {
            var existOrderDetail = await aPIDbContext.DetailOrder.Include("Product").Where(x => x.OrderID == orderId).ToListAsync();

            return existOrderDetail;
        }

        public async Task<DetailOrder?> UpdateAsync(Guid id, DetailOrder detailOrder)
        {
            var existOrderDetail = await aPIDbContext.DetailOrder.FirstOrDefaultAsync(x => x.Id == id);

            if (existOrderDetail == null)
            {
                return null;
            }
            existOrderDetail.Quantity = detailOrder.Quantity;           
            await aPIDbContext.SaveChangesAsync();
            return existOrderDetail;
        }
    }
}
