const mongoose = require("mongoose");
const Employee = require("./models/employee.model");
require("dotenv").config();

const seedEmployees = [
  {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Software Engineer",
    assessment_submitted: true,
    tags: ["AI Enthusiast", "Active Learner", "Career-focused"],
    submission_date: new Date("2025-08-05"),
    learning_score: 9,
    assessment_answers: {
      q1: "I love AI because it can revolutionize HR tech.",
      q2: "I have experience in React and Node.",
      q3: "I enjoy problem-solving and coding.",
      q4: "Team collaboration is key.",
      q5: "I want to grow my skills.",
      q6: "I am excited about machine learning.",
      q7: "AI products are the future.",
      q8: "I value a healthy work culture.",
      q9: "Continuous learning is important.",
      q10: "I am proactive and curious.",
      q11: "I contribute to open-source projects.",
      q12: "I like to experiment with new tech.",
      q13: "I am passionate about HR automation.",
      q14: "My goal is to become a lead developer.",
      q15: "I love coding challenges.",
      q16: "I recently learned Kubernetes.",
      q17: "I study AI trends regularly.",
      q18: "I prefer collaborative teams.",
      q19: "Work-life balance matters to me.",
      q20: "I aspire to build impactful products.",
    },
  },
  {
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "Backend Developer",
    assessment_submitted: true,
    tags: ["HR-Tech Passionate", "Passive Learner", "Entrepreneurial"],
    submission_date: new Date("2025-07-20"),
    learning_score: 5,
    assessment_answers: {
      q1: "Interested in building AI tools to ease HR processes.",
      q2: "Experienced with Node.js and Python.",
      q3: "Love solving backend challenges.",
      q4: "Enjoy working independently.",
      q5: "Aim to start my own company.",
      q6: "Eager to learn new programming languages.",
      q7: "Believe AI will transform HR.",
      q8: "Prefer salary-driven culture.",
      q9: "Learning is slow but steady.",
      q10: "Sometimes hesitant but motivated.",
      q11: "Contribute to small projects.",
      q12: "Experiment occasionally with new tools.",
      q13: "Passionate about automating recruitment.",
      q14: "Plan to be an entrepreneur.",
      q15: "Enjoy debugging tough issues.",
      q16: "Learned basics of Docker recently.",
      q17: "Keep updated with industry news.",
      q18: "Value clear work guidelines.",
      q19: "Prefer high salary offers.",
      q20: "Want to build scalable products.",
    },
  },
  {
    name: "Anjali Verma",
    email: "anjali@example.com",
    role: "Product Manager",
    assessment_submitted: false,
    tags: ["Looking to explore", "Career-focused", "Active Learner"],
    submission_date: null,
    learning_score: 0,
    assessment_answers: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: "",
      q11: "",
      q12: "",
      q13: "",
      q14: "",
      q15: "",
      q16: "",
      q17: "",
      q18: "",
      q19: "",
      q20: "",
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Employee.deleteMany({});
    await Employee.insertMany(seedEmployees);
    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
