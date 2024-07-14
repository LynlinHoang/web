using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using UIWeb.Models;
using UIWeb.Models.DTO;

namespace UIWeb.Controllers
{
    public class CategorieController : Controller
    {
        private IHttpClientFactory httpClientFactory;

        public CategorieController(IHttpClientFactory httpClientFactory)
        {
         this.httpClientFactory=httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string? filterQuery = null, int? pageNumber = 1)
        {
            List<CategorieDto> response = new List<CategorieDto>();
            try
            {
                var client = httpClientFactory.CreateClient();
                var httpResponseMessage = await client.GetAsync($"https://localhost:7228/api/Categorie?" +
                    $"filterOn=CategoryName&filterQuery={filterQuery}&pageNumber={pageNumber}&pageSize=2");
                httpResponseMessage.EnsureSuccessStatusCode();
                response.AddRange(await httpResponseMessage.Content.ReadFromJsonAsync<IEnumerable<CategorieDto>>());
                ViewBag.Response = response;
            }

            catch (Exception ex)
            {
                ViewBag.Error = "An unexpected error occurred.";
                
            }

            return View(response);
        }
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddCategoryViewModel model)
        {
            try
            {
                
                var client = httpClientFactory.CreateClient();

                var httpRequestMessage = new HttpRequestMessage()
                {
                    Method = HttpMethod.Post,
                    RequestUri = new Uri("https://localhost:7228/api/Categorie"),
                    Content = new StringContent(JsonSerializer.Serialize(model), Encoding.UTF8, "application/json")
                };
                var httpResponseMessage = await client.SendAsync(httpRequestMessage);
                httpResponseMessage.EnsureSuccessStatusCode();
                var respose = await httpResponseMessage.Content.ReadFromJsonAsync<ProductDto>();
                if (respose is not null)
                {
                    return RedirectToAction("Index");
                }
                return View();
            }
            catch (Exception ex)
            {

            }
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Edit(Guid id)
        {
            var client = httpClientFactory.CreateClient();
            var response = await client.GetFromJsonAsync<CategorieDto>($"https://localhost:7228/api/Categorie/{id.ToString()}");
            if (response is not null)
            {
                return View(response);
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Edit(CategorieDto request)
        {

            if (string.IsNullOrWhiteSpace(request.CategoryName))
                ModelState.AddModelError("CategoryName", "ProductName is not null!");

            if (!ModelState.IsValid)
            {
                return View("Edit", request);
            }
            var client = httpClientFactory.CreateClient();

            var httpRequestMessage = new HttpRequestMessage()
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri($"https://localhost:7228/api/Categorie/{request.Id}"),
                Content = new StringContent(JsonSerializer.Serialize(request), Encoding.UTF8, "application/json")
            };

            var httpResponseMessage = await client.SendAsync(httpRequestMessage);
            httpResponseMessage.EnsureSuccessStatusCode();
            var respose = await httpResponseMessage.Content.ReadFromJsonAsync<ProductDto>();
            if (respose is not null)
            {
                return RedirectToAction("Index");
                // return Json(respose);
            }
            return View("Edit");
        }
        [HttpGet]
        public async Task<IActionResult> Delete(Guid id)
        {
            var client = httpClientFactory.CreateClient();
            var response = await client.GetFromJsonAsync<CategorieDto>($"https://localhost:7228/api/Categorie/{id.ToString()}");
            if (response is not null)
            {
                return View(response);
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Delete(CategorieDto request)
        {

            try
            {
                var client = httpClientFactory.CreateClient();
                var httpRequestMessage = await client.DeleteAsync($"https://localhost:7228/api/Categorie/{request.Id}");

                httpRequestMessage.EnsureSuccessStatusCode();
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {

            }
            return View("Edit");
        }

    }
}
