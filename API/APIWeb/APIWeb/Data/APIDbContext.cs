using APIWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace APIWeb.Data
{
    public class APIDbContext: DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }

      
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Suppliers> Suppliers { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet <Provinces> Provinces { get; set;}
        public DbSet<Employees> Employees { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<Shippers> Shippers { get; set; }
        public DbSet<StatusOrder> StatusOrders { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<DetailOrder> DetailOrder { get; set; }

    }
}
