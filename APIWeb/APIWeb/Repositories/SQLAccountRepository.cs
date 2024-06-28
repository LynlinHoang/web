using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLAccountRepository : IAccountRepository
    {
        private APIDbContext aPIDbContext;

        public SQLAccountRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;
        }
        public async Task<Employees?> GetLoginAsync(string Email)
        {
            return await aPIDbContext.Employees.FirstOrDefaultAsync(x => x.Email == Email);
        }
    }
}
