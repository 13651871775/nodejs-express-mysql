global.totlength = 0;

const Basiccode = require("../models/basiccode.model.js");
const Deploymentplaces_blue = require("../models/deploymentplaces-blue.model.js");
const Deploymentplaces_red = require("../models/deploymentplaces-red.model.js");

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
  console.log("req.query.CODE", code);
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
exports.findAllCode_red = (req, res) => {
  const code = req.query.CODE;

  Deploymentplaces_red.getAllCode(code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving basiccode."
      });
    else res.send(data);
  });
};
// Retrieve blue Basiccode from the database (with condition).
exports.findAllCode_blue = (req, res) => {
  const code = req.query.CODE;

  Deploymentplaces_blue.getAllCode(code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blue basic codes."
      });
    else res.send(data);
  });
};

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
  let count = 1; // Count the current node
  testnode = Object.values(node)[0]
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







// -------------------------------deploymentPlaces Red----------------



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
  Deploymentplaces_red.remove(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deploymentplaces_red record with code ${req.params.code}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete deploymentplaces_red record with code " + req.params.code
        });
      }
    } else res.send({ message: `deploymentplaces_red was deleted successfully!` });
  });
};

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
exports.insertNodes2db_red = (req, res) => {
  const node = req.body;

  global.totlength  = countNodes(node);
  console.log("global.totlength: ", global.totlength);
  totlength = global.totlength
  
  Deploymentplaces_red.insertNodes2db(node, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting deploymentplaces_red nodes."
      });
    else res.send(data);
  });
}








// -----------------------------deploymentPlaces Blue----------------
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
exports.findAllCode_blue = (req, res) => {
  const code = req.query.CODE;

  Deploymentplaces_blue.getAllCode(code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blue deploymentplaces_blue."
      });
    else res.send(data);
  });
};

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
  Deploymentplaces_blue.remove(req.params.code, (err, data) => {
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
  Deploymentplaces_blue.insertNodes2db(node, (err, data) => {
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
