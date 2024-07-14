using Microsoft.AspNetCore.Http;

namespace APIWeb.Model.DTO
{
    public class AddEmployeeRequetDto
    {

        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; }
        public IFormFile? UploadFile { get; set; }
        public bool IsWorking { get; set; } = true;

    }
}
