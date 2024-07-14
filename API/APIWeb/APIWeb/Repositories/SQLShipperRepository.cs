using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLShipperRepository : IShipperRepository
    {
        private APIDbContext aPIDbContext;

        public SQLShipperRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;
        }
        public async Task<Shippers> CreateAsync(Shippers shippers)
        {
            await aPIDbContext.Shippers.AddAsync(shippers);
            await aPIDbContext.SaveChangesAsync();
            return shippers;
        }

        public async Task<Shippers?> DeleteAsync(Guid id)
        {
            var existingShipper = await aPIDbContext.Shippers.FirstOrDefaultAsync(x => x.Id == id);
            if (existingShipper == null)
            {
                return null;
            }
            aPIDbContext.Shippers.Remove(existingShipper);
            await aPIDbContext.SaveChangesAsync();
            return existingShipper;
        }

        public async Task<List<Shippers>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000, int rowcount = 0)
        {
            IQueryable<Shippers> shippers = aPIDbContext.Shippers;
            // Filtering
            if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
            {
                if (filterOn.Equals("ShipperName", StringComparison.OrdinalIgnoreCase))
                {
                    shippers = shippers.Where(x => x.ShipperName.Contains(filterQuery));
                }
            }

            // Pagination
            var shipResults = (pageNumber-1) * pageSize;

            return await shippers.Skip(shipResults).Take(pageSize).ToListAsync();
        }

        public async Task<Shippers?> GetByIdAsync(Guid id)
        {
            return await aPIDbContext.Shippers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int?> getPageCount(int pageSize=100, string? filterQuery = null)
        {
            IQueryable<Shippers> shippers = aPIDbContext.Shippers;
            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
                shippers =  shippers.Where(x => x.ShipperName.Contains(filterQuery));
            }
            int totalCount = await shippers.CountAsync();
            if (totalCount <= 0 || pageSize <= 0)
            {
                return null;
            }
            int pageCount = (int)Math.Ceiling((double)totalCount / pageSize);
            return pageCount;
        }

        public async Task<bool> IsUsedAsync(Guid id)
        {
            bool isUsed = await aPIDbContext.Order.AnyAsync(x => x.ShipperID == id);
            return isUsed;
        }

        public async Task<Shippers?> UpdateAsync(Guid id, Shippers shippers)
        {
            var existShipper = await aPIDbContext.Shippers.FirstOrDefaultAsync(x => x.Id == id);

            if (existShipper == null)
            {
                return null;
            }

            existShipper.ShipperName=shippers.ShipperName;
            existShipper.Phone=shippers.Phone;


            await aPIDbContext.SaveChangesAsync();
            return existShipper;
        }
    }
}
