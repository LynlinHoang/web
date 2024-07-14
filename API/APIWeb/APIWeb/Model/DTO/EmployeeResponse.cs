namespace APIWeb.Model.DTO
{
    public class EmployeeResponse
    {
        public int pageCout { get; set; }

        public List<EmployeeDtos> EmployeeDtos { get; set; }
    }
}
