using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Data
{
    public class APIDbAuthContext: IdentityDbContext
    {
        public APIDbAuthContext(DbContextOptions<APIDbAuthContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            var adminRolesId = "4a2da838-650c-488f-a4a3-8bc3b99f9279";
            var employeeRolesId = "97b8357b-5f86-4ee2-9638-d86d6c3b8dd4";
            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = adminRolesId,
                    ConcurrencyStamp=adminRolesId,
                    Name="employee",
                    NormalizedName="employee".ToUpper(),

                },
                new IdentityRole
                {
                    Id = employeeRolesId,
                    ConcurrencyStamp=employeeRolesId,
                    Name="admin",
                    NormalizedName="admin".ToUpper(),
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
