using APIWeb.Data;
using APIWeb.Mappings;
using APIWeb.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<APIDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("LiteDBConnectionString")));
builder.Services.AddDbContext<APIDbAuthContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("LiteDBAuthConnectionString")));


builder.Services.AddScoped<IProductRepository,SQLProductReository >();
builder.Services.AddScoped<ICategorieRepository, SQLCategorieRepository>();
builder.Services.AddScoped<IProvinceRepository, SQLProvinceRepository>();
builder.Services.AddScoped<ISupplierRepository, SQLSupplierRepository>();
builder.Services.AddScoped<IEmployeeRepository, SQLEmployeeRepository>();
builder.Services.AddScoped<ICustomerRepository, SQLCustomerRepository>();
builder.Services.AddScoped<IShipperRepository, SQLShipperRepository>();
builder.Services.AddScoped<IAccountRepository, SQLAccountRepository>();
builder.Services.AddScoped<IOrderRepository, SQLOrderRepository>();
builder.Services.AddScoped<IDetailsOrderRepository, SQLDetailsOrderRepository>();
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title="APIWeb", Version="v1" });
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
    {
        Name= "Authorization",
        In= ParameterLocation.Header,
        Type= SecuritySchemeType.ApiKey,
        Scheme= JwtBearerDefaults.AuthenticationScheme
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id= JwtBearerDefaults.AuthenticationScheme,
                },
                Scheme="Oauth2",
                Name=JwtBearerDefaults.AuthenticationScheme,
                In=ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("APIWeb")
    .AddEntityFrameworkStores<APIDbAuthContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true,
    ValidateAudience= true,
    ValidateIssuerSigningKey = true,
    ValidIssuer=builder.Configuration["Jwt:Issuer"],
    ValidAudience=builder.Configuration["Jwt:Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
});

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .SetIsOriginAllowed(host => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider= new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath ="/Images"
});

app.MapControllers();

app.Run();
