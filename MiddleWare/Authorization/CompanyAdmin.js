/********************************************************************************** */ // Models
const { Employee } = require("../../Models/Employee"); // افترض أن نموذج Employee موجود في المسار المحدد

// ملف admin.js
/********************************************************************************** */
exports.CompanyAdmin = async (req, res, next) => {
  try {
    // 1. الحصول على معلومات المستخدم من الرمز المميز (تم فك تشفيره بواسطة auth middleware)
    const userId = req.user._id; // افترض أن _id هو حقل المعرف في نموذج المستخدم

    // 2. البحث عن الموظف المرتبط بالمستخدم
    const employee = await Employee.findOne({ User_id: userId });

    // 3. التحقق مما إذا كان الموظف موجودًا وله صلاحية الأدمن
    if (!employee) {
      return res.status(403).send("Employee Is Not Found !");
    }

    if (!employee.IsAdmin && !employee.IsBoss) {
      return res.status(403).send("Access denied. Admin access required.");
    }

    // 4. إذا كان الموظف أدمن، استمر في معالجة الطلب
    next();
  } catch (error) {
    console.error("Error checking admin access:", error);
    return res.status(500).send("Internal Server Error");
  }
};
/********************************************************************************** */
exports.CompanyBoss = async (req, res, next) => {
  try {
    // 1. الحصول على معلومات المستخدم من الرمز المميز (تم فك تشفيره بواسطة auth middleware)
    const userId = req.user._id; // افترض أن _id هو حقل المعرف في نموذج المستخدم

    // 2. البحث عن الموظف المرتبط بالمستخدم
    const employee = await Employee.findOne({ User_id: userId });

    // 3. التحقق مما إذا كان الموظف موجودًا وله صلاحية الأدمن
    if (!employee.IsBoss) {
      return res.status(403).send("Access denied. Admin access required.");
    }

    // 4. إذا كان الموظف أدمن، استمر في معالجة الطلب
    next();
  } catch (error) {
    console.error("Error checking admin access:", error);
    return res.status(500).send("Internal Server Error");
  }
};

/********************************************************************************** */
// module.exports = async (req, res, next) => {
//   try {
//     // 1. الحصول على معلومات المستخدم من الرمز المميز (تم فك تشفيره بواسطة auth middleware)
//     // const userId = req.user._id; // افترض أن _id هو حقل المعرف في نموذج المستخدم

//     // 2. البحث عن الموظف المرتبط بالمستخدم
//     const admins = await Employee.find({ IsAdmin: true });

//     // 3. التحقق مما إذا كان الموظف موجودًا وله صلاحية الأدمن
//     if (!employee || !employee.IsAdmin) {
//       return res.status(403).send("Access denied. Admin access required.");
//     }

//     // 4. إذا كان الموظف أدمن، استمر في معالجة الطلب
//     next();
//   } catch (error) {
//     console.error("Error checking admin access:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };
