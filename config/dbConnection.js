const mongoose = require("mongoose");

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.dbport, {
            ssl: true,
            tlsAllowInvalidCertificates: false
        });
        console.log("Database Connected");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = dbConnection;