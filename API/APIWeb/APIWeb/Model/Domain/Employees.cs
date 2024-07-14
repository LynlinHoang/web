namespace APIWeb.Model.Domain
{
    public class Employees
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public bool IsWorking { get; set; } = true;
        public string Password { get; set; } 

    }
}
