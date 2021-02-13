// implement your server here
// require your posts router and connect it here

const express=require('express')

// const welcomeRouter=require('./posts/welcome-router')

const postRouter=require('./posts/posts-router')

const server=express()
const port =4444

server.use(express.json())


server.use(postRouter)

server.get("/", (req, res,next) => {
	res.json({
		message: "Welcome to our API",
    })
    next()
})



module.exports=server
