import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { Definition } from "@/components/Definition";
import { DarkModeImage } from "@/components/DarkModeImage";

const wyrdEpisodes = [
  {
    title: "Shane Fan, Founder & Influencer",
    description: "Immigrating to US and graduating Berkeley at 18",
    youtubeUrl: "https://www.youtube.com/watch?v=c3R-wg53jss&t=285s",
  },
  {
    title: "Justin Waldron, Zynga Co-Founder",
    description: "Early to Facebook and building games for a living",
    youtubeUrl: "https://www.youtube.com/watch?v=kVTBZCfny-A",
  },
  {
    title: "Eric Zhu, Sperm Racing Founder",
    description: "Diagnosing Eric with the DSM-5…",
    youtubeUrl: "https://www.youtube.com/watch?v=nwTZ3GBmrcw",
  },
  {
    title: "Skyler Chan, GRU Space Founder",
    description: "Building the 1st Hotel on the Moon by 2032",
    youtubeUrl: "https://www.youtube.com/watch?v=9P4ngc2NvAM",
  },
  {
    title: "Dris, Instinct CEO",
    description: "Kicked out of high school to supporting 60k+ UGC creators",
    youtubeUrl: "https://www.youtube.com/watch?v=dN6TvAxD9_k",
  },
  {
    title: "Meow, Jupiter Exchange CEO",
    description: "Just me getting roasted by Meow for 40 minutes",
    youtubeUrl: "https://www.youtube.com/watch?v=p4Zyyua965Q",
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

        <div className="w-full my-12">
          <DarkModeImage
            lightSrc="/line5.png"
            darkSrc="/line5-dark.png"
            alt=""
            width={1200}
            height={20}
            className="w-full h-auto"
          />
        </div>

        {/* Header */}
        <header className="mb-16">
          <p className="text-base leading-relaxed mb-6">
            A weird host explores weird life trajectories. Read the{" "}
            <a
              href="/manifesto"
              className="border-b border-foreground hover:opacity-70 transition-opacity"
            >
              WYRD manifesto
            </a>
            .
          </p>
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
