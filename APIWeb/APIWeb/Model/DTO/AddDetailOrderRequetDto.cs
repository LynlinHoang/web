namespace APIWeb.Model.DTO
{
    public class AddDetailOrderRequetDto
    {
        public Guid ProductID { get; set; }
        public int Quantity { get; set; } = 0;
        public decimal SalePrice { get; set; } = 0;
    }
}
