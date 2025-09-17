using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public required string BasketId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public string? ClientSecret { get; set; }
        public string? PaymentIntentId { get; set; }

        public void AddItem(Product product, int quantity)
        {
            if(product == null) ArgumentNullException.ThrowIfNull(product);
            if(quantity <= 0) throw new ArgumentException("Quantity must be greater than zero.", nameof(quantity));

            var existingItem = FindProduct(product.Id);

            if(existingItem == null)
            {
                Items.Add(new BasketItem 
                {
                    Quantity = quantity,
                    Product = product
                });
            } 
            else 
            {
                existingItem.Quantity += quantity;
            }
            

        }

        public void RemoveItem(int productId, int quantity)
        {
            if(quantity <= 0) throw new ArgumentException("Quantity must be greater than zero.", nameof(quantity));

            var existingItem = FindProduct(productId);
            if(existingItem == null) return;

            existingItem.Quantity -= quantity;
            if(existingItem. Quantity <= 0) Items.Remove(existingItem);

        }

        //Find product helper function
        private BasketItem? FindProduct(int id)
        {
            return Items.FirstOrDefault(x => x.ProductId == id);
        }
    }
}