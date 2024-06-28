'use server';

import { connectionToDB } from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";


export async function createProfile(formData, pathToRevalidate) {
    await connectionToDB();
    try {
        let data = await Profile.create(formData)
        revalidatePath(pathToRevalidate)
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function fetchProfileAction(id) {
    await connectionToDB()
    try {
        let result = await Profile.findOne({ userId: id })

        return JSON.parse(JSON.stringify(result))
    }
    catch (err) {
        console.log(err)
        // throw new Error(err)
    }
}

export async function fetchRecruiterProfiles() {
    await connectionToDB();
    try {
        const recruiterData = await Profile.find().exists("recruiterInfo")
        return {
            success: true,
            data: recruiterData
        }
    }
    catch (err) {
        console.log(err)
        // throw new Error(err)
    }
}

export async function postNewJobAction(formData, pathToRevalidate) {
    try {

        await connectionToDB();
        await Job.create(formData);
        revalidatePath(pathToRevalidate)
    }
    catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function fetchJobsForRecruiterAction(id) {
    try {
        await connectionToDB();

        const jobs = await Job.find({ recruiterId: id })

        return JSON.parse(JSON.stringify(jobs))
    }
    catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function fetchJobsForCandidatesAction() {
    try {
        await connectionToDB();

        const jobs = await Job.find({})

        return JSON.parse(JSON.stringify(jobs))
    }
    catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function createJobApplicationAction(data, pathToRevalidate) {
    try {
        await connectionToDB();

        await Application.create(data)
        revalidatePath(pathToRevalidate)
    }
    catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function fetchJobApplicationsForCandidate(id) {
    try {
        await connectionToDB();
        const result = await Application.find({ candidateUserID: id })
        if (result) {
            return JSON.parse(JSON.stringify(result))
        }
    }
    catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function fetchJobApplicationsForRecruiter(id) {
    try {
        await connectionToDB();
        const result = await Application.find({ recruiterUserID: id })
        if (result) {
            return JSON.parse(JSON.stringify(result))
        }
    }
    catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

//get candidate detAils by candidate ID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
    await connectionToDB();
    const result = await Profile.findOne({ userId: currentCandidateID });

    return JSON.parse(JSON.stringify(result));
}

export async function updateJobApplicationAction(data, pathToRevalidate) {
    await connectionToDB();
    const {
        recruiterUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        _id,
        jobAppliedDate,
    } = data;
    await Application.findOneAndUpdate(
        {
            _id: _id,
        },
        {
            recruiterUserID,
            name,
            email,
            candidateUserID,
            status,
            jobID,
            jobAppliedDate,
        },
        { new: true }
    );
    revalidatePath(pathToRevalidate);
}

export async function fetchJobsForCandidateAction(filterParams = {}) {
    await connectionToDB();
    let updatedParams = {};
    Object.keys(filterParams).forEach((filterKey) => {
        updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
    });
    const result = await Job.find(
        filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
    );

    return JSON.parse(JSON.stringify(result));
}

//create filter categories
export async function createFilterCategoryAction() {
    await connectionToDB();
    const result = await Job.find({});

    return JSON.parse(JSON.stringify(result));
}

//update profile action
export async function updateProfileAction(data, pathToRevalidate) {
    await connectToDB();
    const {
      userId,
      role,
      email,
      recruiterInfo,
      candidateInfo,
      _id,
    } = data;
  
    await Profile.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        userId,
        role,
        email,
        recruiterInfo,
        candidateInfo,
      },
      { new: true }
    );
  
    revalidatePath(pathToRevalidate);
  }
  