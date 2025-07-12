import Logo from "../ui/Logo";
import Image from "next/image";
import planeImage from "/assets/plane-footer.svg";
import IG from "/assets/medsos-ig.svg";
import twitter from "/assets/medsos-twitter.svg";
import tiktok from "/assets/medsos-tiktok.svg";
import facebook from "/assets/medsos-fb.svg";
import youtube from "/assets/medsos-youtube.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const HomeFooter: React.FC = () => {
  const router = useRouter();
  
  const handleSignUp = () => {
    router.push("/signup");
  };
  
  const handleLogin = () => {
    router.push("/login");
  };
  
  const handleStatus = () => {
    router.push("/status");
  };
  
  const handleCabin = () => {
    router.push("/cabin");
  };
  
  const handleBaggage = () => {
    router.push("/baggage");
  };

  return (
    <div>
      <div className="w-full h-[321px] flex-col justify-between items-start inline-flex">
        <div className="w-full px-[20px] py-12 md:px-[50px] bg-white border-t border-gray-200 justify-between items-start inline-flex">
          <div className="w-full grid grid-cols-12 gap-5">
            {/* Logo and Social Media Section */}
            <div className="col-span-12 xl:col-span-4 py-6 bg-white rounded-[16px] flex-col justify-center items-center gap-4">
              <div className="h-[150px] flex-col justify-between items-start inline-flex">
                <div className="flex-col justify-center items-start gap-2 flex">
                  <Logo />
                  <div className="self-stretch text-left text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                    Navigate the Skies, Booking Made Easy
                  </div>
                  <div className="flex pt-5 gap-8">
                    <Image
                      src={IG}
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="social-media-icon cursor-pointer hover:opacity-80 transition-opacity"
                    />
                    <Image
                      src={twitter}
                      alt="Twitter"
                      width={24}
                      height={24}
                      className="social-media-icon cursor-pointer hover:opacity-80 transition-opacity"
                    />
                    <Image
                      src={tiktok}
                      alt="TikTok"
                      width={24}
                      height={24}
                      className="social-media-icon cursor-pointer hover:opacity-80 transition-opacity"
                    />
                    <Image
                      src={facebook}
                      alt="Facebook"
                      width={24}
                      height={24}
                      className="social-media-icon cursor-pointer hover:opacity-80 transition-opacity"
                    />
                    <Image
                      src={youtube}
                      alt="YouTube"
                      width={24}
                      height={24}
                      className="social-media-icon cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links Section */}
            <div className="col-span-12 xl:col-span-8 py-6 bg-white rounded-[16px] flex-col justify-center items-center gap-4">
              <div className="grid grid-cols-12 xl:grid-cols-10 gap-5 w-full">
                {/* Features Column */}
                <div className="col-span-4 xl:col-span-2 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    Features
                  </div>
                  <div className="flex gap-2 self-stretch text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    <Link
                      href="/signup"
                      onClick={handleSignUp}
                      className="cursor-pointer hover:text-primary transition-colors"
                    >
                      Sign Up
                    </Link>
                    <p>/</p>
                    <Link
                      href="/login"
                      onClick={handleLogin}
                      className="cursor-pointer hover:text-primary transition-colors"
                    >
                      Login
                    </Link>
                  </div>
                  <Link
                    href="/explore"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    Explore
                  </Link>
                  <Link
                    href="/status"
                    onClick={handleStatus}
                    className="self-stretch cursor-pointer hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal transition-colors"
                  >
                    Status
                  </Link>
                </div>

                {/* Cabin Column */}
                <div className="col-span-4 xl:col-span-2 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    <Link
                      href="/cabin"
                      onClick={handleCabin}
                      className="cursor-pointer hover:text-primary transition-colors"
                    >
                      Cabin
                    </Link>
                  </div>
                  <Link
                    href="/cabin/economy"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    Economy
                  </Link>
                  <Link
                    href="/cabin/business"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    Business
                  </Link>
                  <Link
                    href="/cabin/first"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    First
                  </Link>
                </div>

                {/* Baggage Column */}
                <div className="col-span-4 xl:col-span-2 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    <Link
                      href="/baggage"
                      onClick={handleBaggage}
                      className="cursor-pointer hover:text-primary transition-colors"
                    >
                      Baggage
                    </Link>
                  </div>
                  <Link
                    href="/baggage/checked"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    Checked Baggage
                  </Link>
                  <Link
                    href="/baggage/cabin"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    Cabin Baggage
                  </Link>
                  <Link
                    href="/baggage/fare-types"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    Fare Types
                  </Link>
                </div>

                {/* Resources Column */}
                <div className="col-span-4 xl:col-span-2 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    Resources
                  </div>
                  <Link
                    href="/about"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/faqs"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    FAQs
                  </Link>
                </div>

                {/* Company Column */}
                <div className="col-span-4 xl:col-span-2 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    Company
                  </div>
                  <Link
                    href="/privacy"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal cursor-pointer transition-colors"
                  >
                    Terms of Use
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full h-[100px] bg-primary flex justify-end md:justify-between items-center px-[20px] lg:px-[51px] md:py-12 py-5">
          <div className="h-auto justify-end items-center gap-6 hidden md:flex -ml-52">
            <Image
              src={planeImage}
              alt="Plane"
              width={200}
              height={60}
              className="h-auto w-[95%]"
              priority
            />
          </div>
          <p className="text-white text-lg font-medium font-['Plus Jakarta Sans'] leading-7 pl-0 md:pl-10">
            No Bull, Just Board!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;