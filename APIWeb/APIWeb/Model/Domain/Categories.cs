using System.ComponentModel.DataAnnotations;

namespace APIWeb.Model.Domain
{
    public class Categories
    {

        public Guid Id { get; set; }

        public string CategoryName { get; set; }

        public string? Description { get; set; }
    }
}
