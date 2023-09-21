const sql = require("./db.js");

// constructor
const Basiccode = function(basiccode) {
  this.code = basiccode.code;
  this.internal_code = basiccode.internal_code;
  this.name = basiccode.name;
};

Basiccode.create = (newBasiccode,totlength, result) => {
  console.log("newBasiccode: ", newBasiccode,"global.totlength: ", global.totlength);

  let newBasiccodeWithoutChildren = {};
  newBasiccodeWithoutChildren.name = Object.values(newBasiccode)[0].name
  newBasiccodeWithoutChildren.code = Object.values(newBasiccode)[0].code
  newBasiccodeWithoutChildren.internal_code = Object.values(newBasiccode)[0].internal_code

  sql.query("INSERT INTO basic_code SET ?", newBasiccodeWithoutChildren, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    global.totlength--
    console.log("created basiccode: ", { id: res.code, ...newBasiccodeWithoutChildren });
    if (global.totlength === 0) {
      result(null, { id: res.code, ...newBasiccodeWithoutChildren });
    }

  });
};

Basiccode.findByCode = (code, result) => {
  sql.query(`SELECT * FROM basiccode WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found basiccode: ", res);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Basiccode.getAllCode = (code, result) => {
  let query = "SELECT * FROM basic_code";

  if (query) {
    query += ` WHERE code LIKE '${code}%'`;
  }
  console.log("query:", query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("basic_code: ", res[0]);
    const objectTree = buildObjectTree(code, res);
    const jsonObject = JSON.stringify(objectTree, null, 2);
    console.log(jsonObject);

    // result(null, res);
    result(null, objectTree);
  });
};

function getChildCodes(parentCode, basicCodes) {
  // Filter the basicCodes array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the basicCodes array to include only the direct child codes of the parent code

  const childCodes = basicCodes.filter((basicCode) => {
    return basicCode.code.startsWith(parentCode) && basicCode.code.length === parentCode.length + 2;

    // return basicCode.code.startsWith(parentCode) && basicCode.code !== parentCode && basicCode.code.length === parentCode.length + 2;
  });

  return childCodes;
}
function buildObjectTree(parentCode, basicCodes) {
  const childCodes = getChildCodes(parentCode, basicCodes);
  const objectTree = {};

  childCodes.forEach((childCode) => {
    objectTree[childCode.code] = {
      id: childCode.id,
      name: childCode.name,
      code: childCode.code,
      internal_code: childCode.internal_code,
      areacode: childCode.areacode,
      extend_name: childCode.extend_name,
      lang: childCode.lang,
      lat: childCode.lat,
      history: childCode.history,
      children: buildObjectTree(childCode.code, basicCodes),
    };
  });

  return objectTree;
}

Basiccode.getAllInteralCode = (internal_code,result) => {
  let query = "SELECT * FROM basic_code";
  if (internal_code) {
    query += ` WHERE internal_code LIKE '${internal_code}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("basiccode: ", res);
    result(null, res);
  });
};

Basiccode.updateByCode = (code, basiccode, result) => {
  sql.query(
    "UPDATE basic_code SET name = ? WHERE code = ?",
    [basiccode.name, code],
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

      console.log("updated basiccode: ", { code: code, ...basiccode });
      result(null, { code: code, ...basiccode });
    }
  );
};
Basiccode.updateByInternalCode = (internal_code, basiccode, result) => {
  sql.query(
    "UPDATE basic_code SET name = ? WHERE internal_code = ?",
    [basiccode.name, internal_code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Basiccode with the internal_Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated basiccode: ", { internal_code: internal_code, ...basiccode });
      result(null, { internal_code: internal_code, ...basiccode });
    }
  );
};
Basiccode.remove = (code, result) => {
  sql.query("DELETE FROM basic_code WHERE code = ?", code, (err, res) => {
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

    console.log("deleted Basiccode with code: ", code);
    result(null, res);
  });
};

Basiccode.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

Basiccode.insertNodes2db = (node,totlength,result) => {
  Basiccode.create(node,totlength,result); // insert the current node into the database
  console.log("Basiccode.insertNodes2db::node:",node);

  // let testnode = Object.values(temp)[0];
  // console.log("testnode:",testnode);
  // console.log("testnode.children:",testnode.children);
  let testnode = Object.values(node)[0]
  // recursively insert all child nodes
  for (const child of Object.values(testnode.children)) {
    let temp = {}
    temp[child.code] = child

    Basiccode.insertNodes2db(temp,totlength-1, result);
  }
}

// const rootNode = treeData["00"]; // get the root node of the tree
// insertNodes(rootNode); // insert all nodes into the database
module.exports = Basiccode;
