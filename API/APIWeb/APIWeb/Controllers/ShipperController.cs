using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/shipper")]
    [ApiController]
    [Authorize(Roles = "employee,admin")]
    public class ShipperController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private IShipperRepository shipperRepository;

        public ShipperController(APIDbContext aPIDbContext, IShipperRepository shipperRepository)
        {
            this.aPIDbContext=aPIDbContext;
            this.shipperRepository=shipperRepository;

        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddShipperRequetDto addShipperRequetDto)
        {
            var shipperModel = new Shippers
            {
                ShipperName=addShipperRequetDto.ShipperName,
                Phone=addShipperRequetDto.Phone,

            };
            var createShipper = await shipperRepository.CreateAsync(shipperModel);

            var shipperDto = new ShipperDtos
            {
                Id=createShipper.Id,
                ShipperName=createShipper.ShipperName,
                Phone=createShipper.Phone

            };
            return CreatedAtAction(nameof(GetById), new { id = shipperDto.Id }, shipperDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {

            var shipperModel = await shipperRepository.GetByIdAsync(id);

            if (shipperModel == null)
            {
                return NotFound();
            }
            var shipperDtos = new ShipperDtos
            {
                Id = shipperModel.Id,
                ShipperName = shipperModel.ShipperName,
                Phone=shipperModel.Phone,


            };
            return Ok(shipperDtos);

        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                                          [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
        {
            var shipperModel = await shipperRepository.GetAllAsync(filterOn, filterQuery, pageNumber, pageSize);


            var shipperDto = shipperModel.Select(shipperModel => new ShipperDtos
            {
                Id=shipperModel.Id,
                ShipperName=shipperModel.ShipperName,
                Phone=shipperModel.Phone,

            }).ToList();



            return Ok(shipperDto);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateShipperRequetDto updateShipperRequet)
        {
            var shipperModels = new Shippers
            {
                ShipperName=updateShipperRequet.ShipperName,
                Phone = updateShipperRequet.Phone,

            };

            var updateModel = await shipperRepository.UpdateAsync(id, shipperModels);

            var shipperDto = new ShipperDtos
            {
                Id=updateModel.Id,
                ShipperName=updateModel.ShipperName,
                Phone=updateModel.Phone,
            };
            return Ok(shipperDto);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var shipperModel = await shipperRepository.DeleteAsync(id);
            if (shipperModel == null)
            {
                return NotFound();
            }
            var shipperDto = new ShipperDtos
            {
                Id = shipperModel.Id,
                ShipperName = shipperModel.ShipperName,
                Phone = shipperModel.Phone,

            };

            return Ok(shipperDto);
        }

        [HttpGet]
        [Route("isUsed/{id:Guid}")]
        public async Task<IActionResult> IsUsed([FromRoute] Guid id)
        {
            var IsUsed = await shipperRepository.IsUsedAsync(id);
            return Ok(IsUsed);
        }

        [HttpGet]
        [Route("pageCount")]
        public async Task<IActionResult> GetpageCount([FromQuery] int pageSize, [FromQuery] string? filterQuery = null)
        {
            int pageCount = await shipperRepository.getPageCount(pageSize, filterQuery) ?? 0;

            return Ok(pageCount);
        }


    }
}
