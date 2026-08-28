const mongoose = require('mongoose');

const  CanvasSchema = new mongoose.Schema(
    {owner:{type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true
    },
    name: {type: String,
    required: true,
    trim: true
    },
    elements: {
       
      type:   [{type: mongoose.Schema.Types.Mixed}],
    },
    sharedWith: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',},
    ],
},
{timestamps: true}
);

//create a canvas for a user with given email
CanvasSchema.statics.createCanvasForUser = async function (email,name) {
   
    try{
         const user = await mongoose.model('User').findOne({email}); 
        if(!user){
            return Error('User not found');
    }
    const canvas = new this({owner: user._id, name,
        elements: [],
        sharedWith: [],
    });

    const newCanvas = await canvas.save();
    return newCanvas;
   
}
catch(error){
    return  Error('error creating canvas');
}}

CanvasSchema.statics.getAllCanvases=async function(email){
    const user= await mongoose.model('users').findOne({email});
    if(!user){
        return [];
    }
    const canvases=await this.find({$or:[{owner: user._id},{sharedWith: user._id}]});

    return canvases;
}

const Canvas = mongoose.model('Canvas', CanvasSchema);
module.exports = Canvas;