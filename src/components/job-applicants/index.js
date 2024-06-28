'use client'

import CandidateList from "../candidate-list"
import { Drawer, DrawerContent } from "../ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function JobApplicants({showApplicantsDrawer,setShowApplicantsDrawer,showCurrentCandidateDetailsModal,setShowCurrentCandidateDetailsModal,currentCandidateDetails,setCurrentCandidateDetails,jobItem,jobApplications}){

return (
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
        <DrawerContent className="max-h-[50vh]">
            <ScrollArea className="h-auto overflow-y-auto">
                <CandidateList 
                    currentCandidateDetails={currentCandidateDetails}
                    setCurrentCandidateDetails={setCurrentCandidateDetails}
                    jobApplications={jobApplications}
                    setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
                    showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                />
            </ScrollArea>
        </DrawerContent>

    </Drawer>
)
}