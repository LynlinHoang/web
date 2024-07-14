using APIWeb.Model.Domain;

namespace APIWeb.Model.DTO
{
    public class UpdateProductRequetDto
    {
        public string ProductName { get; set; }

        public string? ProductDescription { get; set; }

        public string? Unit { get; set; }

        public decimal Price { get; set; }

        public IFormFile? UploadFile { get; set; }

        public bool IsSelling { get; set; }

        public Guid SupplierID { get; set; }

        public Guid CategoryID { get; set; }




    }
}
