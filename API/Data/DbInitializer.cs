using System;
using API.Entities;
using MetalMerchStore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static async Task Initialize(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Failed to retrieve database.");

        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to retrieve user manager.");

            await SeedData(context, userManager);
    }

    private static async Task SeedData(StoreContext context, UserManager<User> userManager) 
    {
        context.Database.Migrate();

        if(!userManager.Users.Any()) 
        {
            var user = new User
            {
                UserName = "alex_nash@test.co.uk",
                Email = "alex_nash@test.co.uk"
            };

            await userManager.CreateAsync(user, "P@$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");

            var admin = new User
            {
                UserName = "alex_nash@live.co.uk",
                Email = "alex_nash@live.co.uk"
            };

            await userManager.CreateAsync(admin, "P@$$w0rd");
            await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
        }

        if(context.Products.Any()) return;

        var products = new List<Product>
        {
           new Product
                {
                    Name = "Enforced \"War Remains\" longsleeve",
                    Description = "Faceripper artwork from the new War Remains record.",
                    Price = 3499,
                    ImageUrl= "https://evilgreed.net/cdn/shop/files/ENFORCED-WarRemains-LS-F_5000x.jpg?v=1709202244",
                    Category = "Longsleeve",
                    Stock= 100,
                    Size= 'M',
                    Band= "Enforced",
                    Genre= "Thrash"
                },  
                new Product
                {
                    Name = "Sodom \"Partisan\" longsleeve",
                    Description = "Artwork from the Partisan EP, printed front & back.",
                    Price = 2999,
                    ImageUrl= "https://m.media-amazon.com/images/I/A18Zbr2L5LL._CLa%7C2140%2C2000%7CB1mIFN0BOTL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX569_.png",
                    Category = "Longsleeve",
                    Stock= 100,
                    Size= 'M',
                    Band= "Sodom",
                    Genre= "Thrash"
                },
                new Product
                {
                    Name = "Demolition Hammer \"Epidemic of Violence\" longsleeve",
                    Description = "Artwork from the Epidemic of Violence record.",
                    Price = 3499,
                    ImageUrl="https://www.warlordclothing.com/images/product/demohammer_epidemic_longsleeve_front.jpg",
                    Category = "Longsleeve",
                    Stock=  100,
                    Size= 'M',
                    Band= "Demolitioner Hammer",
                    Genre= "Thrash"
                },
                new Product
                {
                    Name = "Kreator \"Pleasure to Kill\" sweatshirt",
                    Description = "Artwork from the Pleasure to Kill record.",
                    Price = 3999,
                    ImageUrl="https://m.media-amazon.com/images/I/A1mN82gBRyL._CLa%7C2140%2C2000%7CB1c7S5pkQjL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX466_.png",
                    Category = "Sweatshirt",
                    Stock=  100,
                    Size= 'M',
                    Band= "Kreator",
                    Genre= "Thrash"
                }, 
                new Product
                {
                    Name = "Adolescents \"Kids of the Black Hole\" t-shirt",
                    Description = "Classic Kids of the Black Hole t-shirt from the self-titled debut.",
                    Price = 3999,
                    ImageUrl="https://cdn11.bigcommerce.com/s-p66uh2e57r/images/stencil/1280x1280/products/25876/36408/adolescents_kids_of_the_black_hole_black_t-shirt__35494.1635950277.jpg?c=1",
                    Category = "T-shirt",
                    Stock=  100,
                    Size= 'M',
                    Band= "Adolescents",
                    Genre= "Punk"
                },
                new Product
                {
                    Name = "Winterfylleth \"Harold's Reckoning\" t-shirt",
                    Description = "Re-Print of the \"Harold's Reckoning\" album shirt.",
                    Price = 2099,
                    ImageUrl="https://f4.bcbits.com/img/0028035104_10.jpg",
                    Category = "T-shirt",
                    Stock=  100,
                    Size= 'M',
                    Band= "Winterfylleth",
                    Genre= "Black"
                }
        };

        context.Products.AddRange(products);
        context.SaveChanges();
    }
}
