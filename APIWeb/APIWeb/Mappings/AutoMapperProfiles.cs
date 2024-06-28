using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using AutoMapper;

namespace APIWeb.Mappings
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Order, OrderDtos>().ReverseMap();
            CreateMap<DetailOrder, DetailOrderDto>().ReverseMap();
        }
    }
}
