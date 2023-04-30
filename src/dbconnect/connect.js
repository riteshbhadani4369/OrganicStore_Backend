const mongoose = require("mongoose");

const DB = `mongodb+srv://riteshbhadani:Riteshbhadani*1@cluster0.xbe4wim.mongodb.net/Organic_store?retryWrites=true&w=majority`;

mongoose.connect(DB,{ 
    // useNewUrlParser : true,
    // useCreateIndex:true,    
    // useUnifiedTopology:true,
    // useFindAndModify:false
 }
)
    .then(() => {
        console.log("db is connected");
    })
    .catch(() => {
        console.log("db is not connected");
    })