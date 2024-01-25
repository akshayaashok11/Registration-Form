import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const port = process.env.PORT || 2000;


const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.zlrvsbl.mongodb.net/registrationDB`);

//Registration Schema
const registrationSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile("C:/Users/ADMIN/OneDrive/Desktop/WEB DEVELOPMENT/Registration Form/pages/form.html");
  });

app.post("/register",async(req,res)=>
{
    try{
        const {name,email,password} = req.body;

        const existingUser = await Registration.findOne({email:email});

        if(!existingUser)
        {
            const registrationData = new Registration({
                name,
                email,
                password
            });
            await registrationData.save();
            res.redirect("/success");
        }
        else
        {
            console.log("User already exists");
            res.redirect("/error");
        }
    }
    catch(error)
    {
        console.log(error);
        res.redirect("/error");
    }
});

app.get("/success",(req,res)=>
{
    res.sendFile("C:/Users/ADMIN/OneDrive/Desktop/WEB DEVELOPMENT/Registration Form/pages/success.html");
});

app.get("/error",(req,res)=>
{
    res.sendFile("C:/Users/ADMIN/OneDrive/Desktop/WEB DEVELOPMENT/Registration Form/pages/error.html");
});

app.listen(port, ()=>
{
    console.log(`Server listening at port ${port}`);
});
