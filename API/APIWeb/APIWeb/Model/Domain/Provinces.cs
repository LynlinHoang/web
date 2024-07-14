using System.ComponentModel.DataAnnotations;

namespace APIWeb.Model.Domain
{
    public class Provinces
    {
        [Key]
        public string ProvinceName { get; set; }
    }
}
