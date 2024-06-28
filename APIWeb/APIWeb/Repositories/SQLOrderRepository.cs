using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLOrderRepository : IOrderRepository
    {
        private APIDbContext aPIDbContext;

        public SQLOrderRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;

        }
        public async Task<Order> CreateAsync(Order order)
        {
            await aPIDbContext.Order.AddAsync(order);
            await aPIDbContext.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> DeleteAsync(Guid id)
        {
            var existingOrder = await aPIDbContext.Order.FirstOrDefaultAsync(x => x.Id == id);
            if (existingOrder == null)
            {
                return null;
            }
            aPIDbContext.Order.Remove(existingOrder);
            await aPIDbContext.SaveChangesAsync();
            return existingOrder;
        }

        public async Task<List<Order>> GetAllAsync(string? filterOn = null, string? filterQuery = null,
            DateTime? fromTime = null, DateTime? timeTo = null, string? filterOnStatus = null, 
            int? filterQueryStatus = 1, int pageNumber = 1, int pageSize = 1000)
        {
           var order = aPIDbContext.Order.Include("Employee").Include("Shipper").Include("Customer").Include("Status").AsQueryable();
            
            if (!string.IsNullOrWhiteSpace(filterOn) && filterQuery != null)
            {

                if (filterOn.Equals("CustomerName", StringComparison.OrdinalIgnoreCase))
                {
                    order = order.Where(x => x.Customer.CustomerName.Contains(filterQuery.ToString()));
                }                               
            }
            //Status
            if (!string.IsNullOrWhiteSpace(filterOnStatus) && filterQueryStatus != null)
            {
                if (filterOnStatus.Equals("StatusID", StringComparison.OrdinalIgnoreCase))
                {
                    order = order.Where(x => x.StatusID == filterQueryStatus);
                }
            }
            //OrderTime
            if (fromTime != null && timeTo != null)
            {
                order = order.Where(x => x.OrderTime >= fromTime && x.OrderTime <= timeTo);
            }
            // Pagination
            var shipResults = (pageNumber-1) * pageSize;

            return await order.Skip(shipResults).Take(pageSize).ToListAsync();
        }

        public async Task<Order?> GetByIdAsync(Guid id)
        {
            return await aPIDbContext.Order.Include(o => o.Employee).Include(o => o.Shipper).Include(o => o.Customer).Include(o => o.Status).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int?> getPageCount(string? filterQuery = null,DateTime? fromTime = null, DateTime? timeTo = null, 
            int? filterQueryStatus = 1,  int pageSize = 1000)
        {
            IQueryable<Order> order = aPIDbContext.Order;

            if (!string.IsNullOrWhiteSpace(filterQuery))
                {
                    order = order.Where(x => x.Customer.CustomerName.Contains(filterQuery.ToString()));
                }
            //Status
                if (filterQueryStatus!=0)
                {
                    order = order.Where(x => x.StatusID == filterQueryStatus);
                }
            
            //OrderTime
            if (fromTime != null && timeTo != null)
            {
                order = order.Where(x => x.OrderTime >= fromTime && x.OrderTime <= timeTo);
            }

            int totalCount = await order.CountAsync();
            if (totalCount <= 0 || pageSize <= 0)
            {
                return 0;
            }
            int pageCount = (int)Math.Ceiling((double)totalCount / pageSize);
            return pageCount;
        }

        public async Task<Order?> UpdateAsync(Guid id, Order order)
        {
            var existOrder = await aPIDbContext.Order.FirstOrDefaultAsync(x => x.Id == id);

            if (existOrder == null)
            {
                return null;
            }

            existOrder.AcceptTime = order.AcceptTime;
            existOrder.StatusID = order.StatusID;
            existOrder.ShipperID= order.ShipperID;
            existOrder.FinishedTime = order.FinishedTime;
            existOrder.ShippedTime = order.ShippedTime;
            await aPIDbContext.SaveChangesAsync();
            return existOrder;
        }
    }
}
