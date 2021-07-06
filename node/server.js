const express = require('express'); //install express for node server
const path = require('path');
const dotenv = require("dotenv");
const cors = require('cors') 
dotenv.config();


const app = express();
const PORT = process.env.PORT||3001;
//handling CORS error
app.use(cors())

app.use('/', express.static(path.join(__dirname,'build')))
app.get('/*', function (req, res) {
 res.sendFile(path.join(__dirname,'build', 'index.html'));
});

//handle all kind of error that sent by this app
app.use((error,req,res,next)=>{
  const status = error.statusCode || 500;
  const message = error.message || "Server Error"
  const data = error.data || []
 res.status(status).json({
     message: message,
     data: data
 });
})

app.listen(PORT, () => { //change port as needed
    console.log(`Server running on port: ${PORT}`)
  })