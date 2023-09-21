const sql2 = require("./db2.js");
const sql = require("./db.js");
// constructor
const Deploymentplaces_blue = function(deploymentplaces_blue) {
  this.code = deploymentplaces_blue.code;
  this.internal_code = deploymentplaces_blue.internal_code;
  this.areacode = deploymentplaces_blue.areacode;
  this.extend_name = deploymentplaces_blue.extend_name;
  this.name = deploymentplaces_blue.name;
  this.lang = deploymentplaces_blue.lang;
  this.lat = deploymentplaces_blue.lat;
  this.history = deploymentplaces_blue.history;
  this.drillid = deploymentplaces_blue.drillid;
  this.drillname = deploymentplaces_blue.drillname;
};

/**
 * Creates a new deployment place record in the database.
 * @param {Object} newDeploymentplaces_blue - The deployment place object to be created.
 * @param {Function} result - The callback function that returns the result.
 * @returns {Object} - Returns the created deployment place object with its ID.
 */
Deploymentplaces_blue.create = async (newDeploymentplaces_blue, totlength, result) => {
  // console.log("Deploymentplaces_blue.create() newDeploymentplaces_blue: ", "\nglobal.totlength: ", global.totlength)
  console.log("**************************Deploymentplaces_blue.create() 开始**************************")
  console.log("Deploymentplaces_blue.create() newDeploymentplaces_blue: ", newDeploymentplaces_blue,"\nglobal.totlength: ", global.totlength)

  let newDeploymentplacesWithoutChildren_blue = {};
  newDeploymentplacesWithoutChildren_blue.id = newDeploymentplaces_blue.id
  // newDeploymentplacesWithoutChildren_blue.id = null
  newDeploymentplacesWithoutChildren_blue.parentid = newDeploymentplaces_blue.parentid
  newDeploymentplacesWithoutChildren_blue.name = newDeploymentplaces_blue.name
  newDeploymentplacesWithoutChildren_blue.code = newDeploymentplaces_blue.code
  newDeploymentplacesWithoutChildren_blue.internal_code = newDeploymentplaces_blue.internal_code
  newDeploymentplacesWithoutChildren_blue.areacode = newDeploymentplaces_blue.areacode
  newDeploymentplacesWithoutChildren_blue.extend_name = newDeploymentplaces_blue.extend_name
  newDeploymentplacesWithoutChildren_blue.lang = newDeploymentplaces_blue.lang
  newDeploymentplacesWithoutChildren_blue.lat = newDeploymentplaces_blue.lat
  newDeploymentplacesWithoutChildren_blue.history = newDeploymentplaces_blue.history
  newDeploymentplacesWithoutChildren_blue.drillid = newDeploymentplaces_blue.drillid
  newDeploymentplacesWithoutChildren_blue.drillname = newDeploymentplaces_blue.drillname
  // console.log("Deploymentplaces_blue.create() newDeploymentplacesWithoutChildren_blue: 待插入的值", newDeploymentplacesWithoutChildren_blue)

  let rescode = ""
  sql2.query("INSERT INTO deploymentplaces_blue SET ?", newDeploymentplacesWithoutChildren_blue)
    .then(res => {
      console.log("sql.query( INSERT INTO deploymentplaces_blue SET), created newDeploymentplacesWithoutChildren_blue: ",  'global.totlength:',global.totlength,
                          "\n插入的值为 :-> ", newDeploymentplacesWithoutChildren_blue);
      // global.totlength--
      // if (global.totlength === 0) {
        rescode = res.code
      // }
    })
    .catch(err => {
      console.log("error: ", err);
      throw err;
    });

  // sql.query("INSERT INTO deploymentplaces_blue SET ?", newDeploymentplacesWithoutChildren_blue)
  //   .then(res => {
  //     console.log("sql.query( INSERT INTO deploymentplaces_blue SET), created newDeploymentplacesWithoutChildren_blue: ",  'global.totlength:',global.totlength,
  //                         "\n插入的值为 :-> ");
  //     // global.totlength--
  //     // if (global.totlength === 0) {
  //       return { id: res.code, ...newDeploymentplacesWithoutChildren_blue };
  //     // }
  //   })
  //   .catch(err => {
  //     console.log("error: ", err);
  //     throw err;
  //   });
  console.log("**************************Deploymentplaces_blue.create() 结束**************************")
  return { "rescode": rescode, ...newDeploymentplacesWithoutChildren_blue };
};

