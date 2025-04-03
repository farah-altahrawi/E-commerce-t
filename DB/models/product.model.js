//import { Object, String } from "joi";
import { Schema , model , mongoose, Types} from "mongoose";

const productSchema = new Schema (
    {
        name:{
            type:String,
            required:true,
            unique:true,
            min: 3,
            max: 50,
        },
        description:{
            type:String,
            required:true,
        },
        stock:{
            type:Number,
            default:1,
        },
        price:{
            type:Number,
            required:true,
        },
        discount:{
            type:Number,
            default:0,  
        },
        slug: {
            type:String,
            required:true,
        },
        mainImage: {
            type: Object,
            required:true,
        },
        subImages: [
            {
                type: Object,
            },
        ],
        status: {
            type: String,
            default: 'active',
            enum: ['active','not_active'],
        },
      
        createdBy: {
            type: Types.ObjectId,
            ref:'User',
        },
        updatedBy: {
            type: Types.ObjectId,
            ref: 'User',
        },
        colors:[String],
        sizes:[
            {
                type:String,
                enum:['small','medium','large','xlarge'],

            }
        ],
        categoryId:{
            type: Types.ObjectId,
            ref: 'Category',
        }
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model.Product || model('Product',productSchema);
export default productModel; 