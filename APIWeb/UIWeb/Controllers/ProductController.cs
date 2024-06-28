using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using UIWeb.Models;
using UIWeb.Models.DTO;

namespace UIWeb.Controllers
{
    public class ProductController : Controller
    {
        private IHttpClientFactory httpClientFactory;

        public ProductController(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
        }
        [HttpGet]
        public async Task<IActionResult> Index(string?filterQuery=null ,int? pageNumber = 1)
        {
            List<ProductDto> response = new List<ProductDto>();
            try
            {
                var client = httpClientFactory.CreateClient();
                var httpResponseMessage = await client.GetAsync($"https://localhost:7228/api/Product?filterOn=ProductName&filterQuery={filterQuery}&pageNumber={pageNumber}&pageSize=5");
                httpResponseMessage.EnsureSuccessStatusCode();

                var pageProductDto = await httpResponseMessage.Content.ReadFromJsonAsync<PageProductDto>();


                var pageCount = pageProductDto.pageCout;

                response = pageProductDto.ProductDtos;


                ViewBag.PageCount = pageCount;
            }
            catch (Exception ex)
            {
                ViewBag.Error = "An unexpected error occurred.";
            }

            return View(response);
        }

        [HttpGet]
        public async Task<IActionResult>Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddProductViewModel model)
        {

            //var client = httpClientFactory.CreateClient();
            //var httpRequestMessage = new HttpRequestMessage()
            //{
            //    Method = HttpMethod.Post,
            //    RequestUri = new Uri("https://localhost:7228/api/Product"),
            //    Content = new StringContent(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json")
            //};
            //var httpResponseMessage = await client.SendAsync(httpRequestMessage);
            //httpResponseMessage.EnsureSuccessStatusCode();
            //var respose = await httpResponseMessage.Content.ReadFromJsonAsync<ProductDto>();
            //if (respose is not null)
            //{
            //    return RedirectToAction("Index");
            //}
            //return View();
            return Json(model);

        }
        [HttpGet]
        public async Task<IActionResult> Edit(Guid id)
        {
            List<CategorieDto> categories = new List<CategorieDto>();

            try
            {
                var client = httpClientFactory.CreateClient();
                var categoriesResponse = await client.GetAsync("https://localhost:7228/api/Categorie");
                categoriesResponse.EnsureSuccessStatusCode(); 
                categories.AddRange(await categoriesResponse.Content.ReadFromJsonAsync<ICollection<CategorieDto>>());


                var response = await client.GetFromJsonAsync<ProductDto>($"https://localhost:7228/api/Product/{id}");
                var viewModel = new ProductCategoryViewModel
                {
                    Products = response,
                    Categories = categories
                };

                if (response != null)
                {
                    return View(viewModel);
                }
            }
           
            catch (Exception ex)
            {
                ViewBag.Error = "An unexpected error occurred.";
            }
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Edit(ProductCategoryViewModel request)
        {

            var products = new ProductDto
            {
                Id=request.Products.Id,
                IsSelling=request.Products.IsSelling,
                ProductName=request.Products.ProductName,
                ProductDescription=request.Products.ProductDescription,
                Unit=request.Products.Unit,
                Price=request.Products.Price,
                Photo=request.Products.Photo,
                CategoryID=request.Products.CategoryID,
                SupplierID  =request.Products.SupplierID,
            };

            var client = httpClientFactory.CreateClient();

            var httpRequestMessage = new HttpRequestMessage()
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri($"https://localhost:7228/api/Product/{products.Id}"),
                Content = new StringContent(JsonSerializer.Serialize(products), Encoding.UTF8, "application/json")
            };

            var httpResponseMessage = await client.SendAsync(httpRequestMessage);
            httpResponseMessage.EnsureSuccessStatusCode();
            var respose = await httpResponseMessage.Content.ReadFromJsonAsync<ProductDto>();
            if (respose is not null)
            {
                return RedirectToAction("Index");
            }
            return View("Edit");
        }
        [HttpGet]
        public async Task<IActionResult> Delete(Guid id)
        {
            var client = httpClientFactory.CreateClient();
            var response = await client.GetFromJsonAsync<ProductDto>($"https://localhost:7228/api/Product/{id.ToString()}");
            if (response is not null)
            {
                return View(response);
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ProductDto request)
        {

            try
            {
                var client = httpClientFactory.CreateClient();
                var httpRequestMessage = await client.DeleteAsync($"https://localhost:7228/api/Product/{request.Id}");

                httpRequestMessage.EnsureSuccessStatusCode();
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ViewBag.Error = "An unexpected error occurred.";
            }
            return View("Edit");
        }

    }
}
