import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        //not _id as this in not mongodb but the token creation during login ... as id = User._id in login 
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}