using System.ComponentModel;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using MetalMerchStore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API.Controllers
{
    public class ProductsController(StoreContext context, IMapper mapper, ImageService imageService) : BaseController
    {

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAllProducts([FromQuery]ProductParams productParams)
    {
        var query = context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchBy)
            .Filter(productParams.Category, productParams.Band, productParams.Genre)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

        Response.AddPaginationHeader(products.Metadata);

        return products;
    }       

    [HttpGet("New")]
    public async Task<ActionResult<List<Product>>> GetNewProducts()
    {
        var products = await context.Products
        .Where(product => !product.Name.Contains("Soon"))
        .OrderByDescending(product => product.Id)
        .Take(6)
        .ToListAsync();

        return products;
    } 

    [HttpGet("Best")]
        public async Task<ActionResult<List<Product>>> GetBestSellers()
    {
        var products = await context.Products
        .OrderByDescending(product => product.Sold)
        .Take(6)
        .ToListAsync();

        return products;
    }

    [HttpGet("Soon")]
        public async Task<ActionResult<List<Product>>> GetComingSoon()
        {
            var products = await context.Products
                .Where(product => product.Name.Contains("Soon"))
                .Take(6)
                .ToListAsync();
            
            return products;
        }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await context.Products.FindAsync(id);

        if(product == null) return NotFound("There was a problem finding this product!");

        return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetProductByFilters()
    {
        var category = await context.Products.Select(x => x.Category).Distinct().ToListAsync();
        var band = await context.Products.Select(x => x.Band).Distinct().ToListAsync();
        var genre = await context.Products.Select(x => x.Genre).Distinct().ToListAsync();

        return Ok(new { category, band, genre});
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto createProductDto)
    {
        var product = mapper.Map<Product>(createProductDto);

        if(createProductDto.File != null)
        {
            var imageResult = await imageService.AddImage(createProductDto.File);

            if(imageResult.Error != null)
            {
                return BadRequest(imageResult.Error.Message);
            }

            product.ImageUrl = imageResult.SecureUrl.AbsoluteUri;
            product.PublicId = imageResult.PublicId;
        }

        context.Products.Add(product);

        var result = await context.SaveChangesAsync() > 0;

        if(result) return CreatedAtAction(nameof(GetProduct), new {Id = product.Id}, product);

        return BadRequest("Problem creating new product.");

    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult> UpdateProduct(UpdateProductDto updateProductDto)
    {
        var product = await context.Products.FindAsync(updateProductDto.Id);

        if(product == null) return NotFound();

        mapper.Map(updateProductDto, product);

        var result = await context.SaveChangesAsync() > 0;

        if(result) return NoContent();

        return BadRequest("Problem updating product.");

    }

    [Authorize(Roles = "Admin")]        
    [HttpDelete("{id}")]
     public async Task<ActionResult> DeleteProduct(int id)
     {
        var product = await context.Products.FindAsync(id);

        if(product == null) return NotFound();

        context.Products.Remove(product);

        var result = await context.SaveChangesAsync() > 0;

        if(result) return Ok();

        

        return BadRequest("Problem deleting product.");
     }


    }



}
