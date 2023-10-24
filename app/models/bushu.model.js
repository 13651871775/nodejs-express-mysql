const sql = require("./db.js");

// construnctor
const Bushu = function(bushu) {
  // initialize bushu data listed on the right side of the screen, the table deployment_places-blue
  this.id = bushu.id;

  this.parentid = bushu.parentid;
  this.code = bushu.code;
  this.header = bushu.header;
  this.bushuid = bushu.bushuid;
  this.bushuname = bushu.bushuname;

  this.zhengzhanqu = bushu.zhengzhanqu;
  this.junzhong = bushu.junzhong;
  this.fuzhanqu = bushu.fuzhanqu;
  this.zhengjunji = bushu.zhengjunji;
  this.fujunji = bushu.fujunji;
  this.zhengshiji = bushu.zhengshiji;
  this.fushiji = bushu.fushiji;
  this.zhengtuanji = bushu.zhengtuanji;
  this.futuanji = bushu.futuanji;
  this.yingji = bushu.yingji;
  this.buduidaihao = bushu.buduidaihao;
  this.buduijiancheng = bushu.buduijiancheng;
  this.shujiegoujiancheng = bushu.shujiegoujiancheng;
  this.zhudi = bushu.zhudi;
  this.zhuzhanwuqi = bushu.zhuzhanwuqi;
  this.beizhu = bushu.beizhu;
  this.buduibianma = bushu.buduibianma;
}

Bushu.create = (newbushu, result) => {
  sql.query("INSERT INTO bushu SET ?", newbushu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("inserted bushu: ", { id: res.id, ...newbushu });
    // result(null, { id: res.id, ...newbushu });
  });
};

Bushu.findByCode = (code, result) => {
  sql.query(`SELECT * FROM bushu WHERE buduibianma = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found bushu: ", res);
      result(null, res[0]);
      return;
    }

    // not found bushu with the code
    result({ kind: "not_found bushu" }, null);
  });
};

Bushu.getAllCode = (code, result) => {
  let query = "SELECT * FROM bushu";

  if (code) {
    query += ` WHERE buduibianma LIKE '${code}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("bushu error: ", err);
      result(null, err);
      return;
    }

    console.log("bushu: ", res);

    const objData = buildObjectTree(code, res);
    console.log("objData : -> ",objData);
    // Create the arrayData array
    const arrayData = [];
    convertObjectToArray(objData, arrayData);
    // const jsonObject = JSON.stringify(objectTree, null, 2);
    console.log('arrayData: -> ',arrayData);

    // result(null, res);
    // result(null, objectTree);
    result(null, arrayData)
  });
};
function convertObjectToArray(obj, arr, parentId = null) {
  for (const key in obj) {
    const item = obj[key];
    const id = item.id;
    const parentid = parentId;
    const children = item.children ? Object.keys(item.children) : [];

    const newItem = {
      id,
      parentid,
      header: item.shujiegoujiancheng,
      code: item.buduibianma,
      zhengzhanqu: item.zhengzhanqu,
      junzhong: item.junzhong,
      fuzhanqu: item.fuzhanqu,
      zhengjunji: item.zhengjunji,
      fujunji: item.fujunji,
      zhengshiji: item.zhengshiji,
      fushiji: item.fushiji,
      zhengtuanji: item.zhengtuanji,
      futuanji: item.futuanji,
      yingji: item.yingji,
      buduidaihao: item.buduidaihao,
      buduijiancheng: item.buduijiancheng,
      shujiegoujiancheng: item.shujiegoujiancheng,
      zhudi: item.zhudi,
      zhuzhanwuqi: item.zhuzhanwuqi,
      beizhu: item.beizhu,
      buduibianma: item.buduibianma,
      items: []
    };

    arr.push(newItem);

    if (children.length > 0) {
      convertObjectToArray(item.children, newItem.items, id);
    }
  }
};

function getChildCodes(parentCode, bushues) {
  // Filter the bushues array to include only the child codes of the parent code (and exclude the parent code itself).
  // also Filter the bushues array to include only the direct child codes of the parent code

  const childCodes = bushues.filter((bushu) => {
    return bushu.buduibianma.startsWith(parentCode) && bushu.buduibianma.length === parentCode.length + 2;
  });

  return childCodes;
};
function buildObjectTree(parentCode, bushues) {
  const childCodes = getChildCodes(parentCode, bushues);
  const objectTree = {};

  childCodes.forEach((childCode) => {
    objectTree[childCode.buduibianma] = {
      id: childCode.id,
      parentid: childCode.parentid,
      header: childCode.shujiegoujiancheng,
      code: childCode.buduibianma,
      zhengzhanqu: childCode.zhengzhanqu,
      junzhong: childCode.junzhong,
      fuzhanqu: childCode.fuzhanqu,
      zhengjunji: childCode.zhengjunji,
      fujunji: childCode.fujunji,
      zhengshiji: childCode.zhengshiji,
      fushiji: childCode.fushiji,
      zhengtuanji: childCode.zhengtuanji,
      futuanji: childCode.futuanji,
      yingji: childCode.yingji,
      buduidaihao: childCode.buduidaihao,
      buduijiancheng: childCode.buduijiancheng,
      shujiegoujiancheng: childCode.shujiegoujiancheng,
      zhudi: childCode.zhudi,
      zhuzhanwuqi: childCode.zhuzhanwuqi,
      beizhu: childCode.beizhu,
      buduibianma: childCode.buduibianma,
      children: buildObjectTree(childCode.buduibianma, bushues),
    };
  });

  return objectTree;
}

Bushu.getAllInteralCode = (internal_code,result) => {
  let query = "SELECT * FROM bushu";
  if (internal_code) {
    query += ` WHERE internal_code LIKE '${internal_code}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Bushu: ", res);
    result(null, res);
  });
};

Bushu.updateByCode = (code, bushu, result) => {
  sql.query(
    "UPDATE bushu SET buduibianma = ? WHERE buduibianma = ?",
    [bushu.buduijiancheng, code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found bushu with the Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated bushu: ", { buduibianma: code, ...bushu });
      result(null, { buduibianma: code, ...bushu });
    }
  );
};
Bushu.updateByInternalCode = (internal_code, bushu, result) => {
  sql.query(
    "UPDATE bushu SET buduijiancheng = ? WHERE internal_code = ?",
    [bushu.buduijiancheng, internal_code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found bushu with the internal_Code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated bushu: ", { internal_code: internal_code, ...bushu });
      result(null, { internal_code: internal_code, ...bushu });
    }
  );
};
Bushu.remove = (code, result) => {
  sql.query("DELETE FROM bushu WHERE buduidaihao = ?", code, (err, res) => {
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

    console.log("deleted bushu with buduidaihao: ", code);
    result(null, res);
  });
};

Bushu.removeAll = result => {
  sql.query("DELETE FROM bushu", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} bushu`);
    result(null, res);
  });
};

Bushu.insertNodes2db = node => {
  this.create(node); // insert the current node into the database

  // recursively insert all child nodes
  for (const child of Object.values(node.children)) {
    this.insertNodes2db(child);
  }
}

// const rootNode = treeData["00"]; // get the root node of the tree
// insertNodes(rootNode); // insert all nodes into the database
module.exports = Bushu;