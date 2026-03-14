import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { Definition } from "@/components/Definition";
import { DarkModeImage } from "@/components/DarkModeImage";

const wyrdEpisodes = [
  {
    title: "Eric Zhu, Sperm Racing Founder",
    description: "Diagnosing Eric with the DSM-5…",
    youtubeUrl: "https://www.youtube.com/watch?v=nwTZ3GBmrcw",
  },
  {
    title: "Justin Waldron, Zynga Co-Founder",
    description: "Dropping out at 19 to build a gaming company",
    youtubeUrl: "https://www.youtube.com/watch?v=kVTBZCfny-A",
  },
  {
    title: "Ppl Pleasr, Shibuya Films Founder",
    description: "Unemployed Artist to Emmy Winner",
    youtubeUrl: "https://youtu.be/6XmJ-Yj1NO4?si=b4OXeiuMFda6HGTg",
  },
  {
    title: "Skyler Chan, GRU Space Founder",
    description: "Building the 1st Hotel on the Moon by 2032",
    youtubeUrl: "https://www.youtube.com/watch?v=9P4ngc2NvAM",
  },
  {
    title: "Iyan Moon Yang, Model & 1M+ Influencer",
    description: "Modeling for Dior at 17, gap year struggles",
    youtubeUrl: "https://youtu.be/Qhs9zxsB4aE?si=sjp75biI9b_KpQ8k",
  },
  {
    title: "Shane Fan, 7M+ Followers",
    description: "Graduating Berkeley at 18?",
    youtubeUrl: "https://www.youtube.com/watch?v=c3R-wg53jss&t=285s",
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
