import connectDb from "@/lib/db";
import User from "@/model/User.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(request:NextRequest) => {
    try {
        const {name,email,password} = await request.json()
        await connectDb()

        const existUser = await User.findOne({email})
        if(existUser){
            return NextResponse.json(
                {message:"User already exist!"},
                {status:400}
            )
        }

        if(password.length<4){
              return NextResponse.json(
                {message:"Password must be at least 4 characters!"},
                {status:400}
            )
        }

       const hashedPassword = await bcrypt.hash(password,10)
       const user = await User.create({
        name,email,password:hashedPassword
       })

           return NextResponse.json(
                user,
                {status:201}
            )

    } catch (error) {
            return NextResponse.json(
                {message:`register error ${error}`},
                {status:500}
            )
    }
}

