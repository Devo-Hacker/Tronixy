import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
    try{
        const { category } =req.body;
        //validation creating
        if(!category){
            return res.status(404).send({
                success:false,
                message: "please provide category details",
            })
        }
        await categoryModel.create({ category });
        res.status(201).send({
            success:true,
            message:`${category} category created successfully`,
        })
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            messgage: "Error in creating category API"
        });
    }
};