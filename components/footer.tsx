import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0f0f11] text-gray-300 py-10 mt-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between gap-8">
        {/* Left section */}
        <div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/logo-icon.svg"
              alt="CarePulse Logo"
              width={30}
              height={30}
              className="shadow-sm rounded-full"
            />
            <h1 className="text-xl font-semibold text-white">CarePulse</h1>
          </div>
          <p className="text-sm text-gray-400 mt-2 w-60">
            Smart doctor appointment & AI-powered healthcare management.
          </p>
        </div>

        <div className="text-center text-gray-500 text-xs mt-10">
          © {new Date().getFullYear()} CarePulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
