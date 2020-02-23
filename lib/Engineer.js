// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// const Manager = require('./lib/Manager');
// const Engineer = require('./lib/Engineer');
// const Intern = require('./lib/Intern');
//var Emp = require('./Employee');
const Employee = require('./Employee');
class Engineer extends Employee{
    constructor(name,email,id,github){
        super(name,email,id);
        this.github=github;
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }

}

module.exports=Engineer;