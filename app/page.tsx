import { SocialLinks } from "@/components/SocialLinks";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { Definition } from "@/components/Definition";
import { DarkModeImage } from "@/components/DarkModeImage";
import { getLatestWyrdEpisodes } from "@/lib/wyrd-youtube";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {
  const wyrdEpisodes = await getLatestWyrdEpisodes();

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
