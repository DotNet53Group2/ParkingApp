### Project Description
A sample .net core web api


### Boostrap the project
```
dotnet new webapi -n parking-app

```

### Install docker desktop from [here](https://www.docker.com/products/docker-desktop/) if you don't have docker desktop


### Run sql server in docker container using WSL terminal, you might need to add WSL extension in VS Code
```
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=ParkingDb135' -p 1433:1433 --name ParkingDb -d mcr.microsoft.com/mssql/server:2022-latest
```

### appsettings.json
```
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost,1433;Database=ParkingDb;User Id=sa;Password=ParkingDb135;TrustServerCertificate=True;"
}
```

### Install EF Core tools:
```
dotnet tool install --global dotnet-ef
```

### Add EF Core SQL Server package:
```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### Add EF Core SQL Server package:
```
dotnet add package Newtonsoft.Json
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
```

### Generate migration files:
```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Add gitignore
```
dotnet new gitignore
```

### Add swagger
```
dotnet add package Swashbuckle.AspNetCore
```

### Run project
```
cd parking-app/backend
dotnet watch run
```

### swagger endpoint
```
http://localhost:5104/swagger/index.html
```

