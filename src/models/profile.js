const { default: mongoose } = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    userId: String,
    role: String,
    email: String,
    recruiterInfo: {
        name: String,
        companyName: String,
        companyRole: String
    },
    candidateInfo: {
        name: String,
        currentJobLocation: String,
        preferefJobLocation: String,
        currentSalary: String,
        noticePeriod: String,
        skills: String,
        currentCompany: String,
        previouseCompanies: String,
        totalExperience: String,
        college: String,
        collegeLocation: String,
        graduatedYear: String,
        linkedinProfile: String,
        githubProfile: String,
        resume: String
    }
})


const Profile = mongoose.models.Profiles || mongoose.model("Profiles", ProfileSchema)

export default Profile