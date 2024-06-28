'use client'

import { useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { createJobApplicationAction } from "@/actions"




export default function CandidateJobCard({ jobItem, jobApplications, profileInfo }) {
    const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false)


    async function handleJobApply() {
        await createJobApplicationAction({
            recruiterUserID: jobItem?.recruiterId,
            name: profileInfo?.candidateInfo?.name,
            email: profileInfo?.email,
            candidateUserID: profileInfo?.userId,
            status: ['Applied'],
            jobID: jobItem?._id,
            jobAppliedDate: new Date().toLocaleDateString(),
        }, "/jobs");
        setShowJobDetailsDrawer(false)
    }
    return (
        <div>
            <Drawer
                open={showJobDetailsDrawer}
                onOpenChange={setShowJobDetailsDrawer}
            >
                <CommonCard
                    icon={<JobIcon />}
                    title={jobItem?.title}
                    description={jobItem?.companyName}
                    footerContent={
                        <DrawerTrigger>
                            <Button className=" flex h-11 items-center justify-center px-5">
                                View Details
                            </Button>

                        </DrawerTrigger>
                    }
                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between">
                            <DrawerTitle className="text-4xl font-extrabold text-gray-800">{jobItem?.title}</DrawerTitle>
                            <div className="flex gap-3 ">
                                <Button
                                    disabled={
                                         jobApplications.findIndex(item => item.jobID === jobItem?._id) > -1 ? true : false
                                    }
                                    onClick={() => handleJobApply()} className=" disabled:opacity-65 flex h-11 items-center justify-center px-5">
                                    Apply
                                </Button>
                                <Button className="flex h-11 items-center justify-center px-5" onClick={() => setShowJobDetailsDrawer(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl font-medium text-gray-600">
                        {jobItem?.description}
                        <span className="text-xl ml-4 font-normal text-gray-500">
                            {jobItem?.location}
                        </span>
                        <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px]">
                            <h2 className="text-xl font-bold text-white">{jobItem?.type}</h2>
                        </div>
                        <span className="text-2xl font-medium mt-3 text-black">Experience: {jobItem?.experience}</span>
                        <div className="flex gap-4 mt-6">
                            {
                                jobItem?.skills.split(",").map(skill => {
                                    return <div className="w-[100px] flex bg-black justify-center items-center h-[35px] rounded-[4px]">
                                        <h2 className="text-[13px] font-medium text-white">
                                            {skill}
                                        </h2>
                                    </div>
                                })
                            }
                        </div>
                    </DrawerDescription>
                </DrawerContent>

            </Drawer>
        </div>
    )
}