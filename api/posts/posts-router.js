// implement your posts router here
const express=require('express')
const posts = require("./posts-model")

const router=express.Router()

const log =console.log

/

router.get("/api/posts", (req, res) => {
	posts.find(req.query)
		.then((p) => {
            res.status(200).json(p)
            log(p)
		})
		.catch((error) => {
			log(error)
			res.status(500).json({
				message: "Error retrieving the posts",
			})
		})
})

router.get("/api/posts/:id",(req,res)=>{
    posts.findById(req.params.id)
    .then((post)=>{
        if(req.params.id){

            res.status(200).json(post)
            
        }else{
            res.status(404).json({
                message:"No post found"
            })
        }
            
        

    })
    .catch((error)=>{
        log(error)
        res.status(500).json({
            message:"Error retrieving respective post"
        })
    })
})

router.post("/api/posts", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Please provide title and contents for the post",
		})
	}

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			log(error)
			res.status(500).json({
				message: "There was an error while saving the post to the database",
			})
		})
})

router.post('/api/posts/:id/comments',(req,res)=>{
	
    console.log(req.body.text)
    console.log(req.params.id)
    
            if(!req.body.text){
                res.status(400).json({message:"Please provide text for the comment"})
            }else if(!req.params.id){
                res.status(404).json({message:"The post with the specified ID doesn't exist"})
            }else{
                 posts.insertComment({post_id:req.params.id,text:req.body.text})
                 .then((comment)=>{
                
                     posts.findCommentById(comment.id)
                    res.status(201).json(comment)
                    
                     })
                 
                
                     .catch((error)=>{
                        res.status(500).json({
                            message:"There was an error while saving the comment to the database"
                        })
                    })
                
            }
    
    })

    router.get("/api/posts/:id/comments",(req,res)=>{
        posts.findPostComments(req.params.id)
        .then((post)=>{
            if(req.params.id){
    
                res.status(200).json(post)
                
            }else{
                res.status(404).json({
                    message:"The post with the specified ID does not exist"
                })
            }
        }).catch((err)=>{
            res.status(500).json({message:"The comments information could not be retrieved"})
        })           
    
        })

        router.put("/api/posts/:id", (req, res) => {
            if (!req.body.title || !req.body.contents) {
                return res.status(400).json({
                    message: "Missing title name or contents",
                })
            }

            posts.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the post",
			})
		})
})

router.delete("/api/posts/:id", (req, res) => {
	posts.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "The post could not be removed",
			})
		})
})

module.exports=router