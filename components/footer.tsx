const Footer = () => {
  return (
    <footer className="w-full bg-[#0f0f11] text-gray-300 py-10 mt-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between gap-8">

        {/* Left section */}
        <div>
          <h1 className="text-xl font-semibold text-white">CarePulse</h1>
          <p className="text-sm text-gray-400 mt-2 w-60">
            Smart doctor appointment & AI-powered healthcare management.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-10">
          <div>
            <h2 className="text-white font-medium mb-2">Product</h2>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Doctors</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">Appointments</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-medium mb-2">Company</h2>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} CareVision. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
