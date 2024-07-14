using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface IProvinceRepository
    {
        Task<List<Provinces>> GetAllAsync();
    }
}
