using APIWeb.Data;
using APIWeb.Model.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Repositories
{
    public class SQLProductReository : IProductRepository
    {
        private APIDbContext aPIDbContext;

        public SQLProductReository(APIDbContext aPIDbContext)
        {
            this.aPIDbContext=aPIDbContext;
        }

        public async Task<Products> CreateAsync(Products products)
        {

            await aPIDbContext.Products.AddAsync(products);
            await aPIDbContext.SaveChangesAsync();
                  return products;
        }
       
        public async Task<Products?> DeleteAsync(Guid id)
        {
            var existingRegion = await aPIDbContext.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (existingRegion == null)
            {
                return null;
            }
            aPIDbContext.Products.Remove(existingRegion);
            await aPIDbContext.SaveChangesAsync();
            return existingRegion;
        }
        
        public async Task<List<Products>> GetAllAsync(string? filterOn = null, string? filterQuery = null,  
        int pageNumber = 1, int pageSize = 100)
        {
            var products = aPIDbContext.Products.Include("Supplier").Include("Category").AsQueryable();
            // Filtering
            if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
            {
                if (filterOn.Equals("ProductName", StringComparison.OrdinalIgnoreCase))
                {
                    products = products.Where(x => x.ProductName.Contains(filterQuery));
                }
            }

            // Pagination
            var skipAmount = (pageNumber - 1) * pageSize;
          


            return await products.Skip(skipAmount).Take(pageSize).ToListAsync();
        }

        public async Task<Products?> GetByIdAsync(Guid id)
        {
            return await aPIDbContext.Products.Include("Supplier").Include("Category").FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int?> getPageCount(int pageSize, string? filterQuery = null)
        {
            IQueryable<Products> products = aPIDbContext.Products;
            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
                products =  products.Where(x => x.ProductName.Contains(filterQuery));
            }
            int totalCount = await products.CountAsync();
            if (totalCount <= 0 || pageSize <= 0)
            {
                return null;
            }
            int pageCount = (int)Math.Ceiling((double)totalCount / pageSize);
            return pageCount;
        }

        public async Task<bool> IsUsedAsync(Guid id)
        {
            bool isUsed = await aPIDbContext.DetailOrder.AnyAsync(x => x.ProductID == id);
            return isUsed;
        }

        public async Task<Products?> UpdateAsync(Guid id, Products product)
        {
            var existProduct = await aPIDbContext.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (existProduct == null)
            {
                return null;
            }

            existProduct.ProductDescription = product.ProductDescription;
            existProduct.ProductName = product.ProductName;
            existProduct.Photo = product.Photo;
            existProduct.Price= product.Price;
            existProduct.Unit= product.Unit;
            existProduct.CategoryID = product.CategoryID;
            existProduct.SupplierID = product.SupplierID;
            existProduct.IsSelling = product.IsSelling;

            await aPIDbContext.SaveChangesAsync();
            return existProduct;
        }

    }
}
