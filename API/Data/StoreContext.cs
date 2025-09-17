using API.Entities;
using API.Entities.OrderAggregate;
using MetalMerchStore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    
    public required DbSet<Product> Products { get; set; }

    public required DbSet<Basket> Baskets { get; set; }

    public required DbSet<Order> Orders { get; set; }

     protected override void OnModelCreating(ModelBuilder builder)
     {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(

                new IdentityRole {Id = "3783ec80-2981-48b1-a209-cb9f34820324", Name = "Member", NormalizedName = "MEMBER"},
                new IdentityRole {Id = "c91a8cf3-721c-44ca-b4b2-1e38794db412", Name = "Admin", NormalizedName = "ADMIN"}

            );
     }

}