// Deploymentplaces_blue.create = (newDeploymentplaces_blue, totlength, result) => {
//   console.log("Deploymentplaces_blue.create() newDeploymentplaces_blue: ", "\nglobal.totlength: ", global.totlength)

//   // console.log("Deploymentplaces_blue.create() newDeploymentplaces_blue: ", newDeploymentplaces_blue,"\nglobal.totlength: ", global.totlength)

//   let newDeploymentplacesWithoutChildren_blue = {};
//   newDeploymentplacesWithoutChildren_blue.id = Object.values(newDeploymentplaces_blue)[0].id
//   newDeploymentplacesWithoutChildren_blue.parentid = Object.values(newDeploymentplaces_blue)[0].parentid
//   newDeploymentplacesWithoutChildren_blue.name = Object.values(newDeploymentplaces_blue)[0].name
//   newDeploymentplacesWithoutChildren_blue.code = Object.values(newDeploymentplaces_blue)[0].code
//   newDeploymentplacesWithoutChildren_blue.internal_code = Object.values(newDeploymentplaces_blue)[0].internal_code
//   newDeploymentplacesWithoutChildren_blue.areacode = Object.values(newDeploymentplaces_blue)[0].areacode
//   newDeploymentplacesWithoutChildren_blue.extend_name = Object.values(newDeploymentplaces_blue)[0].extend_name
//   newDeploymentplacesWithoutChildren_blue.lang = Object.values(newDeploymentplaces_blue)[0].lang
//   newDeploymentplacesWithoutChildren_blue.lat = Object.values(newDeploymentplaces_blue)[0].lat
//   newDeploymentplacesWithoutChildren_blue.history = Object.values(newDeploymentplaces_blue)[0].history
//   newDeploymentplacesWithoutChildren_blue.drillid = Object.values(newDeploymentplaces_blue)[0].drillid
//   newDeploymentplacesWithoutChildren_blue.drillname = Object.values(newDeploymentplaces_blue)[0].drillname

//   sql.query("INSERT INTO deploymentplaces_blue SET ?", newDeploymentplacesWithoutChildren_blue, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     console.log("sql.query( INSERT INTO deploymentplaces_blue SET), created newDeploymentplacesWithoutChildren_blue: ",  'global.totlength:',global.totlength,
//                           "\n插入的值为 :-> ");
//     // console.log("sql.query( INSERT INTO deploymentplaces_blue SET), created newDeploymentplacesWithoutChildren_blue: ",  'global.totlength:',global.totlength,
//     //                       "\n插入的值为 :-> ", { id: res.code, ...newDeploymentplacesWithoutChildren_blue });
//     global.totlength--
//     if (global.totlength === 0) {
//       result(null, { id: res.code, ...newDeploymentplacesWithoutChildren_blue });
//     }
//   });
// };
/**
 * Finds a deployment place record in the database by its code.
 * @param {string} code - The code of the deployment place to be found.
 * @param {Function} result - The callback function that returns the result.
 * @returns {Object} - Returns the found deployment place object.
 */
