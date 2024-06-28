using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/detailorder")]
    [ApiController]
    public class DetailOrderController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private IDetailsOrderRepository detailsOrderRepository;
        private IMapper mapper;

        public DetailOrderController(APIDbContext aPIDbContext, IDetailsOrderRepository detailsOrderRepository,IMapper mapper)
        {
            this.aPIDbContext=aPIDbContext;
            this.detailsOrderRepository=detailsOrderRepository;
            this.mapper=mapper;
        }


        //[HttpPost]

        //public async Task<IActionResult> Create([FromBody]AddDetailOrderRequetDto  detailOrderRequetDto)
        //{
        //    var orderDetailModel = new DetailOrder
        //    {
        //            ProductID = detailOrderRequetDto.ProductID,
        //            OrderID = detailOrderRequetDto.OrderID,
        //            Quantity = detailOrderRequetDto.Quantity,
        //            SalePrice = detailOrderRequetDto.SalePrice,

        //    };
        //    var createSupplier = await detailsOrderRepository.CreateAsync(orderDetailModel);

        //    var detailorder = new DetailOrderDto
        //    {
        //        Id=createSupplier.Id,
        //        ProductID=createSupplier.ProductID,
        //        OrderID=createSupplier.OrderID,
        //        Quantity = createSupplier.Quantity,
        //        SalePrice=createSupplier.SalePrice,
        //    };
        //    return Ok(detailorder);
        //}

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetAllById([FromRoute] Guid id)
        {

            var detailOrderModel = await detailsOrderRepository.GetAllByIdAsync(id);

            if (detailOrderModel == null)
            {
                return NotFound();
            }
         
            return Ok(mapper.Map<List<DetailOrderDto>>(detailOrderModel));

        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateDetailOrderRequetDto updateDetailOrderRequet)
        {
            var detailorderModels = new DetailOrder
            {
                    Quantity = updateDetailOrderRequet.Quantity,
            };

            var detailModels = await detailsOrderRepository.UpdateAsync(id, detailorderModels);

            var detailorderDto = new DetailOrderDto
            {
                Id = detailModels.Id,
                ProductID=detailModels.ProductID,
                OrderID=detailModels.OrderID,
                Quantity = detailModels.Quantity,
                SalePrice=detailModels.SalePrice,


            };
            return Ok(detailorderDto);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var detailModels = await detailsOrderRepository.DeleteAsync(id);
            if (detailModels == null)
            {
                return NotFound();
            }
            var detailorderDto = new DetailOrderDto
            {
                Id = detailModels.Id,
                ProductID=detailModels.ProductID,
                OrderID=detailModels.OrderID,
                Quantity = detailModels.Quantity,
                SalePrice=detailModels.SalePrice,
            };
            return Ok(detailorderDto);
        }

        [HttpGet]
        [Route("count/{id:Guid}")]
        public async Task<IActionResult> GetCount([FromRoute] Guid id)
        {
            var count = await detailsOrderRepository.Count(id); 
            return Ok(count);

        }


    }
}
