using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/product")]
    [ApiController]
    [Authorize(Roles = "employee,admin")]

    public class ProductController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private IProductRepository productRepository;
        private IHttpContextAccessor httpContextAccessor;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ProductController(APIDbContext aPIDbContext, IProductRepository productRepository, 
            IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment)
        {
            this.aPIDbContext=aPIDbContext;
            this.productRepository=productRepository;
            this.httpContextAccessor=httpContextAccessor;
            this.webHostEnvironment=webHostEnvironment;
        }

        

        [HttpPost]

        public async Task<IActionResult> Create([FromForm] AddProductRequetDto addProductRequetDto)
        {
            string? urlFilePath = "";
            if (addProductRequetDto.UploadFile!=null)
            {
                var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images/Products",
             $"{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(addProductRequetDto.UploadFile.FileName)}");

                using var stream = new FileStream(localFilePath, FileMode.Create);

                await addProductRequetDto.UploadFile.CopyToAsync(stream);

                urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                   $"{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}" +
                   $"/Images/Products/{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(addProductRequetDto.UploadFile.FileName)}";
            }
         

            var productDomainModel = new Products
            {
                ProductName = addProductRequetDto.ProductName,
                ProductDescription = addProductRequetDto.ProductDescription,
                Unit = addProductRequetDto.Unit,
                Price = addProductRequetDto.Price,
                Photo=urlFilePath,
                IsSelling = addProductRequetDto.IsSelling,
                CategoryID = addProductRequetDto.CategoryID,
                SupplierID = addProductRequetDto.SupplierID,
            };

            var createdProduct = await productRepository.CreateAsync(productDomainModel);


            var productDto = new ProductDtos
            {
                Id = createdProduct.Id,
                ProductName = createdProduct.ProductName,
                ProductDescription = createdProduct.ProductDescription,
                Unit = createdProduct.Unit,
                Price = createdProduct.Price,
                Photo = createdProduct.Photo,
                IsSelling = createdProduct.IsSelling,
                CategoryID = createdProduct.CategoryID,
                SupplierID = createdProduct.SupplierID,
            };

            return CreatedAtAction(nameof(GetById), new { id = productDto.Id }, productDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {

            var productDomaiModel = await productRepository.GetByIdAsync(id);

            if (productDomaiModel == null)
            {
                return NotFound();
            }
            var productDto = new ProductDtos
            {
                Id = productDomaiModel.Id,
                ProductName = productDomaiModel.ProductName,
                ProductDescription = productDomaiModel.ProductDescription,
                Unit=productDomaiModel.Unit,
                Price=productDomaiModel.Price,
                Photo=productDomaiModel.Photo,
                SupplierID  = productDomaiModel.SupplierID,
                CategoryID = productDomaiModel.CategoryID,
                IsSelling=productDomaiModel.IsSelling,
            };
            return Ok(productDto);

        }

        [HttpGet]
       
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                                          [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
        {
            

            var productRepositorys = await productRepository.GetAllAsync(filterOn, filterQuery, 
                pageNumber, pageSize);

            var productDtos = productRepositorys.Select(productDomainModel => new ProductDtos
            {
                Id = productDomainModel.Id,
                ProductName = productDomainModel.ProductName,
                ProductDescription = productDomainModel.ProductDescription,
                Unit = productDomainModel.Unit,
                Price = productDomainModel.Price,
                Photo = productDomainModel.Photo,
                SupplierID = productDomainModel.SupplierID,
                CategoryID = productDomainModel.CategoryID,
             

            }).ToList();

            //var response = new ProductResponse
            //{
            //    pageCout = pageCount,
            //    ProductDtos = productDtos
            //};

            return Ok(productDtos);
        }


        [HttpPut]
        [Route("{id:Guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, 
            [FromForm] UpdateProductRequetDto updateProductRequetDto)
        {
            var getPhoto = await productRepository.GetByIdAsync(id);

            if (getPhoto == null)
            {
                return NotFound();
            }

            var photo = new ProductDtos
            {
                Photo=getPhoto.Photo,
            };
            string? urlFilePath = photo.Photo;

            if (updateProductRequetDto.UploadFile!=null)
            {
                var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images/Products",
                     $"{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(updateProductRequetDto.UploadFile.FileName)}");

                using var stream = new FileStream(localFilePath, FileMode.Create);

                await updateProductRequetDto.UploadFile.CopyToAsync(stream);

                urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                   $"{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}" +
                   $"/Images/Products/{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(updateProductRequetDto.UploadFile.FileName)}";
            }  
            var productDomainModel = new Products
            {
                ProductName = updateProductRequetDto.ProductName,
                ProductDescription = updateProductRequetDto.ProductDescription,
                Unit = updateProductRequetDto.Unit,
                Price = updateProductRequetDto.Price,
                Photo = urlFilePath,
                IsSelling = updateProductRequetDto.IsSelling,
                CategoryID = updateProductRequetDto.CategoryID,
                SupplierID = updateProductRequetDto.SupplierID,
            };

            var productDomaiModel = await productRepository.UpdateAsync(id, productDomainModel);

            if (productDomaiModel == null)
            {
                return NotFound();
            }

            var productDto = new ProductDtos
            {
                Id = productDomaiModel.Id,
                ProductName = productDomaiModel.ProductName,
                Unit = productDomaiModel.Unit,
                Price = productDomaiModel.Price,
                Photo = productDomaiModel.Photo,
                IsSelling = productDomaiModel.IsSelling,
                CategoryID = productDomaiModel.CategoryID,
                SupplierID = productDomaiModel.SupplierID,
            };

            return Ok(productDto);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var productDomaiModel = await productRepository.DeleteAsync(id);
            if (productDomaiModel == null)
            {
                return NotFound();
            }
            var productDomaiModelDto =new ProductDtos
            {
                Id= productDomaiModel.Id,
                ProductName = productDomaiModel.ProductName,
                ProductDescription = productDomaiModel.ProductDescription,
                Unit = productDomaiModel.Unit,
                Price = productDomaiModel.Price,
                Photo= productDomaiModel.Photo,
                CategoryID= productDomaiModel.CategoryID,
                SupplierID  = productDomaiModel.SupplierID,
            };

            return Ok(productDomaiModelDto);
        }

        [HttpGet]
        [Route("isUsed/{id:Guid}")]
        public async Task<IActionResult> IsUsed([FromRoute] Guid id)
        {
            var IsUsed = await productRepository.IsUsedAsync(id);
            return Ok(IsUsed);
        }


        [HttpGet]
        [Route("pageCount")]
        public async Task<IActionResult> GetpageCount([FromQuery] int pageSize, [FromQuery] string? filterQuery = null)
        {
            int pageCount = await productRepository.getPageCount(pageSize, filterQuery) ?? 0;

            return Ok(pageCount);
        }


    }

}
