import { NextApiRequest, NextApiResponse } from "next";
type Data = {
    message : String,
    aiResp? : any
}
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse<Data>) {
        if(req.method !== "POST"){
            return res.status(405).send({message : "Only POST request are allowed"})
        }

        const headers = {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${process.env.GET_API_KEY}`
        }

        const response = await fetch("https://api.openai.com/v1/completions",{
            method : "POST",
            headers,
            body : JSON.stringify({
                "model" : "text-davinci-003",
                "prompt" : `Act like a a person who knows everything about IBM Mainframe COBOL programming. Provide me step by step instructions to help me for writing a logic to ${req.body.cobol}. If that is not achievable, then tell me that this cannot be achievable and dont provide any further instructions`,
                "temperature" : 0.5,
                "max_tokens" : 550
            })
        })
        const aiResp = await response.json()
        res.json({
            message : "Success",
            aiResp
        })
    
}
