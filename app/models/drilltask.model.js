const sql = require("./db.js");

// constructor
const Drilltask = function(drilltask) {
  this.taskid = drilltask.taskid;
  this.taskname = drilltask.taskname;
};

Drilltask.create = (newDrilltask, result) => {
  console.log("drilltask.model.js : Drilltask.create(): newDrilltask: ", newDrilltask)
  sql.query("INSERT INTO drilltask SET ?", newDrilltask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newDrilltask.taskid = res.insertId;
    console.log("created drilltask: object res:->",res, "the input newDrilltask object is : ->", { ...newDrilltask });
    result(null, { id: res.insertId, ...newDrilltask });
  });
};

Drilltask.findByTaskid = (id, result) => {
  sql.query(`SELECT * FROM drilltask WHERE taskid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found drilltask: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Drilltask with the id
    result({ kind: "not_found" }, null);
  });
};

Drilltask.getAll = (taskname, result) => {
  let query = "SELECT * FROM drilltask";

  if (taskname) {
    query += ` WHERE taskname LIKE '%${taskname}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("found drilltask: ", res);
    result(null, res);
  });
};

Drilltask.getAllTasks = result => {
  sql.query("SELECT * FROM drilltask", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("drilltask: ", res);
    result(null, res);
  });
};

Drilltask.updateById = (taskid, taskname, result) => {
  sql.query(
    "UPDATE drilltask SET taskname = ? WHERE taskid = ?",
    [taskname, taskid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Drilltask with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { taskid: taskid, taskname: taskname });
      result(null, { taskid: taskid, taskname: taskname });
    }
  );
};

Drilltask.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Drilltask with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Drilltask.removeAll = result => {
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

module.exports = Drilltask;
