const { default: mongoose } = require("mongoose");



const JobSchema = new mongoose.Schema({
    companyName: String,
    title: String,
    location: String,
    type: String,
    experience: String,
    description: String,
    skills: String,
    recruiterId: String,
    applicants: [
        {
            name: String,
            email: String,
            userId: String,
            status: String
        }
    ]
})

const Job = mongoose.models.Jobs || mongoose.model("Jobs",JobSchema)

export default Job