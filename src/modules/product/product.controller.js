import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";
import productModel from "../../../DB/models/product.model.js";
import cloudinary from "../../utils/cloudinary.js";


export const create = async (req,res)=>{
    
    const {name,categoryId} = req.body; 

    //return res.json(req.files);
    const checkCategory = await categoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"category not found"});
    }

    req.body.slug=slugify(name);



    const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path
        ,{folder:`${process.env.APP_NAME}/products/${name}`}
    );

    req.body.subImages = [];
    if(req.files.subImages){
        for(const file of req.files.subImages){
            const {secure_url,public_id} = await cloudinary.uploader.upload(file.path
                ,{folder:`${process.env.APP_NAME}/products/${name}/subImages`}
            );
            req.body.subImages.push({secure_url, public_id});
        }
    }

    //return res.json(req.body.subImages);

    req.body.mainImage = {secure_url, public_id};
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;

    const product = await productModel.create(req.body);
    return res.status(201).json({message:"success",product});
}

export const get = async (req,res)=>{

    const products = await productModel.find({}).select('name mainImage price discount');
    return res.status(200).json({message:"success",products});
}

export const getActive = async (req,res)=>{

    const products = await productModel.find({status:'active'}).select('name mainImage price discount');
    return res.status(200).json({message:"success",products});
}

export const getDetails = async (req,res)=>{

    const {id} = req.params;

    const product = await productModel.findById(id).select('-discount');
    return res.status(200).json({message:"success",product});
}

export const remove = async (req,res)=>{

    const {id} = req.params;
    const product = await productModel.findByIdAndDelete(id);

    if(!product){
        return res.status(404).json({message:"not found"});
    }

    await cloudinary.uploader.destroy(product.mainImage.public_id);
    return res.status(200).json({message:"success"});
}