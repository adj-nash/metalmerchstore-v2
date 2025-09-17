using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string? OrderBy { get; set; }
        public string? SearchBy { get; set; }
        public string? Category { get; set; }
        public string? Band { get; set; }
        public string? Genre { get; set; }

    }
}