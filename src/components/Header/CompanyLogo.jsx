"use client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const CompanyLogo = () => {
  const router = useRouter();
  return (
    <div className="mr-9">
      <button
        onClick={() => {
          router.push("/");
        }}
        type="button"
        className="font-extrabold text-orange-500 text-[1rem]"
      >
        BuyNow!
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CompanyLogo), { ssr: false });
