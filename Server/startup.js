const http = require('http')
const port = 3000

const server = http.createServer(function(req,res){
    res.write("hello")
    res.end()
})

server.listen(port, function(error){
    if(error){
        console.log("oopise", error)
    }
    else{
        console.log("workssssssss on "+ port)
    }
})