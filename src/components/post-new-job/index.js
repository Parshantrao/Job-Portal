'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobsFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";


export default function PostNewJob({user, profileInfo }) {
    const [showJobDialog, setShowJobDialog] = useState(false)
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recruiterInfo?.companyName
    })
    
    function handlePostNewBtnValid() {
        return Object.keys(jobFormData).every((control) => jobFormData[control].trim() !== "")
    }

    async function createNewJob(){
        await postNewJobAction({
            ...jobFormData,
            recruiterId:profileInfo?.userId
        },"/jobs")

    }

    return <div>
        <Button onClick={() => {
            setShowJobDialog(true)
        }} className="disabled:opacity-60 flex h-11 items-center justify-center px-5">
            Post A Job
        </Button>
        <Dialog open={showJobDialog} onOpenChange={() => {
            setJobFormData({
                ...initialPostNewJobFormData,
                companyName: profileInfo?.recruiterInfo?.companyName
            })
            setShowJobDialog(false)
        }}>
            <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        Post New Job
                    </DialogTitle>
                    <div className="grid gap-4 py-4">
                        <CommonForm
                            buttonText={"Add"}
                            formData={jobFormData}
                            formControls={postNewJobsFormControls}
                            setFormData={setJobFormData}
                            isBtnDisabled={handlePostNewBtnValid}
                            action={createNewJob}
                        />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
}