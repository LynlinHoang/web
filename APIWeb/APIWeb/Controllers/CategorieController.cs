using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/categorie")]
    [ApiController]
    [Authorize(Roles = "admin,employee")]
    public class CategorieController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private ICategorieRepository categorieRepository;

        public CategorieController(APIDbContext aPIDbContext, ICategorieRepository categorieRepository)
        {
            this.aPIDbContext = aPIDbContext;
            this.categorieRepository=categorieRepository;
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddCategorieRequetDto addCategorieRequetDto)
        {
            var CategorieDomainModel = new Categories
            {
                CategoryName  =addCategorieRequetDto.CategoryName,
                Description=addCategorieRequetDto.Description

            };
            var createdCategorie = await categorieRepository.CreateAsync(CategorieDomainModel);

            var categoryDto = new CategorieDtos
            {
                Id = createdCategorie.Id,
                CategoryName= createdCategorie.CategoryName,
                Description=createdCategorie.Description
            };
            return CreatedAtAction(nameof(GetById), new { id = categoryDto.Id }, categoryDto);
        }


        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {

            var categorieDomaiModel = await categorieRepository.GetByIdAsync(id);

            if (categorieDomaiModel == null)
            {
                return NotFound();
            }
            var categoryDto = new CategorieDtos
            {
                Id = categorieDomaiModel.Id,
                CategoryName=categorieDomaiModel.CategoryName,
                Description=categorieDomaiModel.Description

            };
            return Ok(categoryDto);

        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                                          [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
        {
            var categorieDomainModels = await categorieRepository.GetAllAsync(filterOn, filterQuery, pageNumber, pageSize);

            var categorieDtos = categorieDomainModels.Select(categorieDomainModels => new CategorieDtos
            {
                Id=categorieDomainModels.Id,
                CategoryName = categorieDomainModels.CategoryName,
                Description=categorieDomainModels.Description
            }).ToList();

            return Ok(categorieDtos);

        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateCategorieRequetDto updateCategorieRequetDto)
        {
            var categorieDomainModels = new Categories
            {
                CategoryName=updateCategorieRequetDto.CategoryName,
                Description=updateCategorieRequetDto.Description
            };

            var categoryModels = await categorieRepository.UpdateAsync(id, categorieDomainModels);

            var categoryDto = new CategorieDtos
            {
                Id = categoryModels.Id,
                CategoryName= categoryModels.CategoryName,
                Description=categoryModels.Description
            };


            return Ok(categoryDto);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var categoryDomaiModel = await categorieRepository.DeleteAsync(id);
            if (categoryDomaiModel == null)
            {
                return NotFound();
            }
            var categoryDto = new CategorieDtos
            {
                Id = categoryDomaiModel.Id,
                CategoryName= categoryDomaiModel.CategoryName,
                Description=categoryDomaiModel.Description
            };

            return Ok(categoryDto);
        }

        [HttpGet]
        [Route("isUsed/{id:Guid}")]
        public async Task<IActionResult> IsUsed([FromRoute] Guid id)
        {
            var IsUsed = await categorieRepository.IsUsedAsync(id);
            return Ok(IsUsed);
        }
        [HttpGet]
        [Route("pageCount")] 
        public async Task<IActionResult> GetpageCount([FromQuery] int pageSize, [FromQuery] string? filterQuery)
        {
            int pageCount = await categorieRepository.getPageCount(pageSize, filterQuery) ?? 0;

            return Ok(pageCount);
        }
    }
}
