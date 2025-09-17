using API.Controllers;
using API.Data;
using API.Entities;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;

namespace MetalMerchStore;

public class BasketController(StoreContext context) : BaseController
{

[HttpGet]
public async Task<ActionResult<BasketDto>> GetBasket()
{
    var basket = await RetrieveBasket();

    if(basket == null) return NoContent();

   return basket.ToDto();
}

[HttpPost]
public async Task<ActionResult<BasketDto>> AddBasketItem(int productId, int quantity)
{
    var basket = await RetrieveBasket();

    basket ??= CreateBasket();

    var product = await context.Products.FindAsync(productId);

    if(product == null) return BadRequest();

    basket.AddItem(product, quantity);

    var result = await context.SaveChangesAsync() > 0;

    if (result) return Ok(basket.ToDto());

    return BadRequest(new ProblemDetails {Title = "Problem saving basket"});
}


public async Task<ActionResult<BasketDto>> DeleteBasketItem(int productId, int quantity)
{
    var basket = await RetrieveBasket();

    if (basket == null) return BadRequest("Could not find basket.");

    basket.RemoveItem(productId, quantity);

    var result = await context.SaveChangesAsync() > 0;

    if (result) return Ok(basket.ToDto());

    return BadRequest(new ProblemDetails {Title = "Problem removing item from basket"});
}


private Basket CreateBasket()
{
    var basketId = Guid.NewGuid().ToString();

    var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};

    Response.Cookies.Append("basketId", basketId, cookieOptions);

    var basket = new Basket { BasketId = basketId };

    context.Baskets.Add(basket);    

    return basket;


}

private async Task<Basket?> RetrieveBasket()
{
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
}

}
