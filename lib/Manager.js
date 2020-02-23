// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// const Manager = require('./lib/Manager');
// const Engineer = require('./lib/Engineer');
// const Intern = require('./lib/Intern');
const Employee = require('./Employee');
class Manager extends Employee{
    constructor(name,email,id,officeNumber){
        super(name,email,id);
        this.officeNumber=officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return "Manager";
    }

}


module.exports= Manager;