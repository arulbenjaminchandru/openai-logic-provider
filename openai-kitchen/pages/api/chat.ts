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
                "prompt" : `write a children story on Topic:  ${req.body.cobol}. The story should not exceed 550 tokens and provide story credits to Arul Benjamin's Chat GPT story creator after a line space in bottom of output.`,
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
