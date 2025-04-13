//import { Object, String } from "joi";
import { Schema , model , mongoose, Types} from "mongoose";

const orderSchema = new Schema (
    {
        userId:{
            type: Types.ObjectId,
            required:true,
            ref:'User',
        },
        products:[
            {
                productName:{
                    type:String,
                    required:true,
                },
                productId:{
                    type: Types.ObjectId,
                    required:true,
                    ref:'Product',
                },
                quantity:{
                    type:Number,
                    default:1,
                    required:true,
                },
                unitPrice:{
                    type:Number,
                    required:true,
                },
                finalPrice:{
                    type:Number,
                    required:true,
                },
        }],
        couponName:{
            type:String,
        },
        finalPrice:{
            type:Number,
            required:true,
        },
        paymentType:{
            type:String,
            default:'cash',
            enum:['cash','card'],
        },
        phoneNumber:{
            type:Number,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            default:'pending',
            enum:['pending','cancelled','confirmed','onWay','deliverd'],
        },
        note:String,
        reasonRejected:String,
        updatedBy: {
            type: Types.ObjectId,
            ref: 'User',
        },
     
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.model.Order || model('Order',orderSchema);
export default orderModel; 