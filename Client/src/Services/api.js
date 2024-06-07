import axios from "axios";

export const gettodo=async()=>{
    try {
        const response=await axios.get("http://localhost:3000/gettodo")
        return response.data
        
    } catch (error) {
        console.log("Error in calling api of gettodo",error.message);
    }
}

export const inserttodo=async(text)=>{
    try {
        const response=await axios.post("http://localhost:3000/addtodo",{
            text
        });
        alert("todo inserted")
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("Error while insert api called",error.message);
    }
}

export const deletetodo=async(id)=>{
    try {
        const response=await axios.post("http://localhost:3000/deletetodo",{
            id
        });
        return response.data.message
    } catch (error) {
        console.log("Error while calling deltetodo api");
        throw error;
    }

}

export const checktodo=async(id,state)=>{
    try {
        const response=await axios.post("http://localhost:3000/updatecheck",{
            id,
            state
        });
        return response.data;
    } catch (error) {
        console.log("Error while calling checktodo api");
        throw error
    }
}

export const updatetodo=async(id,text)=>{
        try {
            const response=await axios.put("http://localhost:3000/updatetodo",{
                id,
                text
            });
            return response.data
        } catch (error) {
            console.error("Error while calling update todo api");
            throw Error;
        }
}
