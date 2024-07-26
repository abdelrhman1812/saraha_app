import mongoose from "mongoose";


export const dbConnection = mongoose.connect('mongodb://localhost:27017/sarahApplication').then(() => {
    console.log(' ( ======== Success connection mongoose ======== ) ');
})
0