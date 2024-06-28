using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/customer")]
    [ApiController]
    [Authorize(Roles = "employee,admin")]
    public class CustomerController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private ICustomerRepository customerRepository;

        public CustomerController(APIDbContext aPIDbContext, ICustomerRepository customerRepository)
        {
            this.aPIDbContext=aPIDbContext;
            this.customerRepository=customerRepository;
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddCustomerRequetDto addCustomerRequetDto)
        {
            var addCustomerModel = new Customers
            {
                CustomerName = addCustomerRequetDto.CustomerName,
                ContactName=addCustomerRequetDto.ContactName,
                Phone = addCustomerRequetDto.Phone,
                Email = addCustomerRequetDto.Email,
                Address = addCustomerRequetDto.Address,
                IsLocked= addCustomerRequetDto.IsLocked,
                Province = addCustomerRequetDto.Province,



            };
            var createCutomer = await customerRepository.CreateAsync(addCustomerModel);

            var customerDto = new CustomerDtos
            {
                Id = createCutomer.Id,
                CustomerName = createCutomer.CustomerName,
                ContactName = createCutomer.ContactName,
                Phone = createCutomer.Phone,
                Email = createCutomer.Email,
                Address = createCutomer.Address,
                IsLocked = createCutomer.IsLocked,

            };
            return CreatedAtAction(nameof(GetById), new { id = customerDto.Id }, customerDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {

            var customerModel = await customerRepository.GetByIdAsync(id);

            if (customerModel == null)
            {
                return NotFound();
            }
            var customerDto = new CustomerDtos
            {
                Id= customerModel.Id,
                CustomerName = customerModel.CustomerName,
                ContactName = customerModel.ContactName,
                Phone = customerModel.Phone,
                Email = customerModel.Email,
                Address = customerModel.Address,
                IsLocked = customerModel.IsLocked,
                Province= customerModel.Province,
            };
            return Ok(customerDto);

        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                                          [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
        {
            var customerModel = await customerRepository.GetAllAsync(filterOn, filterQuery, pageNumber, pageSize);




            var customerDto = customerModel.Select(supplierDomaiModel => new CustomerDtos
            {
                Id = supplierDomaiModel.Id,
                ContactName= supplierDomaiModel.ContactName,
                CustomerName= supplierDomaiModel.CustomerName,
                Email = supplierDomaiModel.Email,
                Province= supplierDomaiModel.Province,
                Phone = supplierDomaiModel.Phone,
                Address = supplierDomaiModel.Address,
                IsLocked= supplierDomaiModel.IsLocked,

            }).ToList();



            return Ok(customerDto);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateCustomerRequetDto updateCustomerRequet)
        {
            var customerModels = new Customers
            {
                CustomerName = updateCustomerRequet.CustomerName,
                ContactName = updateCustomerRequet.ContactName,
                Address = updateCustomerRequet.Address,
                Email = updateCustomerRequet.Email,
                Phone = updateCustomerRequet.Phone,
                IsLocked = updateCustomerRequet.IsLocked,
                Province = updateCustomerRequet.Province,

            };

            var supplierModel = await customerRepository.UpdateAsync(id, customerModels);

            var custumerDto = new CustomerDtos
            {
                CustomerName= supplierModel.CustomerName,
                ContactName= supplierModel.ContactName,
                Address = supplierModel.Address,
                Email = supplierModel.Email,
                Phone = supplierModel.Phone,
                IsLocked = supplierModel.IsLocked,
                Province= supplierModel.Province,
            };
            return Ok(custumerDto);



        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var customerModel = await customerRepository.DeleteAsync(id);
            if (customerModel == null)
            {
                return NotFound();
            }
            var customerDto = new CustomerDtos
            {
                CustomerName = customerModel.CustomerName,
                ContactName = customerModel.ContactName,
                Address = customerModel.Address,
                Email = customerModel.Email,
                Phone = customerModel.Phone,
                IsLocked = customerModel.IsLocked,
                Province= customerModel.Province,

            };
            return Ok(customerDto);
        }

        [HttpGet]
        [Route("isUsed/{id:Guid}")]
        public async Task<IActionResult> IsUsed([FromRoute] Guid id)
        {
            var IsUsed = await customerRepository.IsUsedAsync(id);
            return Ok(IsUsed);
        }


        [HttpGet]
        [Route("pageCount")]
        public async Task<IActionResult> GetpageCount([FromQuery] int pageSize, [FromQuery] string? filterQuery = null)
        {
            int pageCount = await customerRepository.getPageCount(pageSize, filterQuery) ?? 0;

            return Ok(pageCount);
        }



    }
}
