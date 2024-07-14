namespace UIWeb.Models.DTO
{
    public class AddSupplierProvinceViewModel
    {
        public AddSupplierViewModel AddSupplier { get; set; }
        public ICollection<ProvinceDto> provinceDtos{ get; set; }
    }
}
