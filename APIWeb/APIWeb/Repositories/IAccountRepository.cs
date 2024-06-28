using APIWeb.Model.Domain;

namespace APIWeb.Repositories
{
    public interface IAccountRepository
    {
        Task<Employees?> GetLoginAsync(string Email);
    }
}
