import mongoose from "mongoose";

const connect = async() =>{
    try {
        await mongoose.connect("mongodb+srv://pat:1234@cluster0.dozkaef.mongodb.net/",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("successfully conneted to database.");
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to database.");
    }
}

export default connect;