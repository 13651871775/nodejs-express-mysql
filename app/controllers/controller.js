global.totlength = 0;

const Basiccode = require("../models/basiccode.model.js");
const Deploymentplaces_blue = require("../models/deploymentplaces-blue.model.js");
const Deploymentplaces_red = require("../models/deploymentplaces-red.model.js");
const Deploymentplaces = require("../models/deploymentplaces.model.js");
const Drilltask = require("../models/drilltask.model.js");

// ---------------------------------基本信息表 basic code--------------------------------------
// Create and Save a new basic_code record in db
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a basic_code
  const basiccode = new Basiccode({
    code: req.body.code,
    internal_code: req.body.internal_code,
    name: req.body.name || false
  });

  // Save basic code record in the database
  Basiccode.create(basiccode, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the basiccode."
      });
    else res.send(data);
  });
};

// Retrieve all Basiccode from the database (with condition).
exports.findAllCode = (req, res) => {
  const code = req.query.CODE;
  Basiccode.getAllCode(code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving basiccode."
      });
    else res.send(data);
  });
};
// Retrieve red Basiccode from the database (with condition).
// exports.findAllCode_red = (req, res) => {
//   const code = req.query.CODE;

//   Deploymentplaces_red.getAllCode(code, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving basiccode."
//       });
//     else res.send(data);
//   });
// };
// // Retrieve blue Basiccode from the database (with condition).
// exports.findAllCode_blue = (req, res) => {
//   const code = req.query.CODE;

//   Deploymentplaces_blue.getAllCode(code, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving blue basic codes."
//       });
//     else res.send(data);
//   });
// };

// Find a single Basiccode by code
exports.findOneCode = (req, res) => {
  Basiccode.findByCode(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found basiccode with code ${req.params.code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving basiccode with code " + req.params.code
        });
      }
    } else res.send(data);
  });
};

// find all basic code by internal code
exports.findAllInternalCode = (req, res) => {
  Basiccode.getAllInteralCode(req.params.internal_code, ((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving basic codes by internal code."
      });
    else res.send(data);
  })
  );
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Basiccode.updateByCode(
    req.params.code,
    new Basiccode(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found basic code record with code ${req.params.code}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating basic code record with code " + req.params.code
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a baisic code record with the specified id in the request
exports.delete = (req, res) => {
  Basiccode.remove(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found basic code record with code ${req.params.code}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete basic code record with code " + req.params.code
        });
      }
    } else res.send({ message: `basiccode was deleted successfully!` });
  });
};

// Delete all basic code records from the database.
exports.deleteAll = (req, res) => {
  Basiccode.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all basiccode records."
      });
    else res.send({ message: `All basic code records were deleted successfully!` });
  });
};

function countNodes(node) {
  let count = 1;
  if (node === null) return 0;
  testnode = Object.values(node)[0]
  if (testnode === null ) return 0;
  if (testnode.children === null) return count;
  // length = Object.values(node).length
  for (const child of Object.values(testnode.children)) {
    let temp = {}
    temp[child.code] = child
    count += countNodes(temp);
    // Recursively count the child nodes
  }
  return count;
}

/**
 * Inserts a node into the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The inserted node.
 */
exports.insertNodes2db = (req, res) => {
  console.log("req.body: ", req.body);
  const node = req.body;

  global.totlength  = countNodes(node);
  console.log("global.totlength.......: ", global.totlength);
  totlength = global.totlength
  Basiccode.insertNodes2db(node,totlength, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting basiccode node."
      });
    else res.send(data);
  });
}

// ------------------------------演示任务表 drill task-------------------------------------
// Create and Save a new drilltask
exports.create_drilltask = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty! drilltask"
    });
  }

  // Create a drilltask
  const drilltask = new Drilltask({
    taskname: req.body.taskname,
  });
  // try to test the drilltask object
  console.log("controller.create_drilltask(): after new Drilltask() object drilltask: -> ", drilltask)

  // Save drilltask in the database
  Drilltask.create(drilltask, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred! while creating the drilltask."
      });
    else res.send(data);
  });
};

// Retrieve all drilltask from the database (with condition).
exports.findAll_drilltask = (req, res) => {
  const taskname = req.query.taskname;
  Drilltask.getAll(taskname, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred! while retrieving drilltask."
      });
    else res.send(data);
  });
};

// Find a single drilltask with a taskid
exports.findOne_drilltask = (req, res) => {
  console.log("req.params.taskid: -> ", req.params.taskid)
  Drilltask.findByTaskid(req.params.taskid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found drilltask with taskid ${req.params.taskid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving drilltask with taskid " + req.params.taskid
        });
      }
    } else res.send(data);
  });
};

