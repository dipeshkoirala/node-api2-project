// require your server and launch it here
const server=require("./api/server")

const port=3333;

server.listen(port, ()=>{
    console.log(`Server started at port:${port}`)
})