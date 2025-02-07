import React from 'react';
import { about_us_photo, about_team_photo, barista_making_coffee, barista_smiling, customer_interaction } from "../assets/images";

const AboutUs = () => {
  return (
    <>
      <main className="md: mt-32 w-full flex flex-col justify-center items-center gap-5 bg-[#fef9f6]">
        {/* Journey Section */}
          <div className="text-center mb-16 py-8 bg-white rounded-lg shadow-md border border-gray-300">
            <h2 className="text-5xl md:text-center font-motter-corpus-std font-bold text-[#21325E] mb-5">Journey of LitBrew</h2>
            <div className="md:w-3/4 mx-auto">
              <p className="text-gray-600 font-raleway font-medium leading-relaxed">
                Born out of a passion for both literature and exceptional coffee, LitBrew opened its doors in 2024 with a simple yet bold vision: to create a space that invites people to read, relax, and recharge. Our founders, a team of book lovers and coffee enthusiasts, wanted to create a haven where literary works and the best of cafés come together to offer a unique experience. From the first shelf filled with curated books to the introduction of our signature coffee blends, LitBrew has become a place for those who seek inspiration, creativity, and community.
              </p>
            </div>
          </div>
          <div className="md:w-full mt-[-2rem]">
            <img src={about_us_photo} alt="LitBrew Library" className="w-full rounded-lg shadow-lg" />
          </div>

        {/* Our Team Section */}
        <section className="mt-16 mb-16 w-full">
          <h2 className="text-4xl md:text-5xl font-motter-corpus-std font-bold text-center text-[#21325E] mb-4">OUR TEAM</h2>
          <div className="md:w-3/4 mx-auto px-4 py-8 text-center">
            <p className="text-gray-600 font-raleway font-medium leading-relaxed">
              In LitBrew, stories brew as beautifully as our coffee. Our team is a vibrant mix of individuals from diverse races, religions, and backgrounds, united by a shared passion for creating a space where everyone feels welcome. At LitBrew, we believe in celebrating diversity, fostering inclusivity, and sparking conversations over great books and even better brews. Together, we're crafting a community where differences are embraced, and every story matters.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4">
            {/* Top Row (Full Width) */}
            <div className="col-span-2 md:col-span-4">
              <img src={about_team_photo} alt="Team Photo" className="w-full h-auto rounded-lg" />
            </div>

            {/* Middle Left */}
            <div className="col-span-2 md:col-span-2">
              <img src={barista_making_coffee} alt="Barista Making Coffee" className="w-full h-auto rounded-lg" />
            </div>

            {/* Middle Right (Stacked) */}
            <div className="col-span-2 md:col-span-2 grid grid-rows-2 gap-2 md:gap-4">
              <div className="row-span-2"> {/* Shorter height for barista_smiling */}
                <img src={barista_smiling} alt="Barista Smiling" className="w-full h-auto rounded-lg" />
              </div>
              <div className="row-span-2"> {/* Allow space for customer_interaction */}
                <img src={customer_interaction} alt="Customer Interaction" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>

      </section>
      </main>
    </>
  );
};

export default AboutUs;