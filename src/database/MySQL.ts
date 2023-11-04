import mysql from "mysql";
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "edulounge",
    password: "",
    multipleStatements: true,
});

con.connect(function (error) {
    if (error) {
        console.error(error);
    }
    console.log("Connected to MySQL-Database");
});

export default con;
