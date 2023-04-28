const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const secretKey = "secretkey";

app.get("/",(req,res)=>{
    res.json({
        message:"a sample api"
    })
})


app.post("/login",(req,res)=>{
    const user={
        id:1,
        username:"rome",
        email:"abc@email.com"
    }

    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
        res.json({
            token
        })
    })
})

app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({result:"Invalid token"})
        }else{
            res.json({
                message:"profile accessed",
                authData
            })
        }
    })

})

function verifyToken(req,res,next){
const bearerHeader = req.headers['authentication'];
if(typeof bearerHeader !== 'undefined'){
const bearer = bearerHeader.split(" ");
const token = bearer[1];
req.token = token;
next();

}else{
    res.send({
        result:'Token is not valid'
    })
}
}

app.listen(5000,()=>{
    console.log("app is running on 5000")
})