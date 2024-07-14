using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/supplier")]
    [ApiController]
    [Authorize(Roles = "employee,admin")]
    public class SupplierController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private ISupplierRepository supplierRepository;

        public SupplierController(APIDbContext aPIDbContext, ISupplierRepository supplierRepository)
        {
            this.aPIDbContext=aPIDbContext;
            this.supplierRepository=supplierRepository;
        }


        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddSupplierRequetDto addSupplierRequetDto)
        {
            var supplierDomainModel = new Suppliers
            {
                SupplierName = addSupplierRequetDto.SupplierName,
                ContactName = addSupplierRequetDto.ContactName,
                Address = addSupplierRequetDto.Address,
                Phone = addSupplierRequetDto.Phone,
                Provice = addSupplierRequetDto.Provice,
                Email = addSupplierRequetDto.Email,

            };
            var createSupplier = await supplierRepository.CreateAsync(supplierDomainModel);

            var supplierDto = new SupplierDtos
            {
                Id=createSupplier.Id,
                Provice=createSupplier.Provice,
                Email=createSupplier.Email,
                Phone=createSupplier.Phone,
                ContactName=createSupplier.ContactName,
                Address=createSupplier.Address,
                SupplierName=createSupplier.SupplierName,
            };
            return CreatedAtAction(nameof(GetById), new { id = supplierDto.Id }, supplierDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {

            var supplierDomaiModel = await supplierRepository.GetByIdAsync(id);

            if (supplierDomaiModel == null)
            {
                return NotFound();
            }
            var supplierDto = new SupplierDtos
            {
                Id=supplierDomaiModel.Id,
                SupplierName=supplierDomaiModel.SupplierName,
                ContactName=supplierDomaiModel.ContactName,
                Address=supplierDomaiModel.Address,
                Email=supplierDomaiModel.Email,
                Phone=supplierDomaiModel.Phone,
                Provice=supplierDomaiModel.Provice,

            };
            return Ok(supplierDto);

        }


        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                                          [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
        {
            var supplierDomaiModel = await supplierRepository.GetAllAsync(filterOn, filterQuery, pageNumber, pageSize);



            var supplierDto = supplierDomaiModel.Select(supplierDomaiModel => new SupplierDtos
            {
                Id=supplierDomaiModel.Id,
                SupplierName=supplierDomaiModel.SupplierName,
                ContactName=supplierDomaiModel.ContactName,
                Address=supplierDomaiModel.Address,
                Email=supplierDomaiModel.Email,
                Phone=supplierDomaiModel.Phone,
                Provice=supplierDomaiModel.Provice,

            }).ToList();

        

            return Ok(supplierDto);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateSupplierRequetDto updateSupplierRequet)
        {
            var supplierDomainModels = new Suppliers
            {
                SupplierName=updateSupplierRequet.SupplierName,
                ContactName=updateSupplierRequet.ContactName,
                Address=updateSupplierRequet.Address,
                Email=updateSupplierRequet.Email,
                Phone=updateSupplierRequet.Phone,
                Provice = updateSupplierRequet.Provice,

            };

            var supplierModel = await supplierRepository.UpdateAsync(id, supplierDomainModels);

            var supplieryDto = new SupplierDtos
            {
                Id = supplierModel.Id,
                SupplierName =supplierModel.SupplierName,
                ContactName = supplierModel.ContactName,
                Address = supplierModel.Address,
                Email=supplierModel.Email,
                Phone=supplierModel.Phone,
                Provice=supplierModel.Provice,
            };
            return Ok(supplieryDto);



        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var supplierModel = await supplierRepository.DeleteAsync(id);
            if (supplierModel == null)
            {
                return NotFound();
            }
            var supplieryDto = new SupplierDtos
            {
                Id = supplierModel.Id,
                SupplierName =supplierModel.SupplierName,
                ContactName = supplierModel.ContactName,
                Address = supplierModel.Address,
                Email=supplierModel.Email,
                Phone=supplierModel.Phone,
                Provice=supplierModel.Provice,
            };

            return Ok(supplieryDto);
        }


        [HttpGet]
        [Route("isUsed/{id:Guid}")]
        public async Task<IActionResult> IsUsed([FromRoute] Guid id)
        {
            var IsUsed = await supplierRepository.IsUsedAsync(id);
            return Ok(IsUsed);
        }
        [HttpGet]
        [Route("pageCount")]
        public async Task<IActionResult> GetpageCount([FromQuery] int pageSize, [FromQuery] string? filterQuery)
        {
            int pageCount = await supplierRepository.getPageCount(pageSize, filterQuery) ?? 0;
            return Ok(pageCount);
        }

    }

}
