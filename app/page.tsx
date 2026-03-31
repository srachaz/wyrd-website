import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { Definition } from "@/components/Definition";
import { DarkModeImage } from "@/components/DarkModeImage";

const wyrdEpisodes = [
  {
    title: "Shane Fan",
    description:
      "Graduated high school at 15, UC Berkeley at 18. Creator with 7M+ followers and 3B+ views. Founder & CEO of a stealth startup building onchain products. He's 23.",
    youtubeUrl: "https://youtu.be/c3R-wg53jss?si=l4aFJlVy5qmEjn6e",
  },
  {
    title: "pplpleasr (Emily Yang)",
    description:
      "Multidisciplinary artist and founder of Shibuya, a crowdfunding platform for independent filmmakers. Her anime White Rabbit became the first crypto project to win an Emmy.",
    youtubeUrl: "https://youtu.be/6XmJ-Yj1NO4?si=h2P2mrGhsfz89NDr",
  },
  {
    title: "Skyler Chan",
    description:
      "22-year-old who graduated Berkeley a year early to found GRU Space, building the first lunar hotel.",
    youtubeUrl: "https://youtu.be/9P4ngc2NvAM?si=anUPCOEU57WCvVsT",
  },
  {
    title: "Iyan Moon Yang",
    description:
      "20-year-old student and influencer signed with Ford Models, went viral for modeling for Dior at 16.",
    youtubeUrl: "https://youtu.be/Qhs9zxsB4aE?si=29hn3bSx8HqfXL0u",
  },
  {
    title: "Viraj Ala",
    description:
      "21-year-old who transferred into Berkeley to drop out and become a content creator interviewing billionaire CEOs all day and democratizing access to Silicon Valley.",
    youtubeUrl: "https://youtu.be/ZNtY4pTEU6M?si=FlNQbveUVictYZpk",
  },
  {
    title: "Gajesh Naik",
    description:
      "Built a DeFi protocol managing $7M at 13, Solana & FTX intern at 14, immigrated from India to America and now a research engineer at Eigen Labs. Just turned 18.",
    youtubeUrl: "https://youtu.be/gDpQOrATd3I?si=Ryn8-uJwrYK8_jTF",
  },
  {
    title: "Eric Zhu",
    description:
      "18-year-old founder who raised $10 million for Sperm Racing, previously built his first startup, Aviato, from a high school bathroom stall.",
    youtubeUrl: "https://youtu.be/nwTZ3GBmrcw?si=YS5vV5EA3Jw557UI",
  },
  {
    title: "Dris Elamri",
    description:
      "18-year-old CEO of Instinct (60K+ creators). Grew a YouTube channel to 200K subs in 9 months, made $50K/mo dropshipping, and got kicked out of high school for hacking water fountains.",
    youtubeUrl: "https://youtu.be/dN6TvAxD9_k?si=nyta31TDsFFhY3qo",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="w-full flex justify-center bg-white dark:bg-black">
        <div className="max-w-2xl w-full py-8">
          <DarkModeImage
            lightSrc="/wyrd-cover.png"
            darkSrc="/wyrd-cover-dark.png"
            alt="WYRD Banner"
            width={1920}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* What is WYRD Definition */}
        <div className="mb-8">
          <Definition />
        </div>

        {/* Header */}
        <header className="mb-8">
          <SocialLinks />
        </header>

        <div className="w-full my-12">
          <DarkModeImage
            lightSrc="/line6.png"
            darkSrc="/line6-dark.png"
            alt=""
            width={1200}
            height={20}
            className="w-full h-auto"
          />
        </div>

        {/* WYRD Interviews */}
        <Section title="Weirdest Interviews">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wyrdEpisodes.map((episode) => (
              <EpisodeCard key={episode.title} {...episode} />
            ))}
          </div>
        </Section>

        <div className="w-full mt-4 mb-6">
          <DarkModeImage
            lightSrc="/line8.png"
            darkSrc="/line8-dark.png"
            alt=""
            width={1200}
            height={20}
            className="w-full h-auto"
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
