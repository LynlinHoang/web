﻿namespace APIWeb.Model.Domain
{
    public class DetailOrder
    {
        public Guid Id { get; set; }
        public Guid ProductID { get; set; }
        public Guid OrderID { get; set; }
        public int Quantity { get; set; } = 0;
        public decimal SalePrice { get; set; } = 0;
        public Products Product { get; set; }
        public Order Order{ get; set; }
        
    }
}
