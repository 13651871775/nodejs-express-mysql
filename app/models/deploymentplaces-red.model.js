const sql2 = require("./db2.js");
const sql = require("./db.js");
// constructor
const Deploymentplaces_red = function(deploymentplaces_red) {
  this.code = deploymentplaces_red.code;
  this.internal_code = deploymentplaces_red.internal_code;
  this.areacode = deploymentplaces_red.areacode;
  this.extend_name = deploymentplaces_red.extend_name;
  this.name = deploymentplaces_red.name;
  this.lang = deploymentplaces_red.lang;
  this.lat = deploymentplaces_red.lat;
  this.history = deploymentplaces_red.history;
  this.drillid = deploymentplaces_red.drillid;
  this.drillname = deploymentplaces_red.drillname;
};

/**
 * Creates a new deployment place record in the database.
 * @param {Object} newDeploymentplaces_red - The deployment place object to be created.
 * @param {Function} result - The callback function that returns the result.
 * @returns {Object} - Returns the created deployment place object with its ID.
 */
Deploymentplaces_red.create = async (newDeploymentplaces_red, totlength, result) => {
  // console.log("Deploymentplaces_red.create() newDeploymentplaces_red: ", "\nglobal.totlength: ", global.totlength)
  console.log("**************************Deploymentplaces_red.create() 开始**************************")
  console.log("Deploymentplaces_red.create() newDeploymentplaces_red: ", newDeploymentplaces_red,"\nglobal.totlength: ", global.totlength)

  let newDeploymentplacesWithoutChildren_red = {};
  // 拖拽时会将basic_code 中的ID 传递过来，如果当前节点已经归属于某个演习任务，即deploymentplaces_red已经保存有从basic_code 中带来
  // ID， 此时再将此节点赋予另一个演习任务时，需要由表序列自动生成新的ID，否则会导致有重复的ID，从而导致插入数据库失败。 
  newDeploymentplacesWithoutChildren_red.id = newDeploymentplaces_red.id
  // newDeploymentplacesWithoutChildren_red.id = null;
  newDeploymentplacesWithoutChildren_red.parentid = newDeploymentplaces_red.parentid
  newDeploymentplacesWithoutChildren_red.name = newDeploymentplaces_red.name
  newDeploymentplacesWithoutChildren_red.code = newDeploymentplaces_red.code
  newDeploymentplacesWithoutChildren_red.internal_code = newDeploymentplaces_red.internal_code
  newDeploymentplacesWithoutChildren_red.areacode = newDeploymentplaces_red.areacode
  newDeploymentplacesWithoutChildren_red.extend_name = newDeploymentplaces_red.extend_name
  newDeploymentplacesWithoutChildren_red.lang = newDeploymentplaces_red.lang
  newDeploymentplacesWithoutChildren_red.lat = newDeploymentplaces_red.lat
  newDeploymentplacesWithoutChildren_red.history = newDeploymentplaces_red.history
  newDeploymentplacesWithoutChildren_red.drillid = newDeploymentplaces_red.drillid
  newDeploymentplacesWithoutChildren_red.drillname = newDeploymentplaces_red.drillname
  // console.log("Deploymentplaces_red.create() newDeploymentplacesWithoutChildren_red: 待插入的值", newDeploymentplacesWithoutChildren_red)

  let rescode = ""
  sql2.query("INSERT INTO deploymentplaces_red SET ?", newDeploymentplacesWithoutChildren_red)
    .then(res => {
      console.log("sql.query( INSERT INTO deploymentplaces_red SET), created newDeploymentplacesWithoutChildren_red: ",  'global.totlength:',global.totlength,
                          "\n插入的值为 :-> ", newDeploymentplacesWithoutChildren_red);
      // global.totlength--
      // if (global.totlength === 0) {
        rescode = res.code
      // }
    })
    .catch(err => {
      console.log("error: ", err);
      throw err;
    });

  // sql.query("INSERT INTO deploymentplaces_red SET ?", newDeploymentplacesWithoutChildren_red)
  //   .then(res => {
  //     console.log("sql.query( INSERT INTO deploymentplaces_red SET), created newDeploymentplacesWithoutChildren_red: ",  'global.totlength:',global.totlength,
  //                         "\n插入的值为 :-> ");
  //     // global.totlength--
  //     // if (global.totlength === 0) {
  //       return { id: res.code, ...newDeploymentplacesWithoutChildren_red };
  //     // }
  //   })
  //   .catch(err => {
  //     console.log("error: ", err);
  //     throw err;
  //   });
  console.log("**************************Deploymentplaces_red.create() 结束**************************")
  return { "rescode": rescode, ...newDeploymentplacesWithoutChildren_red };
};

