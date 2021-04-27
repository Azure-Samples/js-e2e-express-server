---
page_type: sample
languages:
- javascript
- nodejs
name: "JavaScript end-to-end Express.js server"
description: "This project is used instead of the previous express-generator."
products:
- azure
- vs-code
---

# JavaScript end-to-end client file upload to Azure Storage Blobs

This is a basic Express.js server used for JS Dev Experience documentation, in place of the previously used express generator. 

1. Clone repo.

1. Install dependencies: 

    ```bash
    npm install
    ```

1. Start project: 

    ```bash
    npm start
    ```

## Azure Caveats

Please read the [documentation for setting up Node.js apps on Azure](https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux).

If you hit any issues with this repo on Azure, and the issue isn't listed below, please open an issue in this repo. 

### NPM install 

When deployed to Azure, reads the `.deployment` file's `SCM_DO_BUILD_DURING_DEPLOYMENT` setting to determine if it should install npm packages.

### Ports

* Default port is 8080.
* If using a different port, use the uppercase `PORT` environment variable. `const port = process.env.PORT || 8080`

### Azure Active Directory Authentication

* Tested with [Easy Auth](https://docs.microsoft.com/en-us/azure/app-service/configure-authentication-provider-aad#-create-a-new-app-registration-automatically).