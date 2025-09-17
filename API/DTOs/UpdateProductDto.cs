using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateProductDto
    {
    public int Id { get; set; }
    [Required]
    public required string Name { get; set; } = string.Empty;
    [Required]
    public required string Description { get; set; } = string.Empty;
    [Required]
    [Range(100, double.PositiveInfinity)]
    public long Price { get; set; }
    public IFormFile? File { get; set; } 
    [Required]
    public required string Category { get; set; } = string.Empty;
    [Required]
    [Range(0, 200)]
    public int Stock { get; set; }
    [Required]
    public char Size { get; set; }
    [Required]
    public string Band { get; set; } = string.Empty;
    [Required]
    public string Genre{ get; set; } = string.Empty;
    public int Sold { get; set; } = 0;
    }
}