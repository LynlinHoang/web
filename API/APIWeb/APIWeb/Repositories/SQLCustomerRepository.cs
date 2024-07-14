using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLCustomerRepository : ICustomerRepository
    {
        private APIDbContext aPIDbContext;

        public SQLCustomerRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;
        }
        public async Task<Customers> CreateAsync(Customers customers)
        {
            await aPIDbContext.Customers.AddAsync(customers);
            await aPIDbContext.SaveChangesAsync();
            return customers;

        }

        public async Task<Customers?> DeleteAsync(Guid id)
        {
            var existingCustomer = await aPIDbContext.Customers.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCustomer == null)
            {
                return null;
            }
            aPIDbContext.Customers.Remove(existingCustomer);
            await aPIDbContext.SaveChangesAsync();
            return existingCustomer;
        }

        public async Task<List<Customers>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000, int rowcount = 0)
        {
            IQueryable<Customers> customers = aPIDbContext.Customers;

            // Filtering
            if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
            {
                if (filterOn.Equals("CustomerName", StringComparison.OrdinalIgnoreCase))
                {
                    customers = customers.Where(x => x.CustomerName.Contains(filterQuery));
                }
            }
            // Pagination
            var skipAmount = (pageNumber - 1) * pageSize;

            return await customers.Skip(skipAmount).Take(pageSize).ToListAsync();
        }

        public async Task<Customers?> GetByIdAsync(Guid id)
        {
            return await aPIDbContext.Customers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int?> getPageCount(int pageSize=100, string? filterQuery = null )
        {
            IQueryable<Customers> customers = aPIDbContext.Customers;
            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
                customers =  customers.Where(x => x.CustomerName.Contains(filterQuery));
            }
            int totalCount = await customers.CountAsync();
            if (totalCount <= 0 || pageSize <= 0)
            {
                return null;
            }
            int pageCount = (int)Math.Ceiling((double)totalCount / pageSize);
            return pageCount;
        }

        public async Task<bool> IsUsedAsync(Guid id)
        {
            bool isUsed = await aPIDbContext.Order.AnyAsync(x => x.CustomerID == id);
            return isUsed;
        }

        public async Task<Customers?> UpdateAsync(Guid id, Customers customers)
        {
            var existCustomers = await aPIDbContext.Customers.FirstOrDefaultAsync(x => x.Id == id);

            if (existCustomers == null)
            {
                return null;
            }
            existCustomers.ContactName = customers.ContactName;
            existCustomers.CustomerName = customers.CustomerName;
            existCustomers.Address = customers.Address;
            existCustomers.Province = customers.Province;
            existCustomers.Email = customers.Email;
            existCustomers.IsLocked = customers.IsLocked;
            existCustomers.Phone = customers.Phone;

            await aPIDbContext.SaveChangesAsync();
            return existCustomers;
        }
    }
}
