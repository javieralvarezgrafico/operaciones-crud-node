const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    // ejemplo params -> /users/:id → /users/123
  const emailUsuario = req.params.email;
  let usuarioFiltrado = users.filter(user => user.email === emailUsuario);
  // Suponemos que no existen varios usuarios con el mismo email
  res.send(usuarioFiltrado);
  // En caso de querer evitar problemas con esa suposición
  /* if (usuariosFiltrado.length > 0) {
    res.send(usuariosFiltrado[0]); // enviamos el primer usuario que coincida
  } else {
    res.status(404).send({ error: "Usuario no encontrado" });
  } */
});


// POST request: Create a new user
router.post("/",(req,res)=>{
    // ejemplo query -> /users?firstName=Ana&lastName=Perez
  const nombreUsuario = req.query.firstName;
  const apellidoUsuario = req.query.lastName;
  const emailUsuario = req.query.email;
  const nacimiento = req.query.DOB;

  const nuevoUsuario = {
    "firstName":nombreUsuario,
    "lastName":apellidoUsuario,
    "email":emailUsuario,
    "DOB":nacimiento
  }

  users.push(nuevoUsuario);
  res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    // Extract email parameter and find users with matching email
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        
         // Extract and update DOB if provided
        
        let DOB = req.query.DOB;    
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
        let name = req.query.firstName;    
        if (name) {
            filtered_user.firstName = name;
        }

        let surname = req.query.lastName;    
        if (surname) {
            filtered_user.lastName = surname;
        }
        
        // Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    // Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to exclude the user with the specified email
    users = users.filter((user) => user.email != email);
    // Send a success message as the response, indicating the user has been deleted
    res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
