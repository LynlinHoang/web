namespace UIWeb.Models.DTO
{
    public class ProductCategoryViewModel
    {
        public ProductDto Products { get; set; }
        public ICollection<CategorieDto> Categories { get; set; }
    }
}
