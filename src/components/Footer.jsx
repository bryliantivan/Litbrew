// import { copyrightSign } from "../assets/icons"
// import { useLocation } from 'react-router-dom'; // Tambahkan import ini
import { footerLinks, socialMedia } from "../constants"
import logoLitbrew from "../assets/images/logoLitbrew.svg";

const Footer = () => {
    
    return (
    <footer className="bg-[#03151E] p-16">
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
        <div className="flex flex-col items-start">
          <a href="/">
            <img src={logoLitbrew}
              width={150}
              height={46}
              alt="Litbrew Logo"
            />
          </a>
          <p className="mt-6 text-base leading-7 font-raleway text-white sm:max-w-sm">Where stories meet sips. Immerse yourself in the perfect blend of books, brews, and boundless inspiration.</p>
          
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((icon) => (
              <div key={icon.alt} className="flex justify-center items-center max-lg:w-8 max-lg:h-8 w-12 h-12">
                <img
                  src={icon.src}
                  alt={icon.alt}
                  width={24}
                  height={24}
                  className="max-lg:w-5"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-between max-lg:gap-10 gap-20 flex-wrap mt-16">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-raleway text-xl leading-normal font-bold mb-6 text-[#4BC1D2]">{section.title}</h4>
              <ul>
                {section.links.map((link) => (
                  <li key={link.name} className="mt-3 text-white-400 font-montserrat text-base leading-normal hover:text-blue-400">
                    <a href={link.link} className="text-white font-raleway hover:text-blue-300 ">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="text-white mt-28 text-center">Copyright © 2024 LitBrew | Powered by ByteBuilders</p>
    </footer>
  );
};

export default Footer;