import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { BRAND_ICON, BRAND_WORDMARK } from "@/components/publicNav";

const BrandLogo = () => {
  const { userRole } = useAuth();
  const homePath = userRole === "admin" ? "/admin" : "/member/dashboard";

  return (
    <Link to={homePath} className="flex items-center gap-2.5">
      <img src={BRAND_ICON} alt="Invest Bot IQ Icon" className="logo-invert h-9 w-auto" />
      <img src={BRAND_WORDMARK} alt="Invest Bot IQ Logo" className="logo-invert hidden h-4 w-auto md:block" />
    </Link>
  );
};

export default BrandLogo;
