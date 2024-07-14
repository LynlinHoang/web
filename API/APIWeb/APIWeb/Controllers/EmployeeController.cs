using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/employee")]

    [ApiController]
   [Authorize(Roles = "admin")]
    public class EmployeeController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private IHttpContextAccessor httpContextAccessor;
        private IEmployeeRepository employeeRepository;
        private IWebHostEnvironment webHostEnvironment;

        public EmployeeController(APIDbContext aPIDbContext, IEmployeeRepository employeeRepository,
            IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment)
        {
            this.aPIDbContext=aPIDbContext;
            this.httpContextAccessor = httpContextAccessor;
            this.employeeRepository=employeeRepository;
            this.webHostEnvironment=webHostEnvironment;
        }
        [HttpPost]

        public async Task<IActionResult> Create([FromForm] AddEmployeeRequetDto addEmployeeRequetDto)
        {
            string? urlFilePath = "";


            if (addEmployeeRequetDto.UploadFile!=null)
            {
                var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images/Employees",
                $"{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(addEmployeeRequetDto.UploadFile.FileName)}");

                using var stream = new FileStream(localFilePath, FileMode.Create);

                await addEmployeeRequetDto.UploadFile.CopyToAsync(stream);

                urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                   $"{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}" +
                   $"/Images/Employees/{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(addEmployeeRequetDto.UploadFile.FileName)}";
            }


            var employeeDomainModel = new Employees
            {
                   FullName= addEmployeeRequetDto.FullName,
                   BirthDate= addEmployeeRequetDto.BirthDate,
                   Address= addEmployeeRequetDto.Address,
                   Phone= addEmployeeRequetDto.Phone,
                   Email= addEmployeeRequetDto.Email,
                   Photo   =urlFilePath,
                   IsWorking= addEmployeeRequetDto.IsWorking,
            };

            var createdEmployee = await employeeRepository.CreateAsync(employeeDomainModel);


            var employeeDto = new EmployeeDtos
            {

              Id = createdEmployee.Id,
              FullName=createdEmployee.FullName,
              BirthDate=createdEmployee.BirthDate,
              Address=createdEmployee.Address,
              Phone=createdEmployee.Phone,
              Email=createdEmployee.Email,
              Photo=createdEmployee.Photo,
              IsWorking = createdEmployee.IsWorking,
            };

            return CreatedAtAction(nameof(GetById), new { id = employeeDto.Id }, employeeDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {

            var employeeDomainModel = await employeeRepository.GetByIdAsync(id);

            if (employeeDomainModel == null)
            {
                return NotFound();
            }
            var employeeDto = new EmployeeDtos
            {
                Id = employeeDomainModel.Id,
                FullName=employeeDomainModel.FullName,
                BirthDate=employeeDomainModel.BirthDate,
                Address=employeeDomainModel.Address,
                Phone=employeeDomainModel.Phone,
                Email=employeeDomainModel.Email,
                Photo=employeeDomainModel.Photo,
                IsWorking = employeeDomainModel.IsWorking,
            };
            return Ok(employeeDto);

        }

        [HttpGet]

        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                                          [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
        {
            

            var employeeRepositories = await employeeRepository.GetAllAsync(filterOn, filterQuery,
                pageNumber, pageSize);

            var employeeDtos = employeeRepositories.Select(employeeDomainModel => new EmployeeDtos
            {
               Id = employeeDomainModel.Id,
               FullName=employeeDomainModel.FullName,
               BirthDate=employeeDomainModel.BirthDate,
               Address=employeeDomainModel.Address,
               Phone=employeeDomainModel.Phone,
               Email=employeeDomainModel.Email,
               Photo=employeeDomainModel.Photo,
               IsWorking=employeeDomainModel.IsWorking,


            }).ToList();

            //var response = new EmployeeResponse
            //{
            //    pageCout = pageCount,
            //    EmployeeDtos = employeeDtos
            //};

            return Ok(employeeDtos);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var employeeDomainModel = await employeeRepository.DeleteAsync(id);
            if (employeeDomainModel == null)
            {
                return NotFound();
            }
            var employeeDomainModelDto = new EmployeeDtos
            {
                Id = employeeDomainModel.Id,
                FullName=employeeDomainModel.FullName,
                BirthDate=employeeDomainModel.BirthDate,
                Address=employeeDomainModel.Address,
                Phone=employeeDomainModel.Phone,
                Email=employeeDomainModel.Email,
                Photo=employeeDomainModel.Photo,
                IsWorking=employeeDomainModel.IsWorking,
            };

            return Ok(employeeDomainModelDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromForm] UpdateEmployeeRequetDto updateEmployeeRequetDto)
        {


            var getphoto = await employeeRepository.GetByIdAsync(id);

            if (getphoto == null)
            {
                return NotFound();
            }
            var employeeDto = new EmployeeDtos
            {
            
                Photo=getphoto.Photo,          
            };
            string? urlFilePath = employeeDto.Photo;
            if (updateEmployeeRequetDto.UploadFile!=null)
            {
                var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images/Employees",
            $"{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(updateEmployeeRequetDto.UploadFile.FileName)}");

                using var stream = new FileStream(localFilePath, FileMode.Create);

                await updateEmployeeRequetDto.UploadFile.CopyToAsync(stream);

                urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                   $"{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}" +
                   $"/Images/Employees/{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(updateEmployeeRequetDto.UploadFile.FileName)}";
            }
            

            var employeeDomainModel = new Employees
            {
                FullName= updateEmployeeRequetDto.FullName,
                BirthDate= updateEmployeeRequetDto.BirthDate,
                Address= updateEmployeeRequetDto.Address,
                Phone= updateEmployeeRequetDto.Phone,
                Email= updateEmployeeRequetDto.Email,
                Photo   =urlFilePath,
                IsWorking= updateEmployeeRequetDto.IsWorking,
            };

            var updateEmployee = await employeeRepository.UpdateAsync(id, employeeDomainModel);

            if (updateEmployee == null)
            {
                return NotFound();
            }

            var employeeDtos = new EmployeeDtos
            {
                    Id = updateEmployee.Id,
                    FullName= updateEmployee.FullName,
                    BirthDate= updateEmployee.BirthDate,
                    Address= updateEmployee.Address, 
                    Phone= updateEmployee.Phone,
                    Email= updateEmployee.Email,
                    Photo=updateEmployee.Photo,
                    IsWorking= updateEmployee.IsWorking,

            };

            return Ok(employeeDtos);
        }

        [HttpGet]
        [Route("isUsed/{id:Guid}")]
        public async Task<IActionResult> IsUsed([FromRoute] Guid id)
        {
            var IsUsed = await employeeRepository.IsUsedAsync(id);
            return Ok(IsUsed);
        }
        [HttpGet]
        [Route("pageCount")]
        public async Task<IActionResult> GetpageCount([FromQuery] int pageSize, [FromQuery] string? filterQuery = null)
        {
            int pageCount = await employeeRepository.getPageCount(pageSize, filterQuery) ?? 0;
            return Ok(pageCount);
        }


    }
}
