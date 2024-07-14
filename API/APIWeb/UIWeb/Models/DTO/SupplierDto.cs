namespace UIWeb.Models.DTO
{
    public class SupplierDto
    {
        public Guid Id { get; set; }
        public string SupplierName { get; set; }
        public string? ContactName { get; set; }
        public string Provice { get; set; }
        public string? Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

    }
}
