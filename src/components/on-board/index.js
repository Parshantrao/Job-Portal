'use client';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfile, fetchProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient('https://winmfsivwupwseahyhul.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpbm1mc2l2d3Vwd3NlYWh5aHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1MjgsImV4cCI6MjAzNDk3NDUyOH0.y_m3fdsxamdyqkjAl-KQNgLyDGAxneiqDRbTMPppTYk')

export default function OnBoard() {

    const [currentTab, setCurrentTab] = useState("candidate");
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData)
    const [file,setFile] = useState(null)

    function handleTabChange(tab) {
        setCurrentTab(tab)
    }

    function handleRecruiterFormValid() {
        return recruiterFormData && recruiterFormData.name.trim() !== "" && recruiterFormData.companyName.trim() !== "" && recruiterFormData.companyRole.trim() !== ""
    }
    function handleCandidateFormValid() {
        return Object.keys(candidateFormData).every(key=>candidateFormData[key].trim() !== "")
    }

    const currentAuthUser = useUser()
    const { user } = currentAuthUser;

    function handleFileChange(event){
        event.preventDefault()  
        setFile(event.target.files[0])
    }

    async function handleUploadPdfToSupabase(){
        const {data,error}=await supabaseClient.storage.from('job-portal-public').upload(`/public/${file.name}`,file,{cacheControl:"3600",upsert:false})
        if(data){
            setCandidateFormData({
                ...candidateFormData,
                resume:data.path
            })
        }
    }
    useEffect(()=>{
        if(file) handleUploadPdfToSupabase()
    },[file])

    async function createProfileAction(event) {
        // event.preventDefault();
        try {
            const data = currentTab === 'candidate'?{
                candidateInfo : {...candidateFormData},
                role : 'candidate',
                userId: user.id,
                email: user.primaryEmailAddress.emailAddress
            } 
            : {
                recruiterInfo: recruiterFormData,
                role: 'recruiter',
                userId: user.id,
                email: user.primaryEmailAddress.emailAddress
            }
            currentTab === 'candidate' && handleUploadPdfToSupabase()
            await createProfile(data, "/onboard").then((result => console.log(result)))
        }
        catch (err) {
            console.error("Error:", err);
        }
    }

    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome to onboarding</h1>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value='candidate'>
                    <CommonForm
                        formControls={candidateOnboardFormControls}
                        buttonText={"Onboard as candidate"}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                        isBtnDisabled={handleCandidateFormValid}
                        action={createProfileAction}
                        handleFileChange={handleFileChange}
                    />
                </TabsContent>
                <TabsContent value='recruiter'>
                    <CommonForm
                        formControls={recruiterOnboardFormControls}
                        buttonText={"Onboard as recruiter"}
                        formData={recruiterFormData}
                        setFormData={setRecruiterFormData}
                        isBtnDisabled={handleRecruiterFormValid}
                        action={createProfileAction}
                    />
                </TabsContent>

            </Tabs>
        </div>
    )
}