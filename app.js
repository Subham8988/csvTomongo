const express= require('express');
const app = express();
const dbConfig= require('./config/db');
const port = 3400;

  
var multer      = require('multer');  
var path        = require('path');  
var csvModel    = require('./modal/schema');  
var csv         = require('csvtojson');  

var storage = multer.diskStorage({  
destination:(req,file,cb)=>{  
cb(null,'./public/uploads');  
},  
filename:(req,file,cb)=>{  
cb(null,file.originalname);  
}  
});  
var uploads = multer({storage:storage});



app.use(express.json());

app.set('view engine','ejs'); 
var landingPage = path.join(__dirname,'./view/landingPage.ejs');
 
// console.log(landingPage);

// app.get('',async (req,res)=>{
//     try {
//         res.status(200).render(landingPage);
//     } catch (error) {
//         res.status(500).send(`${error}`)
//     }
// });

app.get('/', async (req,res)=>{  
    const data = await  csvModel.find();
    // csvModel.find((err,data)=>{  
    if(data)
    {   
    res.render(landingPage,{data:data});
    }else{  
    // if(data!=''){       
        res.render(landingPage,{data:''});  
    // } 
    }  
    }); 
    
    
    // });  
    var temp ;  
    app.post('/upload',uploads.single('csv'), async (req,res)=>{  
    //convert csvfile to jsonArray     
    csv()  
    .fromFile(req.file.path)  
    .then(async (jsonObj)=>{  
    console.log(jsonObj);  
    //the jsonObj will contain all the data in JSONFormat.
    //but we want columns Test1,Test2,Test3,Test4,Final data as number .
    //becuase we set the dataType of these fields as Number in our mongoose.Schema(). 
    //here we put a for loop and change these column value in number from string using parseFloat(). 
    //here we use parseFloat() beause because these fields contain the float values.
    for(var x=0;x<jsonObj;x++){  
    temp = parseFloat(jsonObj[x].Test1)  
    jsonObj[x].Test1 = temp;  
    temp = parseFloat(jsonObj[x].Test2)  
    jsonObj[x].Test2 = temp;  
    temp = parseFloat(jsonObj[x].Test3)  
    jsonObj[x].Test3 = temp;  
    temp = parseFloat(jsonObj[x].Test4)  
    jsonObj[x].Test4 = temp;  
    temp = parseFloat(jsonObj[x].Final)  
    jsonObj[x].Final = temp;  
    } 
    //insertmany is used to save bulk data in database.
    //saving the data in collection(table)
     const uData=  csvModel.insertMany(jsonObj); 
     if(uData)
     {
        res.status(201).send('done')
     }
     else
     (
        res.status(404).send('error')
     )
     
  
    });  
    });  

app.listen(port,()=>{
    console.log(`Server is listing at pornt no ${port}`);
})