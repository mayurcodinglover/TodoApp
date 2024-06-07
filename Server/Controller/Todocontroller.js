import Todo from "../Model/todo.js";

export const addtodo=async(req,res)=>{
    const {text}=req.body;
    if(!text)
        {
            res.status(400);
            throw new Error('please add a text field');
        }
        const todo=await Todo.create({
            text,
            user:req.user.id,
        });
        res.status(201).json(todo);
}


export const gettodo=async(req,res)=>{
    try {
        const todos=await Todo.find({user:req.user.id});
        res.status(200).json(todos);   
    } catch (error) {
        res.send(500).json({message:"Server Error"});
    }

}

export const deletetodo=async(req,res)=>{
    try {
        const todo=await Todo.find({_id:req.body.id});
        if(todo.length===0){
            res.status(404).json({message:"todo not available"});
        }
        else{
            await Todo.deleteOne({_id:req.body.id})
        return res.status(200).json({message:"todo deleted successfully",todo:todo});
        }
    } catch (error) {
        res.status(500).json({messge:"Error while deleting todo"})
    }

}

export const updatecheck=async(req,res)=>{
    try {
        const {id,state}=req.body;
        const todo=await Todo.findByIdAndUpdate(id,{checked:state});
        if(!todo){
            return res.status(404).json({message:"Todo not found"});
        }
        else{
            return res.status(200).json({message:"todo check updated"});
        }
    } catch (error) {
        return res.status(500).json({message:"error in update check"})
    }

}

export const updatetodo=async(req,res)=>{
    try {
        const {id,text}=req.body;
        const todo=await Todo.findByIdAndUpdate(id,{text:text});
        if(!todo)
            {
                return res.status(404).json({message:"Todo not found "});
            }
            else{
                return res.status(200).json({message:"todo updated successfully",todo})
            }
    } catch (error) {
        console.log("Error in updatetodo");
        return res.status(500).json({message:"error in updating todo"})
    }

}