// -------------------------------红军 deploymentPlaces Red----------------------------
// Create and Save a new deploymentplaces_red
exports.create_red = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a deploymentplaces_red node
  const deploymentplaces_red = new Deploymentplaces_red({
    code: req.body.code,
    internal_code: req.body.internal_code,
    name: req.body.name || false,
    areacode: req.body.areacode || false,
    Lang: req.body.Lang || false,
    Lat: req.body.Lat || false,
    extend_name: req.body.extend_name || false,
    history: req.body.history || false
  });

  // Save deploymentplaces_red record in the database
  Deploymentplaces_red.create(deploymentplaces_red, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the deploymentplaces_red."
      });
    else res.send(data);
  });
};

// Retrieve all Basiccode from the database (with condition).
exports.findAllCode_red = (req, res) => {
  const code = req.query.CODE;

  Deploymentplaces_red.getAllCode(code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deploymentplaces_red."
      });
    else res.send(data);
  });
};
// Retrieve red deploymentplaces_red from the database (with condition).
// exports.findAllCode_red = (req, res) => {
//   const code = req.query.CODE;

//   Deploymentplaces_red.getAllCode(code, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving deploymentplaces_red."
//       });
//     else res.send(data);
//   });
// };

// Find a single deploymentplaces_red by code
exports.findOneCode_red = (req, res) => {
  Deploymentplaces_red.findByCode(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deploymentplaces_red with code ${req.params.code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving deploymentplaces_red with code: " + req.params.code
        });
      }
    } else res.send(data);
  });
};

// Find a single deploymentplaces_red by taskid(drillid)
exports.findOne_red = (req, res) => {
  console.log("req.query: -> ", req.query)
  Deploymentplaces_red.findById(req.query.taskid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deploymentplaces_red with code ${req.query.taskid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving deploymentplaces_red with code: " + req.query.taskid
        });
      }
    } else res.send(data);
  });
};

// Find a single deploymentplaces_blue by taskid(drillid)
exports.findOne_blue = (req, res) => {
  console.log("req.query: -> ", req.query)
  Deploymentplaces_blue.findById(req.query.taskid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deploymentplaces_blue with code ${req.query.taskid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving deploymentplaces_blue with code: " + req.query.taskid
        });
      }
    } else res.send(data);
  });
};



// find all deploymentplaces_red by internal code
exports.findAllInternalCode_red = (req, res) => {
  Deploymentplaces_red.getAllInteralCode(req.params.internal_code, ((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deploymentplaces_red by internal code."
      });
    else res.send(data);
  })
  );
};

