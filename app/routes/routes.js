module.exports = app => {
  const controller = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new basic code
  router.post("/basiccodes/", controller.create);

  // Retrieve all basic codes
  router.get("/basiccodes/", controller.findAllCode);

  //basic_code insertNodes2db
  router.post("/basiccodes/insertNodes2db", controller.insertNodes2db);

  // Retrieve all basic_code records
  router.get("/basiccodes/findAllInternalCode", controller.findAllInternalCode);

  // Retrieve a single basic_code record with id
  router.get("/basiccodes/:id", controller.findOneCode);

  // Update a basic_code with id
  router.put("/basiccodes/:id", controller.update);

  // Delete a Tutorial with id
  router.delete("/basiccodes/:id", controller.delete);

  // Delete all Tutorials
  router.delete("/basiccodes/", controller.deleteAll);

  // -------------------------------------------red--------------------------------
  //deploymentplaces red insertNodes2db
  router.post("/deploymentplacesred/insertNodes2db", controller.insertNodes2db_red);

  
  // -------------------------------------------blue--------------------------------
   // deploymentplaces blue findByCode 
   router.post("/deploymentplacesblue/insertNodes2db", controller.insertNodes2db_blue);

  app.use('/api', router);
};
