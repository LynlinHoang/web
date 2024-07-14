using APIWeb.Data;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/province")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private IProvinceRepository provinceRepository;

        public ProvinceController(APIDbContext aPIDbContext, IProvinceRepository provinceRepository)
        {
            this.aPIDbContext=aPIDbContext;
            this.provinceRepository=provinceRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var provinceRepositorys = await provinceRepository.GetAllAsync();

            var productDtos = provinceRepositorys.Select(provinceRepositorys => new ProvinceDtos
            {
              ProvinceName=provinceRepositorys.ProvinceName

            }).ToList();
            return Ok(productDtos);
        }
    }
}
