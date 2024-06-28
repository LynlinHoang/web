namespace APIWeb.Model.DTO
{
    public class UpdateDetailOrderRequetDto
    {
        public Guid ProductID { get; set; }
        public Guid OrderID { get; set; }
        public int Quantity { get; set; } = 0;
        public decimal SalePrice { get; set; } = 0;
    }
}