Deploymentplaces_blue.findByCode = (code, result) => {
  sql.query(`SELECT * FROM deploymentplaces_blue WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found deploymentplaces_blue: ", res);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

// Deploymentplaces_blue.findById = (id, result) => {
//   sql.query(`SELECT * FROM deploymentplaces_blue WHERE drillid = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     } else {
//       console.log("found deploymentplaces_blue: ", res);
//       result(null, res);
//     }
//   });
// };
Deploymentplaces_blue.findById = (id, result) => {
  sql.query(`SELECT * FROM deploymentplaces_blue WHERE drillid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      const objectTree = buildObjectTree_blueblue_selecteditmchg(res);
      console.log("found deploymentplaces_blue: ", res,"\nthe contructed objectTree: -> ", objectTree);
      result(null, objectTree);
    }
  });
};

Deploymentplaces_blue.getAllCode = (code, result) => {
  let query = "SELECT * FROM deploymentplaces_blue";

  if (query) {
    query += ` WHERE code LIKE '${code}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deploymentplaces_blue res[0]: ", res[0]);

    const objectTree = buildObjectTree_blueblue(res);
    const jsonObject = JSON.stringify(objectTree, null, 2);
    console.log('Deploymentplaces_blue.getAllCode() returned jsonObject: -> ',jsonObject);

    // result(null, res);
    result(null, objectTree);
  });
};
function getChildCodes(parentCode, deploymentPlaces_blue) {
  // Filter the deploymentPlaces_blue array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the deploymentPlaces_blue array to include only the direct child codes of the parent code
  // iterate over the deploymentPlaces_blue array and get the child codes of the parent code
  const childCodes = [];
  deploymentPlaces_blue.forEach((deploymentPlace) => {
     if (deploymentPlace.parentid === parentid) {
        childCodes.push(deploymentPlace);
      }
  })

  // const childCodes1 = deploymentPlaces_blue.filter((basicCode) => {
  //   return basicCode.code.startsWith(parentCode) && basicCode.code.length === parentCode.length + 2;

  //   // return basicCode.code.startsWith(parentCode) && basicCode.code !== parentCode && basicCode.code.length === parentCode.length + 2;
  // });

  return childCodes;
}
function getChildCodes_bk(parentCode, deploymentplaces_blue) {
  // Filter the deploymentplaces_blue array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the deploymentplaces_blue array to include only the direct child codes of the parent code

  const childCodes = deploymentplaces_blue.filter((deploymentplace) => {
    return deploymentplace.code.startsWith(parentCode) && deploymentplace.code.length === parentCode.length + 2;

    // return basicCode.code.startsWith(parentCode) && basicCode.code !== parentCode && basicCode.code.length === parentCode.length + 2;
  });

  return childCodes;
}

function buildObjectTree_blueblue_selecteditmchg(nodes, parentId = 1) {
  const tree = [];
  nodes.forEach(node => {
    if (node.parentid === parentId) {
      const children = buildObjectTree_blueblue(nodes, node.id);
      if (children.length) {
        node.children = children;
      }
      tree.push(node);
    }
  });
  return tree;
}

function buildObjectTree_blueblue(nodes, parentId = null) {
  const tree = [];
  nodes.forEach(node => {
    if (node.parentid === parentId) {
      const children = buildObjectTree_blueblue(nodes, node.id);
      if (children.length) {
        node.children = children;
      }
      tree.push(node);
    }
  });
  return tree;
}

function buildObjectTree(parentCode, deploymentplaces_blue) {
  const childCodes = getChildCodes(parentCode, deploymentplaces_blue);
  const objectTree = {};

  childCodes.forEach((childCode) => {
    objectTree[childCode.code] = {
      id: childCode.id,
      parentid: childCode.parentid,
      name: childCode.name,
      code: childCode.code,
      internal_code: childCode.internal_code,
      areacode: childCode.areacode,
      extend_name: childCode.extend_name,
      lang: childCode.Lang,
      lat: childCode.Lat,
      history: childCode.history,
      children: buildObjectTree(childCode.code, deploymentplaces_blue),
    };
  });

  return objectTree;
}


Deploymentplaces_blue.getAllInteralCode = (internal_code,result) => {
  let query = "SELECT * FROM deploymentplaces_blue";
  if (internal_code) {
    query += ` WHERE internal_code LIKE '${internal_code}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deploymentplaces_blue: ", res);
    result(null, res);
  });
};

Deploymentplaces_blue.updateByCode = (code, deploymentplaces_blue, result) => {
  sql.query(
    "UPDATE Deploymentplaces_blue SET name = ? WHERE code = ?",
    [deploymentplaces_blue.name, code],
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

      console.log("updated Deploymentplaces_blue: ", { code: code, ...deploymentplaces_blue });
      result(null, { code: code, ...deploymentplaces_blue });
    }
  );
};
Deploymentplaces_blue.updateByInternalCode = (internal_code, deploymentplaces_blue, result) => {
  sql.query(
    "UPDATE Deploymentplaces_blue SET name = ? WHERE internal_code = ?",
    [deploymentplaces_blue.name, internal_code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found deploymentplaces_blue with the internal_Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Deploymentplaces_blue: ", { internal_code: internal_code, ...deploymentplaces_blue });
      result(null, { internal_code: internal_code, ...deploymentplaces_blue });
    }
  );
};
Deploymentplaces_blue.remove = (drillid, result) => {
  const query = `DELETE FROM deploymentplaces_blue WHERE drillid = ${drillid}`;
  sql.query(query, (err, res) => {
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

    console.log("deleted deploymentplaces_blue with drillid: ", drillid);
    result(null, res);
  });
};
// Deploymentplaces_blue.remove = (code, result) => {
//   sql.query("DELETE FROM deploymentplaces_blue WHERE code = ?", code, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted deploymentplaces_blue with code: ", code);
//     result(null, res);
//   });
// };
Deploymentplaces_blue.removeAll = result => {
  sql.query("DELETE FROM deploymentplaces_blue", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} deploymentplaces_blue`);
    result(null, res);
  });
};

