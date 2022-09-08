const express=require('express');
const app = express();
const port=process.env.PORT || 8000
const apiRoutes=require('./routes/apiRoutes.routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/',apiRoutes);

app.use((req,res,next)=>{
    res.status(404).json({
        meta: {
            status: 404,
            msg: "Error. Endpoint was not found."
        }
    })
});

app.listen(port,()=>console.log(`Server ON - using port: ${port}`));