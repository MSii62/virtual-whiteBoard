const mongoose=require('mongoose')


const connectionString=process.env.MONGO_URI;

const connectToDatabase=async()=>{
    try{
        await mongoose.connect(connectionString);
        console.log("connected ho gya bhaiji");
    }catch(error){
        console.log(error);
    };
    
}
module.exports=connectToDatabase;