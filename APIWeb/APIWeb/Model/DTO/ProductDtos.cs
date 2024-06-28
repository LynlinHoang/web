using APIWeb.Model.Domain;

namespace APIWeb.Model.DTO
{
    public class ProductDtos
    {
        public Guid Id { get; set; }

        public string ProductName { get; set; }

        public string? ProductDescription { get; set; }

        public string? Unit { get; set; }

        public decimal Price { get; set; }
    
        public string? Photo { get; set; }

        public bool IsSelling { get; set; }

        public Guid SupplierID { get; set; }

        public Guid CategoryID { get; set; }

 
    }
}
