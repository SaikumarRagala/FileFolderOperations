# Folder and File Crud operations Application

Build a Restful CRUD API for a file and directory operations without actually creating them  using Node.js, Express and MongoDB.


## Steps to Setup

1. clone the git repo ,  go to project folder and run the below command to install all dependencies

```bash
npm install --save
```

2. Update the database endpoint in config/database.config.js file with your mongodb connection string

3. Run Server

```bash
node server.js
```

You can use postman to test  the apis at <http://localhost:3000>


## APIs for Folder Operations

1) create folder 
POST - http://localhost:3000/folder
payload : 
{
    "name" : "name of the folder (eg :  "dir1")",
    "path" : "existing directory (eg : "/test")"
}

2) List all folders
GET - http://localhost:3000/folder/

3) Fetch single folder 
GET - http://localhost:3000/folder/:folderId

4)Update folder name 
PUT - http://localhost:3000/folder/:folderId
payload : 
{
    "name" : "name of the folder (eg :  "dir1")",
    "path" : "existing directory (eg : "/test")"
}

5) Delete the folder
DELETE - http://localhost:3000/folder/:folderId

## APIs for File Operations

1) create file 
POST - http://localhost:3000/fileData
payload : 
{
    "name" : "name of the file (eg :  "test.png")",
    "folderId" : "Existing folderId"
}

2) List all files in a folder
GET - http://localhost:3000/fileData/:folderId



3)Update file name 
PUT - http://localhost:3000/folder/:fileId
payload : 
{
    "name" : "name of the file"
}

4) Delete the file
DELETE - http://localhost:3000/folder/:fileId


### For importing the requests directly to postman, import the file "FileFolderOperation.json" in postman 
