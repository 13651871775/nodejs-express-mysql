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

  // -------------------------------------------红军red--------------------------------
  //deploymentplaces red 
  router.post("/deploymentplacesred/insertNodes2db", controller.insertNodes2db_red);
  router.get("/deploymentplacesred", controller.findAllCode_red);
  router.get("/deploymentplacesred/findone", controller.findOne_red);
  router.delete("/deploymentplacesred/deleteall", controller.deleteAll_red);
  router.delete("/deploymentplacesred/delete_red/:taskid", controller.delete_red);
  
  // -------------------------------------------蓝军 blue--------------------------------
  // deploymentplaces blue  
   router.post("/deploymentplacesblue/insertNodes2db", controller.insertNodes2db_blue);
   router.get("/deploymentplacesblue/", controller.findAllCode_blue);
   router.delete("/deploymentplacesblue/deleteall", controller.deleteAll_blue);
   router.get("/deploymentplacesblue/findone", controller.findOne_blue);
   router.delete("/deploymentplacesblue/delete_blue/:taskid", controller.delete_blue);
  // -------------------------------------------演习任务 drilltask----------------------
  // Create a new drilltask
  router.post("/drilltask/", controller.create_drilltask);

  // Retrieve all drilltask
  router.get("/drilltask/", controller.findAll_drilltask);

  // Retrieve a single drilltask record with id
  router.get("/drilltask/:taskid", controller.findOne_drilltask);




  // Update a drilltask with id
  // router.put("/drilltask/:id", controller.update_drilltask);

  // Delete a drilltask with id
  // router.delete("/drilltask/:id", controller.delete_drilltask);

  // Delete all drilltask
  // router.delete("/drilltask/", controller.deleteAll_drilltask);




  // -------------------------------------------deploymentplaces------------------------
  // deploymentplaces
  router.post("/deploymentplaces/insertNodes2db", controller.insertNodes2db_deploymentplaces);

  // ------------------------------------------部署 bushu---------------------------
  // Create a new bushu
  // router.post("/bushu/", controller.create_bushu);

  // bushu
  router.get("/bushu/findAllCode_bushu", controller.findAllCode_bushu);
  router.get("/bushu/get_bushu_history", controller.get_bushu_history);
  router.get("/bushu/get_bushu_detail", controller.get_bushu_detail);
  // Create a new bushu detail
  router.post("/bushu/post_bushu_detail", controller.insertNodes2db_bushudetail);
  // 创建一个新的bushu history
  router.post("/bushu/post_bushu_history", controller.insertNodes2db_bushuhistory);
  // 删除bushu history
  router.delete("/bushu/delete_bushu/:bushuid", controller.delete_bushu);

  app.use('/api', router);
};
