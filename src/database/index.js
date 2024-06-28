const { default: mongoose } = require("mongoose");

async function connectionToDB (){
    const connectionUrl=process.env.DATABASE_URL
    await mongoose.connect(connectionUrl).then(()=>{
        console.log("MongoDB is connected...")
    }).catch(err=>console.error(err))
}
export {connectionToDB}