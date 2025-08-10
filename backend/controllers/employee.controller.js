const Employee = require("../models/employee.model");

// Add employee
exports.addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ message: "Employee added", employee });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error: error.message });
  }
};

// Get all employees with optional filters, search, sort
exports.getEmployees = async (req, res) => {
  try {
    const {
      submission_status,
      role,
      interest_area,
      long_term_goal,
      work_culture,
      learning_attitude,
      search,
      sort_by,
      sort_order = "asc",
    } = req.query;

    let filter = {};

    if (submission_status === "submitted") filter.assessment_submitted = true;
    else if (submission_status === "not_submitted") filter.assessment_submitted = false;

    // Filter by role
    if (role) filter.role = role;

    // Filter by tags
    if (interest_area) filter.tags = { $in: [interest_area] };
    if (long_term_goal) filter.tags = { $in: [long_term_goal] };
    if (work_culture) filter.tags = { $in: [work_culture] };
    if (learning_attitude) filter.tags = { $in: [learning_attitude] };

    // Search by name/email/keywords (assessment answers)
    if (search) {
      const regex = new RegExp(search, "i"); // case-insensitive
      filter.$or = [
        { name: regex },
        { email: regex },
        { "assessment_answers.q1": regex },
        { "assessment_answers.q2": regex },
        { "assessment_answers.q3": regex },
        { "assessment_answers.q4": regex },
        { "assessment_answers.q5": regex },
        { "assessment_answers.q6": regex },
        { "assessment_answers.q7": regex },
        { "assessment_answers.q8": regex },
        { "assessment_answers.q9": regex },
        { "assessment_answers.q10": regex },
        { "assessment_answers.q11": regex },
        { "assessment_answers.q12": regex },
        { "assessment_answers.q13": regex },
        { "assessment_answers.q14": regex },
        { "assessment_answers.q15": regex },
        { "assessment_answers.q16": regex },
        { "assessment_answers.q17": regex },
        { "assessment_answers.q18": regex },
        { "assessment_answers.q19": regex },
        { "assessment_answers.q20": regex },
      ];
    }

    // Sorting
    let sort = {};
    if (sort_by === "name") sort.name = sort_order === "asc" ? 1 : -1;
    else if (sort_by === "submission_date") sort.submission_date = sort_order === "asc" ? 1 : -1;
    else if (sort_by === "learning_score") sort.learning_score = sort_order === "asc" ? 1 : -1;

    const employees = await Employee.find(filter).sort(sort);

    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};

// Get employee details by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error: error.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};
