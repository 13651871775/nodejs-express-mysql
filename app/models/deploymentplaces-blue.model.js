const sql = require("./db.js");

// constructor
// const Basiccode = function(basiccode) {
//   this.code = basiccode.code;
//   this.internal_code = basiccode.internal_code;
//   this.name = basiccode.name;
// };

// construnctor
const Deploymentplaces_blue = function(deploymentplace) {
  // initialize deployment_places listed on the left side of the screen, the table deployment_places-blue
  this.id = deploymentplace.id;
  this.name = deploymentplace.name;
  this.internal_code = deploymentplace.internal_code;
  this.code = deploymentplace.code;
  this.areacode = deploymentplace.areacode;
  this.extend_name = deploymentplace.extend;
  this.Lang = deploymentplace.Lang;
  this.Lat = deploymentplace.Lat;
  this.history = deploymentplace.history;
}

Deploymentplaces_blue.create = (newDeploymentplaces_blue, result) => {
  let newDeploymentplacesWithoutChildren_blue = {};
  newDeploymentplacesWithoutChildren_blue.name = Object.values(newDeploymentplaces_blue)[0].name
  newDeploymentplacesWithoutChildren_blue.code = Object.values(newDeploymentplaces_blue)[0].code
  newDeploymentplacesWithoutChildren_blue.internal_code = Object.values(newDeploymentplaces_blue)[0].internal_code
  newDeploymentplacesWithoutChildren_blue.areacode = Object.values(newDeploymentplaces_blue)[0].areacode
  newDeploymentplacesWithoutChildren_blue.extend_name = Object.values(newDeploymentplaces_blue)[0].extend_name
  newDeploymentplacesWithoutChildren_blue.Lang = Object.values(newDeploymentplaces_blue)[0].Lang
  newDeploymentplacesWithoutChildren_blue.Lat = Object.values(newDeploymentplaces_blue)[0].Lat
  newDeploymentplacesWithoutChildren_blue.history = Object.values(newDeploymentplaces_blue)[0].history

  sql.query("INSERT INTO deploymentplaces_blue SET ?", newDeploymentplacesWithoutChildren_blue, (err, res) => {
    console.log("error: ", err, "res:", res)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    global.totlength--
    console.log("global.totlength:",global.totlength)
    if (global.totlength === 0) {
      console.log("created Deploymentplaces_blue: ", { id: res.code, ...newDeploymentplacesWithoutChildren_blue });
      // result(null, { id: res.code, ...newDeploymentplacesWithoutChildren_blue });
      result(null, { id: 200 });
    }
  });
};

Deploymentplaces_blue.findByCode = (code, result) => {
  sql.query(`SELECT * FROM Deploymentplaces_blue WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Deploymentplaces_blue: ", res);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Deploymentplaces_blue.getAllCode = (code, result) => {
  let query = "SELECT * FROM Deploymentplaces_blue";

  if (query) {
    query += ` WHERE code LIKE '${code}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Deploymentplaces_blue: ", res[0]);

    const objectTree = buildObjectTree(code, res);
    const jsonObject = JSON.stringify(objectTree, null, 2);
    console.log(jsonObject);

    // result(null, res);
    result(null, objectTree);
  });
};

function getChildCodes(parentCode, deploymentPlaces_blue) {
  // Filter the deploymentPlaces_blue array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the deploymentPlaces_blue array to include only the direct child codes of the parent code

  const childCodes = deploymentPlaces_blue.filter((basicCode) => {
    return basicCode.code.startsWith(parentCode) && basicCode.code.length === parentCode.length + 2;

    // return basicCode.code.startsWith(parentCode) && basicCode.code !== parentCode && basicCode.code.length === parentCode.length + 2;
  });

  return childCodes;
}
function buildObjectTree(parentCode, deploymentPlaces_blue) {
  const childCodes = getChildCodes(parentCode, deploymentPlaces_blue);
  const objectTree = {};

  childCodes.forEach((childCode) => {
    objectTree[childCode.code] = {
      name: childCode.name,
      code: childCode.code,
      internal_code: childCode.internal_code,
      areacode: childCode.areacode,
      extend_name: childCode.extend_name,
      Lang: childCode.Lang,
      Lat: childCode.Lat,
      history: childCode.history,
      children: buildObjectTree(childCode.code, deploymentPlaces_blue),
    };
  });

  return objectTree;
}


Deploymentplaces_blue.getAllInteralCode = (internal_code,result) => {
  let query = "SELECT * FROM Deploymentplaces_blue";
  if (internal_code) {
    query += ` WHERE internal_code LIKE '${internal_code}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Deploymentplaces_blue: ", res);
    result(null, res);
  });
};

Deploymentplaces_blue.updateByCode = (code, deploymentplace, result) => {
  sql.query(
    "UPDATE Deploymentplaces_blue SET name = ? WHERE code = ?",
    [deploymentplace.name, code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found deploymentplace with the Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Deploymentplaces_blue: ", { code: code, ...deploymentplace });
      result(null, { code: code, ...deploymentplace });
    }
  );
};
Deploymentplaces_blue.updateByInternalCode = (internal_code, deploymentplace_blue, result) => {
  sql.query(
    "UPDATE Deploymentplaces_blue SET name = ? WHERE internal_code = ?",
    [deploymentplace_blue.name, internal_code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found deploymentplace_blue with the internal_Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Deploymentplaces_blue: ", { internal_code: internal_code, ...deploymentplace_blue });
      result(null, { internal_code: internal_code, ...deploymentplace_blue });
    }
  );
};
Deploymentplaces_blue.remove = (code, result) => {
  sql.query("DELETE FROM Deploymentplaces_blue WHERE code = ?", code, (err, res) => {
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

    console.log("deleted Deploymentplaces_blue with code: ", code);
    result(null, res);
  });
};

Deploymentplaces_blue.removeAll = result => {
  sql.query("DELETE FROM Deploymentplaces_blue", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Deploymentplaces_blue`);
    result(null, res);
  });
};

Deploymentplaces_blue.insertNodes2db = (node, result) => {
  console.log(".................蓝方部署表model当前正在处理节点: ", node);
  Deploymentplaces_blue.create(node,result); // insert the current node into the database
  let testnode = Object.values(node)[0]
  // recursively insert all child nodes
  for (const child of Object.values(testnode.children)) {
    let temp = {}
    temp[child.code] = child
    Deploymentplaces_blue.insertNodes2db(temp, result);
  }
}

// const rootNode = treeData["00"]; // get the root node of the tree
// insertNodes(rootNode); // insert all nodes into the database
module.exports = Deploymentplaces_blue;
