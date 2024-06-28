'use client'

import { useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import JobApplicants from "../job-applicants"



export default function RecruiterJobCard({ jobItem,jobApplications }) {
    const [showApplicantsDrawer,setShowApplicantsDrawer]=useState(false)
    const [currentCandidateDetails,setCurrentCandidateDetails] = useState(null);
    const [showCurrentCandidateDetailsModal,setShowCurrentCandidateDetailsModal] = useState(false)
    return (
        <div>
            <CommonCard
                icon={<JobIcon />}
                title={jobItem?.title}
                // description={}
                footerContent={
                    <Button onClick={()=>setShowApplicantsDrawer(true)} 
                    className="dark:bg-[#fffa27] flex h-11 items-center justify-center px-5">
                        {
                            jobApplications.filter(item=>item?.jobID === jobItem?._id).length
                        } Candidates
                    </Button>
                }
            />
            <JobApplicants 
                showApplicantsDrawer={showApplicantsDrawer}
                setShowApplicantsDrawer={setShowApplicantsDrawer}
                showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
                currentCandidateDetails={currentCandidateDetails}
                setCurrentCandidateDetails={setCurrentCandidateDetails}
                jobItem={jobItem}
                jobApplications={jobApplications.filter(job=>job?.jobID === jobItem?._id)}
            />
        </div>
    )
}