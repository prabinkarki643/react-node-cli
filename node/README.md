# Node React Release Build

Node js code that will serve the react build in the port specify inside .env file.

#### feel free to change the PORT according to your need.
## Running Server

Using node & script (foreground)

```bash
  npm start
```

Using pm2 & script (background)

```bash
pm2 start npm --name "myApp" -- run "start:test"

pm2 start npm --name "myApp" -- run "start:staging"

pm2 start npm --name "myApp" -- run "start:production"
```
