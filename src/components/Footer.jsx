import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", label: "Discord", icon: <FaDiscord /> },
  { href: "https://twitter.com", label: "Twitter", icon: <FaTwitter /> },
  { href: "https://youtube.com", label: "YouTube", icon: <FaYoutube /> },
  { href: "https://medium.com", label: "Medium", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-violet-50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-base font-light md:text-left">
          ©Nova 2024. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-50 transition-colors duration-500 ease-in-out hover:scale-125 hover:text-teal-100"
              aria-label={`Visit ${link.label}`}
              title={`Visit ${link.label}`}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-bases text-center font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>

      <section
        id="privacy-policy"
        tabIndex="-1"
        aria-label="Privacy Policy"
        className="container mx-auto mt-6 px-4 text-sm text-violet-100"
      >
        <h2 className="mb-2 text-base font-semibold text-white">
          Privacy Policy
        </h2>
        <p>
          We only process information needed to deliver core product features
          and support requests. For questions about data handling, contact
          hello@zentry.gg.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
