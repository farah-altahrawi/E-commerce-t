import slugify from'slugify';
import categoryModel from '../../../DB/models/category.model.js';

export const create = async (req,res)=>{

    const {name} = req.body;
    const slug = slugify(name);
    const userId = req.id;

    const category = await categoryModel.create({name,slug,createBy:userId,updatedBy:userId})

    return res.status(201).json({message:"success",category});
}

export const get = async (req,res)=>{

    const categories = await categoryModel.find({});


    return res.status(200).json({message:"success",categories});
}

export const getActive = async (req,res)=>{

    const categories = await categoryModel.find({status:'active'});


    return res.status(200).json({message:"success",categories});
}

export const details = async (req,res)=>{

    const {id} = req.params;
    const category = await categoryModel.findById(id);

    if(!category){
        return res.status(404).json({message:"category not found"});
    }

    return res.status(200).json({message:"success",category});
    
}

export const update = async (req,res)=>{

    const {id} = req.params;
    const {name} = req.body;
    const userId = req.id;

    const category = await categoryModel.findById(id);

    if(!category){
        return res.status(404).json({message:"category not found"});
    }

    category.name = name;
    category.updatedBy = userId;
    category.slug = slugify(name);
    category.status = req.body.status;
    await category.save();

    return res.status(200).json({message:"success"});
}

export const remove = async (req,res)=>{

    const {id} = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    if(!category){
        return res.status(404).json({message:"category not found"});
    }

    return res.status(200).json({message:"success"});
}

