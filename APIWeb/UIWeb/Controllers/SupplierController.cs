using Microsoft.AspNetCore.Mvc;
using UIWeb.Models.DTO;

namespace UIWeb.Controllers
{
    public class SupplierController : Controller
    {
        private IHttpClientFactory httpClientFactory;

        public SupplierController(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory=httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string? filterQuery = null, int? pageNumber = 1)
        {
            //List<SupplierDto> response = new List<SupplierDto>();
            //try
            //{
            //    var client = httpClientFactory.CreateClient();
            //    var httpResponseMessage = await client.GetAsync($"https://localhost:7228/api/Supplier?filterOn=SupplierName&" +
            //        $"filterQuery={filterQuery}&pageNumber={pageNumber}&pageSize=5");

            //    httpResponseMessage.EnsureSuccessStatusCode();

            //    var pageSupplierDto = await httpResponseMessage.Content.ReadFromJsonAsync<PageSupplierDto>();

            //    var pageCount = pageSupplierDto.pageCout;

            //    response = pageSupplierDto.SupplierDto;

            //    ViewBag.PageCount = pageCount;
            //}
            //catch (Exception ex)
            //{
            //    ViewBag.Error = "An unexpected error occurred.";
            //}

            //return View(response);

            List<SupplierDto> response = new List<SupplierDto>();
            try
            {
                var client = httpClientFactory.CreateClient();
                var httpResponseMessage = await client.GetAsync($"https://localhost:7228/api/Supplier?" +
                    $"filterOn=CategoryName&filterQuery={filterQuery}&pageNumber={pageNumber}&pageSize=5");
                httpResponseMessage.EnsureSuccessStatusCode();
                response.AddRange(await httpResponseMessage.Content.ReadFromJsonAsync<IEnumerable<SupplierDto>>());
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

            List<ProvinceDto> provinces = new List<ProvinceDto>();
            try
            {
                var client = httpClientFactory.CreateClient();
                var provinceResponse = await client.GetAsync("https://localhost:7228/api/Province");
                provinceResponse.EnsureSuccessStatusCode();
                provinces.AddRange(await provinceResponse.Content.ReadFromJsonAsync<ICollection<ProvinceDto>>());

                var viewModel = new AddSupplierProvinceViewModel
                {
                    provinceDtos = provinces,
                    AddSupplier= null,
                };

            }

            catch (Exception ex)
            {
                ViewBag.Error = "An unexpected error occurred.";

            }
            return View();
        }

    }
}
