import { Schema , model} from 'mongoose'



const requestSchema = new Schema({

    sender: {
        type: Schema.Types.ObjectId,
        requried: true,

    },
    reciever: {
        type: Schema.Types.ObjectId,
        requried: true,
    },
    status: {
        type: String,
        requried: true,
        enum: {
            values: [ "ignore", "intrested", "accepted", "rejected"],
            message: `{VLAUE} is incorrect status type`
        }
    }
},
  { timestamps: true }
);


export const RequestModel = model("Request", requestSchema);