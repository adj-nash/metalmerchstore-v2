namespace API.Entities;

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public long Price { get; set; }
    public required string ImageUrl { get; set; }
    public string? PublicId { get; set; }
    public required string Category { get; set; }
    public int Stock { get; set; }
    public char Size { get; set; }
    public required string Band { get; set; }
    public required string Genre{ get; set; }
    public int Sold { get; set; } = 0;


}
