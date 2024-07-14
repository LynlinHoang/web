using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLCategorieRepository : ICategorieRepository
    {
        private APIDbContext aPIDbContext;

        public SQLCategorieRepository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext =aPIDbContext;
        }
        public async Task<Categories> CreateAsync(Categories categories)
        {
            await aPIDbContext.Categories.AddAsync(categories);
            await aPIDbContext.SaveChangesAsync();
            return categories;
        }

        public async Task<Categories?> DeleteAsync(Guid id)
        {
            var existingRegion = await aPIDbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (existingRegion == null)
            {
                return null;
            }
            aPIDbContext.Categories.Remove(existingRegion);
            await aPIDbContext.SaveChangesAsync();
            return existingRegion;
        }

        public async Task<List<Categories>> GetAllAsync(string? filterOn = null, string? filterQuery = null, int pageNumber = 1, int pageSize = 1000, int rowcount = 0)
        {
            IQueryable<Categories> categories = aPIDbContext.Categories;
            // Filtering
            if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
            {
                if (filterOn.Equals("CategoryName", StringComparison.OrdinalIgnoreCase))
                {
                    categories = categories.Where(x => x.CategoryName.Contains(filterQuery));
                }
            }

            // Pagination
            var shipResults = (pageNumber-1) * pageSize;

            return await categories.Skip(shipResults).Take(pageSize).ToListAsync();
        }

        public async Task<Categories?> GetByIdAsync(Guid id)
        {
            return await aPIDbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int?> getPageCount(int pageSize = 100,  string? filterQuery = null)
        {
            IQueryable<Categories> categories = aPIDbContext.Categories;
            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
                    categories =  categories.Where(x => x.CategoryName.Contains(filterQuery));               
            }

            int totalCount = await categories.CountAsync();
            if (totalCount <= 0 || pageSize <= 0)
            {
                return null;
            }
            int pageCount = (int)Math.Ceiling((double)totalCount / pageSize);
            return pageCount;
        }

        public async Task<bool> IsUsedAsync(Guid id)
        {
            bool isUsed = await aPIDbContext.Products.AnyAsync(x => x.CategoryID == id);
            return isUsed;
        }

        public async Task<Categories?> UpdateAsync(Guid id, Categories categories)
        {
            var existCategorie = await aPIDbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);

            if (existCategorie == null)
            {
                return null;
            }
            existCategorie.CategoryName=categories.CategoryName;
            existCategorie.Description=categories.Description;

            await aPIDbContext.SaveChangesAsync();
            return existCategorie;
        }
    }
}
