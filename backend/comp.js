const http=require('http');

const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write('hello world');
        res.end();
    }
    else if(req.url==='/home'){
        res.write('welcome to home page');
        res.end()
    }
    else if(req.url==='/about'){
        res.write('u know me son')
        res.end();
    }
    else {
        res.write('dint found it ');
        res.end();
    }
    
});

server.listen(699,()=>{
    console.log("six seven");
});