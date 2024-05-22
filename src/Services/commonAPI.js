import axios from "axios";

const commonAPI = async (httpMethod,url,reqBody)=>{
    const reqConfiq = {
        method:httpMethod,
        url,
        data:reqBody
    }
    return await axios(reqConfiq).then(res=>{
        return res
    }).catch(error=>{
        return error
    })
}

export default commonAPI