// Deploymentplaces_red.create = (newDeploymentplaces_red, totlength, result) => {
//   console.log("Deploymentplaces_red.create() newDeploymentplaces_red: ", "\nglobal.totlength: ", global.totlength)

//   // console.log("Deploymentplaces_red.create() newDeploymentplaces_red: ", newDeploymentplaces_red,"\nglobal.totlength: ", global.totlength)

//   let newDeploymentplacesWithoutChildren_red = {};
//   newDeploymentplacesWithoutChildren_red.id = Object.values(newDeploymentplaces_red)[0].id
//   newDeploymentplacesWithoutChildren_red.parentid = Object.values(newDeploymentplaces_red)[0].parentid
//   newDeploymentplacesWithoutChildren_red.name = Object.values(newDeploymentplaces_red)[0].name
//   newDeploymentplacesWithoutChildren_red.code = Object.values(newDeploymentplaces_red)[0].code
//   newDeploymentplacesWithoutChildren_red.internal_code = Object.values(newDeploymentplaces_red)[0].internal_code
//   newDeploymentplacesWithoutChildren_red.areacode = Object.values(newDeploymentplaces_red)[0].areacode
//   newDeploymentplacesWithoutChildren_red.extend_name = Object.values(newDeploymentplaces_red)[0].extend_name
//   newDeploymentplacesWithoutChildren_red.lang = Object.values(newDeploymentplaces_red)[0].lang
//   newDeploymentplacesWithoutChildren_red.lat = Object.values(newDeploymentplaces_red)[0].lat
//   newDeploymentplacesWithoutChildren_red.history = Object.values(newDeploymentplaces_red)[0].history
//   newDeploymentplacesWithoutChildren_red.drillid = Object.values(newDeploymentplaces_red)[0].drillid
//   newDeploymentplacesWithoutChildren_red.drillname = Object.values(newDeploymentplaces_red)[0].drillname

//   sql.query("INSERT INTO deploymentplaces_red SET ?", newDeploymentplacesWithoutChildren_red, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     console.log("sql.query( INSERT INTO deploymentplaces_red SET), created newDeploymentplacesWithoutChildren_red: ",  'global.totlength:',global.totlength,
//                           "\n插入的值为 :-> ");
//     // console.log("sql.query( INSERT INTO deploymentplaces_red SET), created newDeploymentplacesWithoutChildren_red: ",  'global.totlength:',global.totlength,
//     //                       "\n插入的值为 :-> ", { id: res.code, ...newDeploymentplacesWithoutChildren_red });
//     global.totlength--
//     if (global.totlength === 0) {
//       result(null, { id: res.code, ...newDeploymentplacesWithoutChildren_red });
//     }
//   });
// };
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

