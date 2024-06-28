using APIWeb.Data;
using APIWeb.Model.DTO;
using APIWeb.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIWeb.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private APIDbContext aPIDbContext;
        private IAccountRepository accountRepository;

        public AccountController(APIDbContext aPIDbContext, IAccountRepository accountRepository)
        {
            this.aPIDbContext=aPIDbContext;
            this.accountRepository=accountRepository;
        }

        
        [HttpGet]
        [Route("{Email}")]

        public async Task<IActionResult> GetByLogin([FromRoute] string Email)
        {

            var account = await accountRepository.GetLoginAsync(Email);
            if (account == null)
            {
                return NotFound();
            }
            var acCountDto = new AccountDtos
            {

              Id=account.Id,
              Email = account.Email,
              Password = account.Password,
              UserName=account.FullName,
              Photo=account.Photo,
             
            };
            return Ok(acCountDto);

        }

    }
}
