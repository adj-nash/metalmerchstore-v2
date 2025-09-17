using API.Entities;

namespace MetalMerchStore;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        query = orderBy switch
        {
            "price" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };
        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchBy)
    {
        if(string.IsNullOrEmpty(searchBy)) return query;

        var formatSearchBy = searchBy.Trim().ToLower();
        
        return query.Where(x => x.Name.ToLower().Contains(formatSearchBy));
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? category, string? band, string? genre)
    {
        var categoryList = new List<string>();
        var bandList = new List<string>();
        var genreList = new List<string>();

        if(!string.IsNullOrEmpty(category)) 
        {
            categoryList.AddRange(category.ToLower().Split(","));
        }

        if(!string.IsNullOrEmpty(band)) 
        {
            bandList.AddRange(band.ToLower().Split(","));
        }

        if(!string.IsNullOrEmpty(genre)) 
        {
            genreList.AddRange(genre.ToLower().Split(","));
        }

        query = query.Where(x => categoryList.Count == 0 || categoryList.Contains(x.Category.ToLower()));
        query = query.Where(x => bandList.Count == 0 || bandList.Contains(x.Band.ToLower()));
        query = query.Where(x => genreList.Count == 0 || genreList.Contains(x.Genre.ToLower()));

        return query;
    }

}