// Deploymentplaces_red.findById = (id, result) => {
//   sql.query(`SELECT * FROM deploymentplaces_red WHERE drillid = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     } else {
//       console.log("found deploymentplaces_red: ", res);
//       result(null, res);
//     }
//   });
// };
Deploymentplaces_red.findById = (id, result) => {
  sql.query(`SELECT * FROM deploymentplaces_red WHERE drillid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      const objectTree = buildObjectTree_redblue_selecteditmchg(res);
      console.log("found deploymentplaces_red: ", res,"\nthe contructed objectTree: -> ", objectTree);
      result(null, objectTree);
    }
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

    console.log("deploymentplaces_red res[0]: ", res[0]);

    const objectTree = buildObjectTree_redblue(res);
    const jsonObject = JSON.stringify(objectTree, null, 2);
    console.log('Deploymentplaces_red.getAllCode() returned jsonObject: -> ',jsonObject);

    // result(null, res);
    result(null, objectTree);
  });
};
function getChildCodes(parentCode, deploymentPlaces_red) {
  // Filter the deploymentPlaces_blue array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the deploymentPlaces_blue array to include only the direct child codes of the parent code
  // iterate over the deploymentPlaces_blue array and get the child codes of the parent code
  const childCodes = [];
  deploymentPlaces_red.forEach((deploymentPlace) => {
     if (deploymentPlace.parentid === parentid) {
        childCodes.push(deploymentPlace);
      }
  })

  // const childCodes1 = deploymentPlaces_red.filter((basicCode) => {
  //   return basicCode.code.startsWith(parentCode) && basicCode.code.length === parentCode.length + 2;

  //   // return basicCode.code.startsWith(parentCode) && basicCode.code !== parentCode && basicCode.code.length === parentCode.length + 2;
  // });

  return childCodes;
}
function getChildCodes_bk(parentCode, deploymentplaces_red) {
  // Filter the deploymentplaces_red array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the deploymentplaces_red array to include only the direct child codes of the parent code

  const childCodes = deploymentplaces_red.filter((deploymentplace) => {
    return deploymentplace.code.startsWith(parentCode) && deploymentplace.code.length === parentCode.length + 2;

    // return basicCode.code.startsWith(parentCode) && basicCode.code !== parentCode && basicCode.code.length === parentCode.length + 2;
  });

  return childCodes;
}

function buildObjectTree_redblue_selecteditmchg(nodes, parentId = 1) {
  const tree = [];
  nodes.forEach(node => {
    if (node.parentid === parentId) {
      const children = buildObjectTree_redblue(nodes, node.id);
      if (children.length) {
        node.children = children;
      }
      tree.push(node);
    }
  });
  return tree;
}

function buildObjectTree_redblue(nodes, parentId = null) {
  const tree = [];
  nodes.forEach(node => {
    if (node.parentid === parentId) {
      const children = buildObjectTree_redblue(nodes, node.id);
      if (children.length) {
        node.children = children;
      }
      tree.push(node);
    }
  });
  return tree;
}

function buildObjectTree(parentCode, deploymentplaces_red) {
  const childCodes = getChildCodes(parentCode, deploymentplaces_red);
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
Deploymentplaces_red.remove = (drillid, result) => {
  const query = `DELETE FROM deploymentplaces_red WHERE drillid = ${drillid}`;
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

    console.log("deleted deploymentplaces_red with drillid: ", drillid);
    result(null, res);
  });
};
// Deploymentplaces_red.remove = (code, result) => {
//   sql.query("DELETE FROM deploymentplaces_red WHERE code = ?", code, (err, res) => {
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

//     console.log("deleted deploymentplaces_red with code: ", code);
//     result(null, res);
//   });
// };
Deploymentplaces_red.removeAll = result => {
  sql.query("DELETE FROM deploymentplaces_red", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} deploymentplaces_red`);
    result(null, res);
  });
};

