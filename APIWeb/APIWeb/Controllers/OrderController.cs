using APIWeb.Data;
using APIWeb.Model.Domain;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/order")]
    [ApiController]
    [Authorize(Roles = "employee,admin")]
    public class OrderController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private IOrderRepository orderRepository;
        private readonly IMapper mapper;
        private readonly IDetailsOrderRepository detailsOrderRepository;

        public OrderController(APIDbContext aPIDbContext, IOrderRepository orderRepository, IMapper mapper,IDetailsOrderRepository detailsOrderRepository)
        {
            this.aPIDbContext=aPIDbContext;
            this.orderRepository=orderRepository;
            this.mapper=mapper;
            this.detailsOrderRepository=detailsOrderRepository;
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddOrderRequetDto addOrderRequetDto)
        
        {
            var orderModel = new Order
            {
                DeliveryProvince=addOrderRequetDto.DeliveryProvince,
                OrderTime=addOrderRequetDto.OrderTime,
                AcceptTime=addOrderRequetDto.AcceptTime,
                DeliveryAddress=addOrderRequetDto.DeliveryAddress,
                CustomerID=addOrderRequetDto.CustomerID,
                ShippedTime=addOrderRequetDto.ShippedTime,
                EmployeeID=addOrderRequetDto.EmployeeID,
                FinishedTime=addOrderRequetDto.FinishedTime,    
                StatusID=addOrderRequetDto.StatusID,
                ShipperID =addOrderRequetDto.ShipperID,

            };
            var createdOrder = await orderRepository.CreateAsync(orderModel);

            var orderDto = new OrderDtos
            {
                Id=orderModel.Id,
                DeliveryProvince=createdOrder.DeliveryProvince,
                OrderTime=createdOrder.OrderTime,
                AcceptTime=createdOrder.AcceptTime,
                DeliveryAddress=createdOrder.DeliveryAddress,
                CustomerID=createdOrder.CustomerID,
                ShippedTime=createdOrder.ShippedTime,
                EmployeeID=createdOrder.EmployeeID,
                FinishedTime=createdOrder.FinishedTime,
                StatusID=createdOrder.StatusID,
                ShipperID =createdOrder.ShipperID,
            };

            foreach (var addDetailOrderRequet in addOrderRequetDto.DetailOrder)
            {
                var orderDetailModel = new DetailOrder
                {
                    ProductID = addDetailOrderRequet.ProductID,
                    OrderID = orderDto.Id,
                    Quantity = addDetailOrderRequet.Quantity,
                    SalePrice = addDetailOrderRequet.SalePrice,
                };

                await detailsOrderRepository.CreateAsync(orderDetailModel);
            }
           
         
            return CreatedAtAction(nameof(GetById), new { id = orderDto.Id }, orderDto);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var orderModel = await orderRepository.GetByIdAsync(id);

            if (orderModel == null)
            {
                return NotFound();
            }
            //var orderDto = new OrderDtos
            //{
            //    Id=orderModel.Id,
            //    DeliveryProvince=orderModel.DeliveryProvince,
            //    OrderTime=orderModel.OrderTime,
            //    AcceptTime=orderModel.AcceptTime,
            //    DeliveryAddress=orderModel.DeliveryAddress,
            //    CustomerID=orderModel.CustomerID,
            //    ShippedTime=orderModel.ShippedTime,
            //    EmployeeID=orderModel.EmployeeID,
            //    FinishedTime=orderModel.FinishedTime,
            //    StatusID=orderModel.StatusID,
            //    ShipperID =orderModel.ShipperID,
            //};
            return Ok(mapper.Map<Order>(orderModel));

        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                                                 [FromQuery] DateTime? fromTime = null, [FromQuery] DateTime? toTime = null,
                                                [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000,
                                                [FromQuery] string? filterOnStatus = null, [FromQuery] int filterQueryStatus = 1)
        {
            var orderModel = await orderRepository.GetAllAsync(filterOn, filterQuery, fromTime, toTime, filterOnStatus, filterQueryStatus, pageNumber, pageSize);

            //var orderDtos = orderModel.Select(orderModel => new OrderDtos
            //{
            //    Id=orderModel.Id,
            //    DeliveryProvince=orderModel.DeliveryProvince,
            //    OrderTime=orderModel.OrderTime,
            //    AcceptTime=orderModel.AcceptTime,
            //    DeliveryAddress=orderModel.DeliveryAddress,
            //    CustomerID=orderModel.CustomerID,
            //    ShippedTime=orderModel.ShippedTime,
            //    EmployeeID=orderModel.EmployeeID,
            //    FinishedTime=orderModel.FinishedTime,
            //    StatusID=orderModel.StatusID,
            //    ShipperID =orderModel.ShipperID,
            //}).ToList();

            return Ok(mapper.Map<List<Order>>(orderModel));

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var ordorModel = await orderRepository.DeleteAsync(id);
            if (ordorModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Order>(ordorModel));
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateOrderRequetDto updateOrderRequet)
        {
            var OrderRequet = new Order
            {
              
                ShippedTime = updateOrderRequet.ShippedTime,
                FinishedTime = updateOrderRequet.FinishedTime,
                AcceptTime = updateOrderRequet.AcceptTime,
                StatusID = updateOrderRequet.StatusID,
                ShipperID   = updateOrderRequet.ShipperID,

            };

            var supplierModel = await orderRepository.UpdateAsync(id, OrderRequet);

          
            return Ok(mapper.Map<Order>(supplierModel));



        }

        [HttpGet]
        [Route("pageCount")]
        public async Task<IActionResult> GetpageCount( [FromQuery] string? filterQuery,
                                                 [FromQuery] DateTime? fromTime = null, [FromQuery] DateTime? toTime = null,
                                                [FromQuery] int pageSize = 1000,
                                                [FromQuery] int filterQueryStatus = 1)
        {

            if(filterQueryStatus <= 0)
            {
                return Ok(0);
            }

          
            int pageCount = (int) await orderRepository.getPageCount(filterQuery, fromTime, toTime, filterQueryStatus, pageSize) ;

            return Ok(pageCount);
        }

    }
}
