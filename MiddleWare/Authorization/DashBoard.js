/********************************************************************************** */ // Models
const { Employee } = require("../../Models/Employee"); // افترض أن نموذج Employee موجود في المسار المحدد
const { User } = require("../../Models/User");
// ملف admin.js
/********************************************************************************** */
/********************************************************************************** */
exports.App_Owner = async (req, res, next) => {
  try {
    // 1. الحصول على معلومات المستخدم من الرمز المميز (تم فك تشفيره بواسطة auth middleware)
    const user = await User.findById(req.user._id); // افترض أن _id هو حقل المعرف في نموذج المستخدم

    const OwnerEmail = "obadah@gmail.com";
    const OwnerPhoneNumber = 995993875;
    const OwnerPAssWord =
      "$2b$10$J00AqoW8mGgB3nv1SUlOYuEoHW8JnJqIyY2lFUYqRU7xdRtRG8Auu";
    // 3. التحقق مما إذا كان الموظف موجودًا وله صلاحية الأدمن
    if (
      user.Email != OwnerEmail ||
      user.PhoneNumber != OwnerPhoneNumber ||
      user.Password != OwnerPAssWord
    ) {
      return res.status(403).send(" You Are Not Owner ");
    }

    // 4. إذا كان الموظف أدمن، استمر في معالجة الطلب
    next();
  } catch (error) {
    console.error("Error checking admin access:", error);
    return res.status(500).send("Internal Server Error");
  }
};
