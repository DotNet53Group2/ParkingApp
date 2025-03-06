# ParkingApp
This repository contains a dotnet backend api and react front end application for a sample parking app.

## Create the backend web api project
```
dotnet new webapi -n backend
```

### To run the project
```
cd backend
dotnet watch run
```

### Fix the language version
Add below line in backend.csproj file
```
<LangVersion>10.0</LangVersion>
```

### Add a gitignore file
```
 dotnet new gitignore 
```