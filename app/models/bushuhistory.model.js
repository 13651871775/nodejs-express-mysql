const sql = require("./db.js");

const Bushuhistory = function (bushuhistory) {
    this.id = bushuhistory.id;
    this.bushuname = bushuhistory.bushuname;
};

Bushuhistory.insertNodes2db = (node,result) => {
  if ( node == null || typeof node === 'undefined' || Object.keys(node).length ==0 ) return; // skip null nodes (shouldn't happen, but just in case)
  Bushuhistory.create_bushu_history(node,result); // insert the current node into the database

  // recursively insert all child nodes
  // if (typeof node.children === 'undefined' || node.children == null || Object.keys(node.children).length == 0 ) return; // skip null nodes (shouldn't happen, but just in case)
  // for (const child of Object.values(node.children)) {
  //   this.insertNodes2db(child);
  // }
};

// Create a bushu history
Bushuhistory.create_bushu_history = (bushuhistory, result) => {
  sql.query("INSERT INTO bushu_history SET ?", bushuhistory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("inserted bushuhistory: ", {id: res.insertId, ...bushuhistory });
    // return { id: res.id, ...newbushu };
    result(null, { id: res.insertId, ...bushuhistory });
  })
}
Bushuhistory.getAllHistory = (bushuname, result) => {
    let query = "SELECT * FROM bushu_history";
  
    if (bushuname) {
      query += ` WHERE bushuname LIKE '%${bushuname}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("getAllHistory error: -> ", err);
        result(null, err);
        return;
      }
  
      console.log("found bushu: -> ", res);
      result(null, res);
    });
  };

Bushuhistory.remove = (id, result) => {
  sql.query("DELETE FROM bushu_history WHERE id = ?", id, (err, res) => {
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

    console.log(`deleted bushu history with id: ${id}`);
    result(null, res);
  })
}

module.exports = Bushuhistory