Deploymentplaces_blue.insertNodes2db = async (node,result ) => {
  console.log("Deploymentplaces_blue.insertNodes2db() current node:",node);
  const nodeCount = countNodes(node);
  global.totlength = nodeCount;
  // console.log("Deploymentplaces_blue.insertNodes2db() nodeCount: ", nodeCount);

  // let rootNode = Object.values(node)[0]
  let rootNode = node
  console.log("Deploymentplaces_blue.insertNodes2db() rootNode: -> ", rootNode)
  const createresult = null
  let results = []
  // 需要在此添加代码，检查前端传来的node是否只有一个根节点，如果是，则直接调用Deploymentplaces_blue.create(node, nodeCount, result)
  // 本函数处理只存在一个根节点（演习总指挥部）的情况，根节点的数据不插入到数据库中.
  // if (rootNode.parentid === null) {
    // Skip the root node if its parentid is null
    // let rootNodeAry = Object.values(rootNode)
    // for (const childNode of Object.values(rootNode)) {
    //   const children = childNode.children;
    //   console.log(children);
    // }

    for (const childNode1 of Object.values(rootNode)) {
      let childNode = childNode1
      try {
        console.log('Deploymentplaces_blue.insertNodes2db() childNode 待插入的子节点: ', childNode)
        const createresult = await Deploymentplaces_blue.create(childNode, nodeCount);
        results.push(createresult)


        if (childNode.children) {
          const insertResult = await Deploymentplaces_blue.insertNodes2db(childNode.children);
          // result(null, createresult)
        }
      } catch (err) {
        console.log("Error inserting node into database: ", err);
        // result(err)
        // return;
        throw err;
      }
    }
  // } else {
  //   // Insert all nodes if the root node's parentid is not null
  //   for (const childNode of Object.values(rootNode)) {
  //     try {
  //       const createResult = await Deploymentplaces_blue.create(childNode, nodeCount);
  //       results.push(createResult)
  //       if (childNode.children) {
  //         await insertNodes2db(childNode, result);
  //         // result(null, createResult);
  //       }
  //     } catch (err) {
  //       console.log("Error inserting node into database: ", err);
  //       // result(err);
  //       // return;
  //       throw err;
  //     }
  //   }
  // }
  
  return results;
}
// Deploymentplaces_blue.insertNodes2db = async (node,result ) => {
//   console.log("Deploymentplaces_blue.insertNodes2db() current node:",node);
//   const nodeCount = countNodes(node);
//   global.totlength = nodeCount;
//   // console.log("Deploymentplaces_blue.insertNodes2db() nodeCount: ", nodeCount);

//   // let rootNode = Object.values(node)[0]
//   let rootNode = node
//   console.log("Deploymentplaces_blue.insertNodes2db() rootNode: -> ", rootNode, "\n rootNode.children: -> ", rootNode.children)
//   const createresult = null
//   let results = []
//   // 需要在此添加代码，检查前端传来的node是否只有一个根节点，如果是，则直接调用Deploymentplaces_blue.create(node, nodeCount, result)
//   // 本函数处理只存在一个根节点（演习总指挥部）的情况，根节点的数据不插入到数据库中.
//   // if (rootNode.parentid === null) {
//     // Skip the root node if its parentid is null
//     for (const childNode of Object.values(rootNode.children)) {
//       try {
//         console.log('Deploymentplaces_blue.insertNodes2db() childNode 待插入的子节点: ', childNode)
//         const createresult = await Deploymentplaces_blue.create(childNode, nodeCount);
//         results.push(createresult)
//         if (childNode.children) {
//           const insertResult = await Deploymentplaces_blue.insertNodes2db(childNode.children);
//           // result(null, createresult)
//         }
//       } catch (err) {
//         console.log("Error inserting node into database: ", err);
//         // result(err)
//         // return;
//         throw err;
//       }
//     }
//   // } else {
//   //   // Insert all nodes if the root node's parentid is not null
//   //   for (const childNode of Object.values(rootNode)) {
//   //     try {
//   //       const createResult = await Deploymentplaces_blue.create(childNode, nodeCount);
//   //       results.push(createResult)
//   //       if (childNode.children) {
//   //         await insertNodes2db(childNode, result);
//   //         // result(null, createResult);
//   //       }
//   //     } catch (err) {
//   //       console.log("Error inserting node into database: ", err);
//   //       // result(err);
//   //       // return;
//   //       throw err;
//   //     }
//   //   }
//   // }
  
