//creating a server
// const http=require('http');

// const server=http.createServer((req,res)=>{   //creates a server
//     res.end("hello this is Node.js server");
// });

// server.listen(3000, ()=>{   //you can change 3000 to 5000 or 8000 etc,.
//     console.log("server running on http://localhost:3000");  //prints in terminal
// });

//add two numbers in server
// creating a server
// const http = require('http');

// const server = http.createServer((req, res) => {
//     let a = 10;
//     let b = 2;
//     let sum = a + b;

//     // Send a single response
//     res.write("Hello, this is Node.js server\n");
//     res.write("The sum of " + a + " and " + b + " is " + sum);

//     res.end(); // end the response
// });

// server.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });


//by taking user input a and b, add two numbers
const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask user for first number
rl.question("Enter number a: ", (aInput) => {
    rl.question("Enter number b: ", (bInput) => {
        let a = Number(aInput);
        let b = Number(bInput);
        let sum = a + b;
        console.log(sum);
        const server = http.createServer((req, res) => {
            

            res.write("Hello, this is Node.js server\n");
            res.write("a="+ a+"  b="+ b+"\n");
            res.write(`The sum of ${a} and ${b} is ${sum}`);
            res.end();
        });

        server.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });

        rl.close();
    });
});
