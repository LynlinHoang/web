using System.ComponentModel.DataAnnotations;

namespace APIWeb.Model.Domain
{
    public class StatusOrder
    {
        [Key]
        public int Status { get; set; }
        public string Description { get; set; }

    }
}