// Update a deploymentplaces_red identified by the id in the request
exports.update_red = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Deploymentplaces_red.updateByCode(
    req.params.code,
    new Deploymentplaces_red(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found basic code record with code ${req.params.code}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating basic code record with code " + req.params.code
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a deploymentplaces_red record with the specified id in the request
exports.delete_red = (req, res) => {
  console.log("req.params.drillid: -> ", req.params.taskid)
  Deploymentplaces_red.remove(req.params.taskid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        // res.status(404).send({
        res.status(200).send({
          message: `Not found deploymentplaces_red record with taskid ${req.params.taskid}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete deploymentplaces_red record with taskid " + req.params.taskid
        });
      }
    } else res.send({ message: `deploymentplaces_red was deleted successfully!` });
  });
};
// exports.delete_red = (req, res) => {
//   Deploymentplaces_red.remove(req.params.code, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found deploymentplaces_red record with code ${req.params.code}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete deploymentplaces_red record with code " + req.params.code
//         });
//       }
//     } else res.send({ message: `deploymentplaces_red was deleted successfully!` });
//   });
// };
// Delete all deploymentplaces_red records from the database.
exports.deleteAll_red = (req, res) => {
  Deploymentplaces_red.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all deploymentplaces_red."
      });
    else res.send({ message: `All deploymentplaces_red records were deleted successfully!` });
  });
};


/**
 * Inserts a node into the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The inserted node.
 */
// exports.insertNodes2db_red = async (req, res) => {
//   const node = req.body;
//   global.totlength  = countNodes(node);
//   console.log("controller insertNodes2db_red() global.totlength: ", global.totlength);
//   totlength = global.totlength
//   const nodeCount = totlength

//   // get the root node of the tree {"id":1,"name":"中央军*","code":"00","internal_code":"00","children":[]}
//   var nodes = Object.values(node)[0]
//   if (rootNode.parentid === null) {
//     // skip the root node if the parent id is null
//     for (const node of nodes.children) {
//       try {
//         var aa = Deploymentplaces_red.insertNodes2db(node,(err, data) => {
//               if (err)
//                 res.status(500).send({
//                   message:
//                     err.message || "Some error occurred while inserting deploymentplaces_red nodes."
//                 });
//               else res.send(data);
//             })
//       } catch (err) {
//         console.log("Error inserting node into database: ", err);
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Tutorial."
//         });
//         throw err;
//       }
//     }
//   } else {
//     // Insert all nodes if the root node's parentid is not null
//     for (const childNode of Object.values(rootNode.children)) {
//       try {
//         const createResult = await Deploymentplaces_red.create(childNode);
//         if (childNode.children) {
//           await insertNodes2db_red(childNode, result);
//         }
//       } catch (err) {
//         console.log("Error inserting node into database: ", err);
//         result(err);
//         throw err;
//       }
//     }
//   }
//   res.send(aa)
// }

// exports.insertNodes2db_red-bk2 = async (req, res) => {
//   const node = req.body;
//   // const nodes = Object.values(node)[0]
//   global.totlength  = countNodes(node);
//   console.log("controller insertNodes2db_red() global.totlength: ", global.totlength);
//   totlength = global.totlength
  
//   var nodes = Object.values(node)
//   for (const node of nodes) {
//     try {
//       var aa = await Deploymentplaces_red.create(node, nodeCount);
//       if (node.children) {
//         await insertNodes2db(node.children);
//       }
//     } catch (err) {
//       console.log("Error inserting node into database: ", err);
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//       throw err;
//     }
//   }
//   res.send(aa)
// }
// exports.insertNodes2db_red = (req, res) => {
//   const node = req.body;

//   global.totlength  = countNodes(node);
//   console.log("controller insertNodes2db_red() global.totlength: ", global.totlength);
//   totlength = global.totlength
  
//   Deploymentplaces_red.insertNodes2db(node, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while inserting deploymentplaces_red nodes."
//       });
//     else res.send("Nodes inserted into database: ",data);
//   });
// }
exports.insertNodes2db_red = (req, res) => {
  const node = req.body;

  global.totlength  = countNodes(node);
  console.log("controller insertNodes2db_red() global.totlength:-> ", global.totlength, "\nnode:-> ", node);
  totlength = global.totlength
  
  Deploymentplaces_red.insertNodes2db(node)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting deploymentplaces_red nodes."
    });
  })
}
// -----------------------------蓝军 deploymentPlaces Blue--------------------------------
// Create and Save a new deploymentplaces_blue
exports.create_blue = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a basic_code
  const deploymentplaces_blue = new Deploymentplaces_blue({
    code: req.body.code,
    internal_code: req.body.internal_code,
    name: req.body.name || false,
    areacode: req.body.areacode || false,
    Lang: req.body.Lang || false,
    Lat: req.body.Lat || false,
    extend_name: req.body.extend_name || false,
    history: req.body.history || false
  });

  // Create a deploymentplaces_blue
  Deploymentplaces_blue.create(deploymentplaces_blue, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Deploymentplaces_blue records from the database (with condition).
exports.findAllCode_blue = (req, res) => {
  const code = req.query.CODE;
  console.log("Controller findAllCode_blue() code:" , code)
  Deploymentplaces_blue.getAllCode(code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all deploymentplaces_blue records."
      });
    else res.send(data);
  });
};

// Retrieve blue Deploymentplaces_blue from the database (with condition).
// exports.findAllCode_blue = (req, res) => {
//   const code = req.query.CODE;

//   Deploymentplaces_blue.getAllCode(code, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving blue deploymentplaces_blue."
//       });
//     else res.send(data);
//   });
// };

// Find a single deploymentplaces_blue by code
exports.findOneCode_blue = (req, res) => {
  Deploymentplaces_blue.findByCode(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deploymentplaces_blue with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving deploymentplaces_blue with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all deploymentplaces_blue by internal code
exports.findAllInternalCode_blue = (req, res) => {
  Deploymentplaces_blue.getAllInteralCode(req.params.internal_code, ((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deploymentplaces_blue by internal code."
      });
    else res.send(data);
  })
  );
};

// Update a Deploymentplaces_blue identified by the id in the request
exports.update_blue = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Deploymentplaces_blue.updateByCode(
    req.params.code,
    new Deploymentplaces_blue(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found deploymentplaces_blue record with code: ${req.params.code}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating deploymentplaces_blue record with code: " + req.params.code
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Deploymentplaces_blue record with the specified id in the request
exports.delete_blue = (req, res) => {
  console.log("req.params.drillid: -> ", req.params.taskid)
  Deploymentplaces_blue.remove(req.params.taskid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        // res.status(404).send({
        res.status(200).send({
          message: `Not found deploymentplaces_red record with taskid ${req.params.taskid}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete deploymentplaces_red record with taskid " + req.params.taskid
        });
      }
    } else res.send({ message: `deploymentplaces_red was deleted successfully!` });
  });
};

