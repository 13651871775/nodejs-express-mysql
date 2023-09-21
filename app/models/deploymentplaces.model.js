const sql = require("./db.js");

// constructor
// const Basiccode = function(basiccode) {
//   this.code = basiccode.code;
//   this.internal_code = basiccode.internal_code;
//   this.name = basiccode.name;
// };

// construnctor
const Deploymentplaces = function(deploymentplace) {
  // initialize deployment_places listed on the left side of the screen, the table deployment_places-blue
  this.id = deploymentplace.id;
  this.name = deploymentplace.name;
  this.internal_code = deploymentplace.internal_code;
  this.code = deploymentplace.code;
  this.areacode = deploymentplace.areacode;
  this.extend_name = deploymentplace.extend_name;
  this.lang = deploymentplace.lang;
  this.lat = deploymentplace.lat;
  this.history = deploymentplace.history;
}

Deploymentplaces.create = (deploymentplace, result) => {
  sql.query("INSERT INTO deploymentplaces SET ?", deploymentplace, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("inserted deploymentplaces: ", { id: res.code, ...deploymentplace });
    result(null, { id: res.code, ...deploymentplace });
  });
};

Deploymentplaces.findByCode = (code, result) => {
  sql.query(`SELECT * FROM deploymentplaces WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found deploymentplaces: ", res);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Deploymentplaces.getAllCode = (code, result) => {
  let query = "SELECT * FROM deploymentplaces";

  if (query) {
    query += ` WHERE code LIKE '${code}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deploymentplaces: ", res[0]);

    const objectTree = buildObjectTree(code, res);
    const jsonObject = JSON.stringify(objectTree, null, 2);
    console.log(jsonObject);

    // result(null, res);
    result(null, objectTree);
  });
};

function getChildCodes(parentCode, deploymentPlaces) {
  // Filter the deploymentPlaces array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the deploymentPlaces array to include only the direct child codes of the parent code

  const childCodes = deploymentPlaces.filter((basicCode) => {
    return basicCode.code.startsWith(parentCode) && basicCode.code.length === parentCode.length + 2;

    // return basicCode.code.startsWith(parentCode) && basicCode.code !== parentCode && basicCode.code.length === parentCode.length + 2;
  });

  return childCodes;
}
function buildObjectTree(parentCode, deploymentPlaces) {
  const childCodes = getChildCodes(parentCode, deploymentPlaces);
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
      children: buildObjectTree(childCode.code, deploymentPlaces),
    };
  });

  return objectTree;
}


Deploymentplaces.getAllInteralCode = (internal_code,result) => {
  let query = "SELECT * FROM deploymentplaces";
  if (internal_code) {
    query += ` WHERE internal_code LIKE '${internal_code}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Deploymentplaces: ", res);
    result(null, res);
  });
};

Deploymentplaces.updateByCode = (code, deploymentplace, result) => {
  sql.query(
    "UPDATE deploymentplaces SET name = ? WHERE code = ?",
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

      console.log("updated Deploymentplaces: ", { code: code, ...deploymentplace });
      result(null, { code: code, ...deploymentplace });
    }
  );
};
Deploymentplaces.updateByInternalCode = (internal_code, deploymentplace, result) => {
  sql.query(
    "UPDATE deploymentplaces SET name = ? WHERE internal_code = ?",
    [deploymentplace.name, internal_code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found deploymentplace with the internal_Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Deploymentplaces: ", { internal_code: internal_code, ...deploymentplace });
      result(null, { internal_code: internal_code, ...deploymentplace });
    }
  );
};
Deploymentplaces.remove = (code, result) => {
  sql.query("DELETE FROM deploymentplaces WHERE code = ?", code, (err, res) => {
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

    console.log("deleted deploymentplaces with code: ", code);
    result(null, res);
  });
};

Deploymentplaces.removeAll = result => {
  sql.query("DELETE FROM deploymentplaces", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Deploymentplaces`);
    result(null, res);
  });
};

Deploymentplaces.insertNodes2db = node => {
  this.create(node); // insert the current node into the database

  // recursively insert all child nodes
  for (const child of Object.values(node.children)) {
    this.insertNodes2db(child);
  }
}

// const rootNode = treeData["00"]; // get the root node of the tree
// insertNodes(rootNode); // insert all nodes into the database
module.exports = Deploymentplaces;
