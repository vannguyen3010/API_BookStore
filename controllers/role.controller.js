import Role from "../models/Role.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
export const createRole = async (req, res, next) =>{
    try {
        if(req.body.role && req.body.role !== ''){
            const newRole = new Role(req.body);
            await newRole.save();
            return next(CreateSuccess(200, "Role created!!"));
        }else{
            return next(CreateError(400, "Bad request!!"));
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
};

export const updateRole = async (req, res, next)=> {
    try {
        const role = await Role.findById({_id: req.params.id});
        if(role){
            const newData =await Role.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new: true}
            );
            // return res.status(200).send("Role Updated!");
            return next(CreateSuccess(200, "Role Updated!"));
        }else{
            // return res.status(404).send("Role not found");
            return next(CreateError(404, "Role not found!!"));
        }
    } catch (error) {
        // return res.status(500).send("Internal Server Error!")
        return next(CreateError(500, "Internal Server Error!"));
    }
}

export const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        // return res.status(200).send(roles);
        return next(CreateSuccess(200, roles));
    } catch (error) {
        // return res.status(500).send("Internal Server Error!")
        return next(CreateError(500, "Internal Server Error!"));
    }
}
export const deleteRole = async (req, res, next)=>{
    try {
        const roleId = req.params.id;
        const role = await Role.findById({_id: roleId});
        if(role){
            await Role.findByIdAndDelete(roleId);
            // return res.status(200).send("Role deleted!");
            return next(CreateSuccess(200, "Role deleted!"));
        }else{
            // return res.status(404).send("Role not found!");
            return next(CreateError(404, "Role not found!"));
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error!");
    }
}