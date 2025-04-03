//import { Object, String } from "joi";
import { Schema , model , mongoose, Types} from "mongoose";

const categorySchema = new Schema (
    {
        name:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            min: 3,
            max: 50,
        },
        slug: {
            type:String,
            required:true,
        },
        status: {
            type: String,
            default: 'active',
            enum: ['active','not_active'],
        },
        image: {
            type: Object,
        },      
        createdBy: {
            type: Types.ObjectId,
            ref:'User',
        },
        updatedBy: {
            type: Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const categoryModel = mongoose.model.Category || model('Category',categorySchema);
export default categoryModel; 