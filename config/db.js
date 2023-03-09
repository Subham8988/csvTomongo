// const mongooes = require("mongoose");
// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// mongooes.set("strictQuery", true);

// db_url='mongodb://localhost:27017';
// const dbRoute = mongooes.connect(db_url,connectionParams,(err)=>{
//     if(!err){
// console.log('hh');
//     }
// })
// const dbRoute = await mongooes.connect(db_url,connectionParams).then(console.log('connected sucessfully').;)

//   try {
//     console.log('hii try');
//     mongooes.set("strictQuery", false);
//     console.log("Mongo connected");
//   } catch (error) {
//     console.log(error);
//     process.exit();
//   }


// module.exports = dbRoute;
const mongoDb = require('mongoose');
const url ="mongodb://localhost:27017/csvTodb";
const connectionParams ={
    useNewUrlParser: true,
   useUnifiedTopology: true, 
}
mongoDb.set('strictQuery',true);
 const route =mongoDb.connect(url,connectionParams).then(()=>console.log('connected to db'))  
 .catch((err)=>console.log(err))

module.exports= route;
