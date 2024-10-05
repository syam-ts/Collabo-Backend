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
            values: [ "ignored", "intrested", "accepted", "rejected"],
            message: `{VLAUE} is incorrect status type`
        }
    }
},
  { timestamps: true }
);

requestSchema.index({sender: 1});


 const RequestModel = model("Request", requestSchema);

 export default RequestModel;