Deploymentplaces_red.insertNodes2db = async (node,result ) => {
  console.log("Deploymentplaces_red.insertNodes2db() current node:",node);
  const nodeCount = countNodes(node);
  global.totlength = nodeCount;
  // console.log("Deploymentplaces_red.insertNodes2db() nodeCount: ", nodeCount);

  // let rootNode = Object.values(node)[0]
  let rootNode = node
  console.log("Deploymentplaces_red.insertNodes2db() rootNode: -> ", rootNode)
  const createresult = null
  let results = []
  // 需要在此添加代码，检查前端传来的node是否只有一个根节点，如果是，则直接调用Deploymentplaces_red.create(node, nodeCount, result)
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
        console.log('Deploymentplaces_red.insertNodes2db() childNode 待插入的子节点: ', childNode)
        const createresult = await Deploymentplaces_red.create(childNode, nodeCount);
        results.push(createresult)


        if (childNode.children) {
          const insertResult = await Deploymentplaces_red.insertNodes2db(childNode.children);
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
  //       const createResult = await Deploymentplaces_red.create(childNode, nodeCount);
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
// Deploymentplaces_red.insertNodes2db = async (node,result ) => {
//   console.log("Deploymentplaces_red.insertNodes2db() current node:",node);
//   const nodeCount = countNodes(node);
//   global.totlength = nodeCount;
//   // console.log("Deploymentplaces_red.insertNodes2db() nodeCount: ", nodeCount);

//   // let rootNode = Object.values(node)[0]
//   let rootNode = node
//   console.log("Deploymentplaces_red.insertNodes2db() rootNode: -> ", rootNode, "\n rootNode.children: -> ", rootNode.children)
//   const createresult = null
//   let results = []
//   // 需要在此添加代码，检查前端传来的node是否只有一个根节点，如果是，则直接调用Deploymentplaces_red.create(node, nodeCount, result)
//   // 本函数处理只存在一个根节点（演习总指挥部）的情况，根节点的数据不插入到数据库中.
//   // if (rootNode.parentid === null) {
//     // Skip the root node if its parentid is null
//     for (const childNode of Object.values(rootNode.children)) {
//       try {
//         console.log('Deploymentplaces_red.insertNodes2db() childNode 待插入的子节点: ', childNode)
//         const createresult = await Deploymentplaces_red.create(childNode, nodeCount);
//         results.push(createresult)
//         if (childNode.children) {
//           const insertResult = await Deploymentplaces_red.insertNodes2db(childNode.children);
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
//   //       const createResult = await Deploymentplaces_red.create(childNode, nodeCount);
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

// Deploymentplaces_red.insertNodes2db-bk1 = async (node,result ) => {
//   console.log("Deploymentplaces_red.insertNodes2db() current node:",node);
//   const nodeCount = countNodes(node);
//   global.totlength = nodeCount;
//   console.log("Deploymentplaces_red.insertNodes2db() nodeCount: ", nodeCount);

//   let rootNode = Object.values(node)[0]
//   console.log("Deploymentplaces_red.insertNodes2db() rootNode: ", rootNode)
//   const createresult = null
//   let results = []
//   // 需要在此添加代码，检查前端传来的node是否只有一个根节点，如果是，则直接调用Deploymentplaces_red.create(node, nodeCount, result)
//   // 本函数处理只存在一个根节点（演习总指挥部）的情况，根节点的数据不插入到数据库中.
//   if (rootNode.parentid === null) {
//     // Skip the root node if its parentid is null
//     for (const childNode of Object.values(rootNode.children)) {
//       try {
//         console.log('Deploymentplaces_red.insertNodes2db() childNode 待插入的子节点: ', childNode)
//         const createresult = await Deploymentplaces_red.create(childNode, nodeCount);
//         results.push(createresult)
//         if (childNode.children) {
//           const insertResult = await Deploymentplaces_red.insertNodes2db(childNode.children);
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
//         const createResult = await Deploymentplaces_red.create(childNode, nodeCount);
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

// Deploymentplaces_red.insertNodes2db-bk2 = (node,result ) => {
//   Deploymentplaces_red.create(node, totlength, (err, res) => {
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

//         Deploymentplaces_red.insertNodes2db(temp, (err, res) => {
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

// Deploymentplaces_red.insertNodes2db-bk1 = (node,result ) => {
//   // console.log("Deploymentplaces_red.insertNodes2db() current node:",node);
//   Deploymentplaces_red.create(node,totlength,result); // insert the current node into the database
//   let testnode = Object.values(node)[0]
//   // recursively insert all child nodes
//   for (const child of Object.values(testnode.children)) {
//     let temp = {}
//     temp[child.code] = child
//     Deploymentplaces_red.insertNodes2db(temp, result);
//   }
// }
module.exports = Deploymentplaces_red;
