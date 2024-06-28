import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/on-board";
import {currentUser  } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export default async function OnBoardPage() {
    
    const user = await currentUser();
    
    const profileInfo = await fetchProfileAction(user?.id)
    
    if(profileInfo?._id){
        redirect("/")
    }
    else return <OnBoard />
}