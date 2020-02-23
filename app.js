const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');


const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let instanceArray=[];
let count=0;
const questions=[
    {
        type:'input',
        message:'Enter your name',
        name:'username'
    },
    {
        type:'number',
        message:'Enter your id',
        name:'id'
    },
    {
        type:'input',
        message:'Enter your email',
        name:'email',
        validate: validateEmail
    },
    {
        type:'input',
        message:'Enter your role',
        name:'role'
    }


]

function validateEmail(email){
    let pattern = "[a-zA-Z0-9]"+ "@"+"[a-zA-Z0-9]"+"."+"[a-zA-Z]";
    if (!email.match(pattern)){
        return console.log("Invalid email, Please enter again");
    }
    else{
        return true;
    }
}


async function start(){
    const answer= await inquirer.prompt(questions)
    .then(async function(responses){
            if(responses.role==="Manager"){
                const ans=await inquirer.prompt(
                 [
                        {
                        type:'number',
                        message:'Enter your office number',
                        name:'office',
                        },

                        {
                        type:'number',
                        message:'Enter the number of team members',
                        name:'members'
                        }
                ]    
                ).then(async function(obj){
                    // function validatePhone(obj.office){
                        // const exp="/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/";
                        // if(!obj.office.matches(exp)){
                        //     return "Invalid office number"
                        // }
                        // else{
                        //     return true;
                        // }
                        
                    // }
                    const newManager= new Manager(responses.username,responses.id,responses.email,obj.office);
                    instanceArray.push(newManager);
                    while(count<obj.members){
                        console.log("<------------------------------>");
                        const q = await inquirer.prompt(questions)
                        .then(async function(resp){
                            if(resp.role==="Engineer"){
                                await inquirer.prompt(
                                    {
                                        type:'input',
                                        message:'Enter your GitHub username',
                                        name:'github'
                                    }
                                ).then(function(res){
                                    const newEngineer= new Engineer(resp.username,resp.id,resp.email,res.github);
                                    instanceArray.push(newEngineer);
                                   
                                })
                            }
                            else if(resp.role==="Intern"){
                                await inquirer.prompt(
                                    {
                                        type:'input',
                                        message:'Enter your school name',
                                        name:'school'
                                    }
                                ).then(function(obj){
                                    const newIntern= new Intern(resp.username,resp.id,resp.email,obj.school);
                                    instanceArray.push(newIntern);
                                    //count++;
                                })
                            }
                            else{
                                console.log("Invalid Input")
                            }
                        })
                        count++;
                    }
                    
                })
            }
            else{
                console.log("Please start over by entering the Manager details");
            }
            
            
    const retValue=render(instanceArray);
       
    if(fs.existsSync(OUTPUT_DIR)){
        fs.writeFile("./output/team.html",retValue,function(err){
            if(err){
                throw err;
            }
            console.log("Successfuly created HTML file!");
        })
    
    }
    else{
        fs.mkdirSync("output");
        const data = new Uint8Array(Buffer.from('./style.js'));
        fs.writeFile('./output/style.css', data, (err) => {
            if (err) throw err;
            console.log('Output file created!');
          });
        fs.writeFile("./output/team.html",retValue,function(err){
            if(err){
                throw err;
            }
            console.log("Successfully created Output Folder!");
        })
    }
    })
}

start();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
