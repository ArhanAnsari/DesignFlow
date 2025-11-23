const appwrite = require("node-appwrite");
console.log("Has TablesDB:", "TablesDB" in appwrite);
console.log("Has Databases:", "Databases" in appwrite);
if (appwrite.Databases) {
  const client = new appwrite.Client();
  const db = new appwrite.Databases(client);
  console.log("Databases has createRow:", "createRow" in db);
  console.log("Databases has createDocument:", "createDocument" in db);
}
