namespace APIWeb.Model.DTO
{
    public class UpdateOrderRequetDto
    {
        public DateTime? AcceptTime { get; set; }
        public Guid? ShipperID { get; set; }
        public DateTime? ShippedTime { get; set; }
        public DateTime? FinishedTime { get; set; }
        public int StatusID { get; set; }
    }
}
