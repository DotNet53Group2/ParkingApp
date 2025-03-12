namespace parking_app.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal AccountBalance { get; set; } = 0.0m;
        public List<Car> Cars { get; set; } = new();
    }
}