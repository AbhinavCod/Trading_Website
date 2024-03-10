import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import { useTheme } from "../context/ThemeContext";

const SignUp = () => {
  const {darkMode} = useTheme();
  return (
    <>
      <div className={`grid md:grid-cols-[2fr_2fr]  ${darkMode ? "bg-gray-900" : ""}`}>

        <div className={`flex-1 border-r-8 ${darkMode ? "border-r-gray-800" : ""} `}>
          <img
            style={{ marginTop: "6rem" }}
            src="https://signup.zerodha.com/img/landing.46a77378.png"
          ></img>
        </div>

        <div>
          <SignUpForm />
        </div>

      </div>

      <div>
      <p className="text-gray-500 text-center my-6"> By submitting your contact details, you authorize Zerodha to contact you even if you are registered on DND &amp;
         conduct online KYC for trading &amp; demat account opening as per KRA regulations and PMLA guidelines. To learn about the details 
         we collect when you sign up with Zerodha, visit our
          <Link className="text-blue-400" target="_blank" to="https://support.zerodha.com/category/console/reports/other-queries/articles/details-collected-when-opening-an-account">support article.</Link>

          <br></br>
           If you are looking to open a HUF, Corporate, Partnership, or NRI account, you have to use the 
           <Link target="_blank" to="https://zerodha.com/resources">offline forms.</Link>
            For help, <Link className="text-blue-400" target="_blank" to="https://support.zerodha.com/category/account-opening/company-partnership-and-huf-account-opening?language=english">click here.</Link></p>
      </div>
    </>
  );
};

export default SignUp;
