using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLProvinceRepository : IProvinceRepository
    {
        private APIDbContext aPIDbContext;

        public SQLProvinceRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;
        }
        public async Task<List<Provinces>> GetAllAsync()
        {
            return await aPIDbContext.Provinces.ToListAsync();
        }
    }
}
