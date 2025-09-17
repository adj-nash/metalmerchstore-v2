namespace API.DTOs;

public class BasketItemDto
{
    public int ProductId { get; set;}
    public int Quantity { get; set;}
    public required string Name { get; set; }
    public long Price { get; set; }
    public required string ImageUrl { get; set; }
    public required string Category { get; set; }
    public required string Band { get; set; }

}
