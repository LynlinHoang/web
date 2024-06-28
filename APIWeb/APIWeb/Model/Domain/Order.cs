namespace APIWeb.Model.Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTime OrderTime { get; set; }
        public DateTime? AcceptTime { get; set; }
        public Guid CustomerID { get; set; }
        public string DeliveryProvince { get; set; }
        public string DeliveryAddress { get; set; }
        public Guid? EmployeeID { get; set; }
        public Guid? ShipperID { get; set; }
        public DateTime? ShippedTime { get; set; }
        public DateTime? FinishedTime { get; set; }
        public int StatusID { get; set; }

        public Employees Employee { get; set; }
        public Shippers Shipper { get; set; }
        public Customers Customer { get; set; }
        public StatusOrder Status { get; set; }


    }
}