//   return results;
// }

// Deploymentplaces_blue.insertNodes2db-bk1 = async (node,result ) => {
//   console.log("Deploymentplaces_blue.insertNodes2db() current node:",node);
//   const nodeCount = countNodes(node);
//   global.totlength = nodeCount;
//   console.log("Deploymentplaces_blue.insertNodes2db() nodeCount: ", nodeCount);

//   let rootNode = Object.values(node)[0]
//   console.log("Deploymentplaces_blue.insertNodes2db() rootNode: ", rootNode)
//   const createresult = null
//   let results = []
//   // 需要在此添加代码，检查前端传来的node是否只有一个根节点，如果是，则直接调用Deploymentplaces_blue.create(node, nodeCount, result)
//   // 本函数处理只存在一个根节点（演习总指挥部）的情况，根节点的数据不插入到数据库中.
//   if (rootNode.parentid === null) {
//     // Skip the root node if its parentid is null
//     for (const childNode of Object.values(rootNode.children)) {
//       try {
//         console.log('Deploymentplaces_blue.insertNodes2db() childNode 待插入的子节点: ', childNode)
//         const createresult = await Deploymentplaces_blue.create(childNode, nodeCount);
//         results.push(createresult)
//         if (childNode.children) {
//           const insertResult = await Deploymentplaces_blue.insertNodes2db(childNode.children);
//           // result(null, createresult)
//         }
//       } catch (err) {
//         console.log("Error inserting node into database: ", err);
//         // result(err)
//         // return;
//         throw err;
//       }
//     }
//   } else {
//     // Insert all nodes if the root node's parentid is not null
//     for (const childNode of Object.values(rootNode)) {
//       try {
//         const createResult = await Deploymentplaces_blue.create(childNode, nodeCount);
//         results.push(createResult)
//         if (childNode.children) {
//           await insertNodes2db(childNode, result);
//           // result(null, createResult);
//         }
//       } catch (err) {
//         console.log("Error inserting node into database: ", err);
//         // result(err);
//         // return;
//         throw err;
//       }
//     }
//   }
  
//   return results;
// }
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

// Deploymentplaces_blue.insertNodes2db-bk2 = (node,result ) => {
//   Deploymentplaces_blue.create(node, totlength, (err, res) => {
//     if (err) {
//       // If an error occurs, call the result function with the error
//       result(err);
//     } else {
//       // If the create function succeeds, set a flag to indicate that a response has been sent
//       let responseSent = false;

//       let testnode = Object.values(node)[0];

//       // Recursively insert all child nodes
//       for (const child of Object.values(testnode.children)) {
//         let temp = {};
//         temp[child.code] = child;

//         Deploymentplaces_blue.insertNodes2db(temp, (err, res) => {
//           if (err && !responseSent) {
//             // If an error occurs and a response has not been sent, call the result function with the error
//             responseSent = true;
//             result(err);
//           } else if (res && !responseSent) {
//             // If the create function succeeds and a response has not been sent, call the result function with the result
//             responseSent = true;
//             result(null, res);
//           }
//         });
//       }
//     }
//   })
// }

// Deploymentplaces_blue.insertNodes2db-bk1 = (node,result ) => {
//   // console.log("Deploymentplaces_blue.insertNodes2db() current node:",node);
//   Deploymentplaces_blue.create(node,totlength,result); // insert the current node into the database
//   let testnode = Object.values(node)[0]
//   // recursively insert all child nodes
//   for (const child of Object.values(testnode.children)) {
//     let temp = {}
//     temp[child.code] = child
//     Deploymentplaces_blue.insertNodes2db(temp, result);
//   }
// }
module.exports = Deploymentplaces_blue;
