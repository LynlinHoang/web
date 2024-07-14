using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLSupplierRepository : ISupplierRepository
    {
        private APIDbContext aPIDbContext;

        public SQLSupplierRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;
        }
        public async Task<Suppliers> CreateAsync(Suppliers supplier)
        {
            await aPIDbContext.Suppliers.AddAsync(supplier);
            await aPIDbContext.SaveChangesAsync();
            return supplier;
        }

        public async Task<Suppliers?> DeleteAsync(Guid id)
        {
            var existingSupplier = await aPIDbContext.Suppliers.FirstOrDefaultAsync(x => x.Id == id);
            if (existingSupplier == null)
            {
                return null;
            }
            aPIDbContext.Suppliers.Remove(existingSupplier);
            await aPIDbContext.SaveChangesAsync();
            return existingSupplier;
        }

        public async Task<List<Suppliers>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000)
        {
                 IQueryable<Suppliers> suppliers = aPIDbContext.Suppliers;

            // Filtering
            if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
            {
                if (filterOn.Equals("SupplierName", StringComparison.OrdinalIgnoreCase))
                {
                    suppliers = suppliers.Where(x => x.SupplierName.Contains(filterQuery));
                }
            }
            // Pagination
            var skipAmount = (pageNumber - 1) * pageSize;
            return await suppliers.Skip(skipAmount).Take(pageSize).ToListAsync();
        }

        public async Task<Suppliers?> GetByIdAsync(Guid id)
        {
            return await aPIDbContext.Suppliers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int?> getPageCount(int pageSize = 100, string? filterQuery = null)
        {
            IQueryable<Suppliers> suppliers = aPIDbContext.Suppliers;
            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
                suppliers =  suppliers.Where(x => x.SupplierName.Contains(filterQuery));
            }

            int totalCount = await suppliers.CountAsync();
            if (totalCount <= 0 || pageSize <= 0)
            {
                return null;
            }
            int pageCount = (int)Math.Ceiling((double)totalCount / pageSize);
            return pageCount;
        }

        public async Task<bool> IsUsedAsync(Guid id)
        {
            bool isUsed = await aPIDbContext.Products.AnyAsync(x => x.SupplierID == id);
            return isUsed;
        }

        public async Task<Suppliers?> UpdateAsync(Guid id, Suppliers supplier)
        {

            var existSupplier = await aPIDbContext.Suppliers.FirstOrDefaultAsync(x => x.Id == id);

            if (existSupplier == null)
            {
                return null;
            }

            existSupplier.SupplierName = supplier.SupplierName;
            existSupplier.ContactName = supplier.ContactName;
            existSupplier.Address = supplier.Address;
            existSupplier.Provice  = supplier.Provice;
            existSupplier.Email = supplier.Email;
            existSupplier.Phone = supplier.Phone;
            

            await aPIDbContext.SaveChangesAsync();
            return existSupplier;
        }
    }
}
