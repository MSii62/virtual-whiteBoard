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
CanvasSchema.statics.createCanvasForUser = async function (email, name) {

    const user = await mongoose.model('users').findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const canvas = new this({
        owner: user._id,
        name: name,
        elements: [],
        sharedWith: [],
    });

    const newCanvas = await canvas.save();

    return newCanvas;
};
CanvasSchema.statics.getAllCanvases=async function(email){
    const user= await mongoose.model('users').findOne({email});
    if(!user){
        return [];
    }
    const canvases=await this.find({$or:[{owner: user._id},{sharedWith: user._id}]});

    return canvases;
}
CanvasSchema.statics.loadCanvas=async function(email,canvasId){
    const user=await mongoose.model('users').findOne({email});
    if(!user){
        throw new Error('user not found'); 
    }
    try{
        const canvas=await this.findOne({_id:canvasId, $or:[{owner:user._id},{sharedWith:user._id}]});
        if(!canvas){
            throw new Error('canvas not found');
        }
        return canvas;
    } catch (error) {
        throw Error('error getting canvas');
    }
}

const Canvas = mongoose.model('Canvas', CanvasSchema);
module.exports = Canvas;
