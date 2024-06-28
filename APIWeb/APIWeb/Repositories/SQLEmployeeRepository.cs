using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLEmployeeRepository : IEmployeeRepository
    {
        private APIDbContext aPIDbContext;

        public SQLEmployeeRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;
        }
        public async Task<Employees> CreateAsync(Employees employees)
        {
            var existingEmployee = await aPIDbContext.Employees.FirstOrDefaultAsync(e => e.Email == employees.Email);

            if (existingEmployee != null)
            {
              
                throw new Exception("Email đã tồn tại trong hệ thống.");
                
            }
            else
            {
                //Nếu không có nhân viên nào sử dụng Email này, thêm mới nhân viên vào cơ sở dữ liệu
                await aPIDbContext.Employees.AddAsync(employees);
                await aPIDbContext.SaveChangesAsync();
                return employees;
            }
        }

        public async Task<Employees?> DeleteAsync(Guid id)
        {
            var existingEmployee = await aPIDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (existingEmployee == null)
            {
                return null;
            }
            aPIDbContext.Employees.Remove(existingEmployee);
            await aPIDbContext.SaveChangesAsync();
            return existingEmployee;
        }

        public async Task<List<Employees>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000, int rowcount = 0)
        {
            IQueryable<Employees> emppoyee = aPIDbContext.Employees;

            // Filtering
            if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
            {
                if (filterOn.Equals("FullName", StringComparison.OrdinalIgnoreCase))
                {
                    emppoyee = emppoyee.Where(x => x.FullName.Contains(filterQuery));
                }
            }
            // Pagination
            var skipAmount = (pageNumber - 1) * pageSize;
            return await emppoyee.Skip(skipAmount).Take(pageSize).ToListAsync();
        }

        public async Task<Employees?> GetByIdAsync(Guid id)
        {
            return await aPIDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int?> getPageCount(int pageSize=100, string? filterQuery = null)
        {
            IQueryable<Employees> emppoyees = aPIDbContext.Employees;
            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
                emppoyees =  emppoyees.Where(x => x.FullName.Contains(filterQuery));
            }
            int totalCount = await emppoyees.CountAsync();
            if (totalCount <= 0 || pageSize <= 0)
            {
                return null;
            }
            int pageCount = (int)Math.Ceiling((double)totalCount / pageSize);
            return pageCount;
        }

        public async Task<bool> IsUsedAsync(Guid id)
        {
            bool isUsed = await aPIDbContext.Order.AnyAsync(x => x.EmployeeID == id);
            return isUsed;
        }

        public async Task<Employees?> UpdateAsync(Guid id, Employees employees)
        {
            var existingEmployeeWithEmail = await aPIDbContext.Employees.FirstOrDefaultAsync(x => x.Id != id && x.Email == employees.Email);

           
            if (existingEmployeeWithEmail != null)
            {
                
                return null;
            }
            var existEmployee = await aPIDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (existEmployee == null)
            {
                return null;
            }

            existEmployee.FullName = employees.FullName;
            existEmployee.Address = employees.Address;
            existEmployee.BirthDate = employees.BirthDate;
            existEmployee.Email = employees.Email;
            existEmployee.Address = employees.Address;
            existEmployee.Photo = employees.Photo;
            existEmployee.IsWorking = employees.IsWorking;
            existEmployee.Phone = employees.Phone;



            await aPIDbContext.SaveChangesAsync();
            return existEmployee;
        }
    }
}
