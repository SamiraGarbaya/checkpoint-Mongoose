const mongoose= require ('mongoose')
const connectDb= async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        //'mongodb://localhost:27017/MYFIRSTDB'
        console.log("db successfull connected")
    } catch (err){
        console.log(err); 
    }
}
module.exports=connectDb