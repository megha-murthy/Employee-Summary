# Employee-Summary
Team Profile Generator
## Description:

This is a command line application for a Software team generator. The application will prompt the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns.


## Usage:

The application :

1. Prompts the user for:
-    Name

-    Email

-    Id

-    Role
 
2.  Based on the role, specific information, for instance,

-    An intern may provide their school,

-    An engineer may provide their GitHub username

-    A Manager can provide their office number and the number of team members.
 
3.  A `render` function will generate and return a block of HTML including templated divs for each employee
 
4.  HTML returned from the `render` function will be written to a file named `team.html` in the `output` folder
 
 
 ## Technologies:
 
Node js, HTML 5, CSS 3, jest, inquirer
 
 ## Screenshots:
![ ](Employee Summary.png)
