const appwrite = require("node-appwrite");
console.log("Exports:", Object.keys(appwrite));
try {
  const client = new appwrite.Client();
  const db = new appwrite.Databases(client);
  console.log(
    "Databases methods:",
    Object.getOwnPropertyNames(Object.getPrototypeOf(db))
  );
} catch (e) {
  console.log("Error checking Databases:", e.message);
}
