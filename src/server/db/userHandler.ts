import mongoose from 'mongoose';

interface User{

    userName:string;
    email:string;
    password:string;
}

const userSchema=new mongoose.Schema<User>({

userName:{
    type:String,
    require:true
},

email:{
    type:String,
    require:true
},

password:{
    type:String,
    require:true,
}

});

const user=mongoose.model<User>('User',userSchema);

export default User;