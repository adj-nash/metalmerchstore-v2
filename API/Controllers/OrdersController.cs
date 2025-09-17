using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using MetalMerchStore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController(StoreContext context) : BaseController
    {

    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        var orders = await context.Orders
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUsername())
            .ToListAsync();

        return orders;
        
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        var order = await context.Orders
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUsername() && id == x.Id)
            .FirstOrDefaultAsync();

        if(order == null) return NotFound();

        return order;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if(basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId)) return BadRequest("Basket is empty or not found");

        var items = CreateOrderItems(basket.Items);
        if(items == null) return BadRequest("Items out of stock");

        var subtotal = items.Sum(x => x.Price * x.Quantity);
        var delivery = CalculateDeliveryFee(subtotal);

        var order = await context.Orders
        .Include(x => x.OrderItems)
        .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);

        if(order == null)
        {
            order = new Order
        {
            OrderItems = items,
            BuyerEmail = User.GetUsername(),
            ShippingAddress = orderDto.ShippingAddress,
            DeliveryFee = delivery,
            Subtotal = subtotal,
            PaymentSummary = orderDto.PaymentSummary, 
            PaymentIntentId = basket.PaymentIntentId,  
        };
        context.Orders.Add(order);
        }
        else
        {
            order.OrderItems = items;
        }

        var result = await context.SaveChangesAsync() > 0;

        if(!result) return BadRequest();

        return CreatedAtAction(nameof(GetOrder), new {id = order.Id}, order.ToDto());

    }

        private long CalculateDeliveryFee(long subtotal)
        {
            return subtotal > 10000 ? 0 : 500;
        }

        private List<OrderItems>?
        CreateOrderItems(List<BasketItem> items)
        {
            var orderItems = new List<OrderItems>();

            foreach(var item in items)
            {
                if(item.Product.Stock < item.Quantity) return null;

                var orderItem = new OrderItems
                {
                    ProductOrdered = new ProductOrdered
                    {
                        ProductId = item.ProductId,
                        Name = item.Product.Name,
                        PictureUrl = item.Product.ImageUrl
                    },
                    Price = item.Product.Price,
                    Quantity = item.Quantity,

                };
                orderItems.Add(orderItem);

                item.Product.Stock -= item.Quantity;
                item.Product.Sold += item.Quantity;
            }
            return orderItems;
            
        }
    }
}