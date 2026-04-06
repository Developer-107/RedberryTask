import Link from "next/link";

export default function RightsTermsPolicyBox() {
  const date = new Date().getFullYear().toString();

  return (
    <div className="flex justify-between items-center mb-5">
      <div>Copyright © {date} Redberry International</div>
      <div className="flex gap-2">
        All Rights Reserved
        <span>|</span>
        <Link href={""} className="text-[#4F46E5]">
          {" "}
          Terms and Conditions{" "}
        </Link>
        <span>|</span>
        <Link href={""} className="text-[#4F46E5]">
          {" "}
          Privacy Policy{" "}
        </Link>
      </div>
    </div>
  );
}