// Delete all deploymentplaces_blue records from the database.
exports.deleteAll_blue = (req, res) => {
  Deploymentplaces_blue.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all deploymentplaces_blue records."
      });
    else res.send({ message: `All deploymentplaces_blue records were deleted successfully!` });
  });
};


/**
 * Inserts a node into the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The inserted node.
 */
exports.insertNodes2db_blue = (req, res) => {
  const node = req.body;

  global.totlength  = countNodes(node);
  console.log("global.totlength: ", global.totlength);
  totlength = global.totlength
  Deploymentplaces_blue.insertNodes2db(node)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while inserting deploymentplaces_blue nodes."
    });
  })
}

// ------------------------------------------------------------------------------------------------------------
// -----------------------------deploymentPlaces--------------------------------
// Create and Save a new deploymentplaces
exports.create_deploymentplaces = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a basic_code
  const deploymentplaces = new Deploymentplaces({
    code: req.body.code,
    internal_code: req.body.internal_code,
    name: req.body.name || false,
    areacode: req.body.areacode || false,
    Lang: req.body.Lang || false,
    Lat: req.body.Lat || false,
    extend_name: req.body.extend_name || false,
    history: req.body.history || false
  });

  // Create a deploymentplaces_blue
  Deploymentplaces.create(deploymentplaces, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Deploymentplaces_blue records from the database (with condition).
exports.findAllCode_deploymentplaces = (req, res) => {
  const code = req.query.CODE
  Deploymentplaces.getAllCode(code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all deploymentplaces_blue records."
      })
    else res.send(data);
  });
};

// Retrieve blue Deploymentplaces_blue from the database (with condition).
exports.findAllCode_deploymentplaces = (req, res) => {
  const code = req.query.CODE;

  Deploymentplaces.getAllCode(code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blue deploymentplaces_blue."
      });
    else res.send(data);
  });
};

// Find a single deploymentplaces_blue by code
exports.findOneCode_deploymentplaces = (req, res) => {
  Deploymentplaces.findByCode(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deploymentplaces_blue with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving deploymentplaces_blue with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all deploymentplaces_blue by internal code
exports.findAllInternalCode_deploymentplaces = (req, res) => {
  Deploymentplaces.getAllInteralCode(req.params.internal_code, ((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deploymentplaces_blue by internal code."
      });
    else res.send(data);
  })
  );
};

// Update a Deploymentplaces_blue identified by the id in the request
exports.update_deploymentplaces = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Deploymentplaces.updateByCode(
    req.params.code,
    new Deploymentplaces(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found deploymentplaces_blue record with code: ${req.params.code}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating deploymentplaces_blue record with code: " + req.params.code
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Deploymentplaces_blue record with the specified id in the request
exports.delete_deploymentplaces = (req, res) => {
  Deploymentplaces.remove(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deploymentplaces_blue record with code: ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete deploymentplaces_blue record with code " + req.params.code
        });
      }
    } else res.send({ message: `deploymentplaces_blue was deleted successfully!` });
  });
};

// Delete all deploymentplaces_blue records from the database.
exports.deleteAll_deploymentplaces = (req, res) => {
  Deploymentplaces.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all deploymentplaces records."
      });
    else res.send({ message: `All deploymentplaces records were deleted successfully!` });
  });
};


/**
 * Inserts a node into the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The inserted node.
 */
exports.insertNodes2db_deploymentplaces = (req, res) => {
  const node = req.body;

  global.totlength  = countNodes(node);
  console.log("global.totlength: ", global.totlength);
  totlength = global.totlength
  Deploymentplaces.insertNodes2db(node, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting deploymentplaces_blue nodes."
      });
    else {
      console.log("before sending the web response data : ", data);
      res.status(200).send({message: `All deploymentplaces_blue records were added successfully!` });
    }
  });
}

// Update a Tutorial identified by the id in the request
exports.update_deploymentplaces = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Deploymentplaces.updateByCode(
    req.params.code,
    new Deploymentplaces(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found basic code record with code ${req.params.code}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating basic code record with code " + req.params.code
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a baisic code record with the specified id in the request
exports.delete_deploymentplaces = (req, res) => {
  Deploymentplaces.remove(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found basic code record with code ${req.params.code}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete basic code record with code " + req.params.code
        });
      }
    } else res.send({ message: `basiccode was deleted successfully!` });
  });
};

// Delete all basic code records from the database.
exports.deleteAll_deploymentplaces = (req, res) => {
  Deploymentplaces.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all basiccode records."
      });
    else res.send({ message: `All basic code records were deleted successfully!` });
  });
};
