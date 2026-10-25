/* بيانات التواصل — مصدر واحد للموقع كله.
   أي channel رابطه فاضي ("") بيختفي من السكشن لوحده.
   الترتيب هنا هو ترتيب القايمة: أول اتنين بيبانوا على طول، والباقي بيظهر بالسكرول. */

/* رقم الواتساب بصيغة دولية من غير + ولا صفر في الأول. مثال: 201012345678 */
const WHATSAPP = "201276539981";

export const CONTACT = {
  email: "helalykhaled3@gmail.com",
  /* لينك الفورم من Formspree، شكله: https://formspree.io/f/xxxxxxx
     من غيره الفورم مش هتبعت إيميل لوحدها */
  formEndpoint: "",
  channels: [
    { label: "LinkedIn", handle: "", href: "https://linkedin.com/" }, // حط لينك بروفايلك
    { label: "GitHub", handle: "", href: "https://github.com/" }, // حط لينك بروفايلك
    {
      label: "WhatsApp",
      handle: WHATSAPP ? `+${WHATSAPP}` : "",
      href: WHATSAPP ? `https://wa.me/${WHATSAPP}` : "",
    },
    { label: "Mostaql", handle: "", href: "https://mostaql.com/u/khaledIhelaly" },
    { label: "Upwork", handle: "", href: "https://www.upwork.com/freelancers/~0178f83e3d4479f2bf" },
    { label: "Nafezly", handle: "", href: "https://nafezly.com/u/khaledhelaly" },
    { label: "Freelance Yard", handle: "", href: "https://freelanceyard.com/u/khaled-mahmoud-helaly" },
    { label: "Freelancer", handle: "", href: "" }, // اتكتب الاسم بس من غير لينك — حط اللينك هنا
    { label: "Khamsat", handle: "", href: "https://khamsat.com/user/khaled_helaly77" },
    {
      label: "PeoplePerHour",
      handle: "",
      href: "https://www.peopleperhour.com/freelancer/khaled-helaly-frontend-react-developer-figma-to-zxmvvmww",
    },
    { label: "Medianesta", handle: "", href: "https://medianesta.sa/profile/khahel15?tab=portfolio" },
  ],
};