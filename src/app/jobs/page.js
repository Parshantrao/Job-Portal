import { fetchJobApplicationsForCandidate,createFilterCategoryAction, fetchJobApplicationsForRecruiter, fetchJobsForCandidateAction, fetchJobsForRecruiterAction, fetchProfileAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";



export default async function JobsPage({searchParams }) {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    const getJobApplicationList = profileInfo?.role === "candidate"
        ? await fetchJobApplicationsForCandidate(user?.id)
        : await fetchJobApplicationsForRecruiter(user?.id)

    const jobList = profileInfo?.role === "candidate"
        ? await fetchJobsForCandidateAction(searchParams)
        : await fetchJobsForRecruiterAction(user?.id)

    const fetchFilterCategories = await createFilterCategoryAction()

    return (
        <JobListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
            jobApplications={getJobApplicationList}
            filterCategories={fetchFilterCategories}
        />
    )
}