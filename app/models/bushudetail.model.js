const sql = require("./db.js");
 const { cloneDeep } = require('lodash');


const Bushudetail = function (bushudetail) {
    this.id = bushudetail.id;
    this.parentid = bushudetail.parentid;
    this.bushuid = bushudetail.bushuid;
    this.bushuname = bushudetail.bushuname;
    this.header = bushudetail.header;
    this.code = bushudetail.code;

    this.zhengzhanqu = bushudetail.zhengzhanqu;
    this.junzhong = bushudetail.junzhong;
    this.fuzhanqu = bushudetail.fuzhanqu;
    this.zhengjunji = bushudetail.zhengjunji;
    this.fujunji = bushudetail.fujunji;
    this.zhengshiji = bushudetail.zhengshiji;
    this.fushiji = bushudetail.fushiji;
    this.zhengtuanji = bushudetail.zhengtuanji;
    this.futuanji = bushudetail.futuanji;
    this.yingji = bushudetail.yingji;
    this.buduidaihao = bushudetail.buduidaihao;
    this.buduijiancheng = bushudetail.buduijiancheng;
    this.shujiegoujiancheng = bushudetail.shujiegoujiancheng;
    this.zhudi = bushudetail.zhudi;
    this.zhuzhanwuqi = bushudetail.zhuzhanwuqi;
    this.beizhu = bushudetail.beizhu;
    this.buduibianma = bushudetail.buduibianma;
    this.children = bushudetail.children;
};

// Bushudetail.insertNodes2db = node => {
//   this.create_bushu_detail(node); // insert the current node into the database

//   // recursively insert all child nodes
//   for (const child of Object.values(node.children)) {
//     this.insertNodes2db(child);
//   }
// };

Bushudetail.insertNodes2db = async (node,result ) => {
    console.log("Bushudetail.insertNodes2db() current node:",node);
    const nodeCount = countNodes(node);
    global.totlength = nodeCount;

    let rootNode = node
    console.log("Bushudetail.insertNodes2db() rootNode: -> ", rootNode)
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
        let childNode = cloneDeep(childNode1)
        if (childNode.children)  {
          delete childNode.children
        }
        try {
          console.log('Bushudetail.insertNodes2db() childNode 待插入的子节点: ', childNode)
          const createresult = await Bushudetail.create_bushu_detail(childNode, result)
          results.push(createresult)
  
          if (typeof childNode1.children !== 'undefined' && childNode1.children !== null && Object.keys(childNode1.children).length > 0) {
            const insertResult = await Bushudetail.insertNodes2db(childNode1.children, result);
            // result(null, createresult)
          }
        } catch (err) {
          console.log("Error inserting node into database: ", err);
          // result(err)
          // return;
          // throw err;
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
    result(null, results)
    return results;
};
function countNodes(node) {
    let count = 1;
    if (node == null) return 0;
    testnode = Object.values(node)[0]
    if (testnode == null ) return 0;
    if (testnode.children == null) return count;
    // length = Object.values(node).length
    for (const child of Object.values(testnode.children)) {
      let temp = {}
      temp[child.code] = child
      count += countNodes(temp);
      // Recursively count the child nodes
    }
    return count;
  };

Bushudetail.create_bushu_detail = (bushudetail, result) => {
  sql.query("INSERT INTO bushu_detail SET ?", bushudetail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("inserted bushudetail: ", { id: res.id, ...bushudetail });
    return { id: res.id, ...bushudetail }
  });
};
Bushudetail.getDetail = (bushuid, result) => {
    let query = "SELECT * FROM bushu_detail";
  
    if (bushuid) {
      query += ` WHERE bushuid = ${bushuid}`
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("Bushudetail.getDetail error: -> ", err);
        result(null, err);
        return;
      }
  
      const objectTree = buildObjectTree_bushu_selecteditmchg(res);
      console.log("found bushu detail records: ", res,"\nthe contructed objectTree: -> ", objectTree);
      result(null, objectTree);
    })
}

function buildObjectTree_bushu_selecteditmchg(nodes, parentId = null) {
  const tree = []

  nodes.forEach(node => {
    if (node.parentid === parentId) {
      const children = buildObjectTree_bushu_selecteditmchg(nodes, node.id)
      if (children.length) {
        node.children = children

        // add items property to the node with the same value as children
        node.items = children

      }
      tree.push(node)
    }
  })

  return tree;
}

function buildObjectTree_bushu(nodes, parentId = null) {
  const tree = [];
  nodes.forEach(node => {
    if (node.parentid === parentId) {
      const children = buildObjectTree_bushu(nodes, node.id);
      if (children.length) {
        node.children = children;
      }
      tree.push(node);
    }
  });
  return tree;
}

Bushudetail.remove = (id, result) => {
  sql.query("DELETE FROM bushu_detail WHERE bushuid = ?", id, (err, res) => {
    if (err) {
      console.log("removeBushu error: -> ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found bushu with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted bushu with id: ", id);
    result(null, res);
  });
};
module.exports = Bushudetail