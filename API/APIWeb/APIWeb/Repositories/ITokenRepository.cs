using Microsoft.AspNetCore.Identity;

namespace APIWeb.Repositories
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user, List<string> roles);
    }
}
