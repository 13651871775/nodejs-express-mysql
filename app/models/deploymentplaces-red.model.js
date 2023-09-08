const sql = require("./db.js");

// constructor
const Deploymentplaces_red = function(deploymentplaces_red) {
  this.code = deploymentplaces_red.code;
  this.internal_code = deploymentplaces_red.internal_code;
  this.areacode = deploymentplaces_red.areacode;
  this.extend_name = deploymentplaces_red.extend_name;
  this.name = deploymentplaces_red.name;
  this.Lang = deploymentplaces_red.Lang;
  this.Lat = deploymentplaces_red.Lat;
  this.history = deploymentplaces_red.history;
};

/**
 * Creates a new deployment place record in the database.
 * @param {Object} newDeploymentplaces_red - The deployment place object to be created.
 * @param {Function} result - The callback function that returns the result.
 * @returns {Object} - Returns the created deployment place object with its ID.
 */
Deploymentplaces_red.create = (newDeploymentplaces_red, totlength, result) => {
  console.log("Deploymentplaces_red.create result defnie: ", result)
  console.log("newDeploymentplaces_red: ", newDeploymentplaces_red,"global.totlength: ", global.totlength)

  let newDeploymentplacesWithoutChildren_red = {};
  newDeploymentplacesWithoutChildren_red.name = Object.values(newDeploymentplaces_red)[0].name
  newDeploymentplacesWithoutChildren_red.code = Object.values(newDeploymentplaces_red)[0].code
  newDeploymentplacesWithoutChildren_red.internal_code = Object.values(newDeploymentplaces_red)[0].internal_code
  newDeploymentplacesWithoutChildren_red.areacode = Object.values(newDeploymentplaces_red)[0].areacode
  newDeploymentplacesWithoutChildren_red.extend_name = Object.values(newDeploymentplaces_red)[0].extend_name
  newDeploymentplacesWithoutChildren_red.Lang = Object.values(newDeploymentplaces_red)[0].Lang
  newDeploymentplacesWithoutChildren_red.Lat = Object.values(newDeploymentplaces_red)[0].Lat
  newDeploymentplacesWithoutChildren_red.history = Object.values(newDeploymentplaces_red)[0].history


  sql.query("INSERT INTO deploymentplaces_red SET ?", newDeploymentplacesWithoutChildren_red, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newDeploymentplacesWithoutChildren_red: ", { id: res.code, ...newDeploymentplacesWithoutChildren_red });
    global.totlength--
    console.log("created Deploymentplaces_red: ", { id: res.code, ...newDeploymentplacesWithoutChildren_red },'global.totlength:',global.totlength);
    if (global.totlength === 0) {
      result(null, { id: res.code, ...newDeploymentplacesWithoutChildren_red });
    }
  });
};

/**
 * Finds a deployment place record in the database by its code.
 * @param {string} code - The code of the deployment place to be found.
 * @param {Function} result - The callback function that returns the result.
 * @returns {Object} - Returns the found deployment place object.
 */
Deploymentplaces_red.findByCode = (code, result) => {
  sql.query(`SELECT * FROM deploymentplaces_red WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found deploymentplaces_red: ", res);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Deploymentplaces_red.getAllCode = (code, result) => {
  let query = "SELECT * FROM deploymentplaces_red";

  if (query) {
    query += ` WHERE code LIKE '${code}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deploymentplaces_red: ", res[0]);

    const objectTree = buildObjectTree(code, res);
    const jsonObject = JSON.stringify(objectTree, null, 2);
    console.log(jsonObject);

    // result(null, res);
    result(null, objectTree);
  });
};

function getChildCodes(parentCode, deploymentplaces_red) {
  // Filter the deploymentplaces_red array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the deploymentplaces_red array to include only the direct child codes of the parent code

  const childCodes = deploymentplaces_red.filter((deploymentplace) => {
    return deploymentplace.code.startsWith(parentCode) && deploymentplace.code.length === parentCode.length + 2;

    // return basicCode.code.startsWith(parentCode) && basicCode.code !== parentCode && basicCode.code.length === parentCode.length + 2;
  });

  return childCodes;
}
function buildObjectTree(parentCode, deploymentplaces_red) {
  const childCodes = getChildCodes(parentCode, deploymentplaces_red);
  const objectTree = {};

  childCodes.forEach((childCode) => {
    objectTree[childCode.code] = {
      name: childCode.name,
      code: childCode.code,
      internal_code: childCode.internal_code,
      children: buildObjectTree(childCode.code, deploymentplaces_red),
    };
  });

  return objectTree;
}


Deploymentplaces_red.getAllInteralCode = (internal_code,result) => {
  let query = "SELECT * FROM deploymentplaces_red";
  if (internal_code) {
    query += ` WHERE internal_code LIKE '${internal_code}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deploymentplaces_red: ", res);
    result(null, res);
  });
};

Deploymentplaces_red.updateByCode = (code, deploymentplaces_red, result) => {
  sql.query(
    "UPDATE Deploymentplaces_red SET name = ? WHERE code = ?",
    [deploymentplaces_red.name, code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Basiccode with the Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Deploymentplaces_red: ", { code: code, ...deploymentplaces_red });
      result(null, { code: code, ...deploymentplaces_red });
    }
  );
};
Deploymentplaces_red.updateByInternalCode = (internal_code, deploymentplaces_red, result) => {
  sql.query(
    "UPDATE Deploymentplaces_red SET name = ? WHERE internal_code = ?",
    [deploymentplaces_red.name, internal_code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found deploymentplaces_red with the internal_Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Deploymentplaces_red: ", { internal_code: internal_code, ...deploymentplaces_red });
      result(null, { internal_code: internal_code, ...deploymentplaces_red });
    }
  );
};
Deploymentplaces_red.remove = (code, result) => {
  sql.query("DELETE FROM Deploymentplaces_red WHERE code = ?", code, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Deploymentplaces_red with code: ", code);
    result(null, res);
  });
};

Deploymentplaces_red.removeAll = result => {
  sql.query("DELETE FROM Deploymentplaces_red", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Deploymentplaces_red`);
    result(null, res);
  });
};

Deploymentplaces_red.insertNodes2db = (node,result ) => {
  console.log(".................input current node:",node);
  Deploymentplaces_red.create(node,totlength,result); // insert the current node into the database

  let testnode = Object.values(node)[0]

  // recursively insert all child nodes
  for (const child of Object.values(testnode.children)) {
    let temp = {}
    temp[child.code] = child

    Deploymentplaces_red.insertNodes2db(temp, result);
  }
}

// const rootNode = treeData["00"]; // get the root node of the tree
// insertNodes(rootNode); // insert all nodes into the database
module.exports = Deploymentplaces_red;
