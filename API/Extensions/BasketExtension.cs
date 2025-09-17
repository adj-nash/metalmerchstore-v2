using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtension
    {
        public static BasketDto ToDto(this Basket basket)
        {
             return new BasketDto 
            {
                BasketId = basket.BasketId,
                ClientSecret = basket.ClientSecret,
                PaymentIntentId = basket.PaymentIntentId,
                Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                ImageUrl = x.Product.ImageUrl,
                Category = x.Product.Category,
                Band = x.Product.Band, 
                Quantity = x.Quantity
            }).ToList()

            };
        }

        public static async Task<Basket> GetBasketWithItems(this IQueryable<Basket> query, string? basketId)
        {
            return await query
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BasketId == basketId)
                ?? throw new Exception("Can't get basket");
        }
    }
}