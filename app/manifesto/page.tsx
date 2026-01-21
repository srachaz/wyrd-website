import Link from "next/link";
import { DarkModeImage } from "@/components/DarkModeImage";
import { Footer } from "@/components/Footer";

export default function Manifesto() {
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
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">WYRD Manifesto</h1>

          <p className="text-base leading-relaxed mb-6 italic">
            "Everyone is looking for the highest, truest, expression of themselves as a human being." - Oprah
          </p>

          <p className="text-base leading-relaxed mb-6">
            Okay I know this sounds dramatic, but my life was saved because I met some very weird people. They lived the most unimaginable lives.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Until then, I didn't think I was capable of living an extraordinary life. But when you are exposed to these people, you learn that you are no different from them.
          </p>

          <p className="text-base leading-relaxed mb-6">
            I became very existential and thought deeply about life. My principle is simple: sit down, think about what you want, write it down, and go get it.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Small problem... it's actually very hard to know what you want. The luckiest people in the world are those whose ikigai (Japanese concept meaning a reason for being) is clear.
          </p>

          <p className="text-base leading-relaxed mb-6">
            That's why it's critical that people think more! Do things to understand who they really are and discover what they want!
          </p>

          <p className="text-base leading-relaxed mb-6">
            Chasing what you want takes you down an original path, which is hard and scary. You trade comfort for uncertainty, imposter syndrome, failure, existential dread, feeling cringe ... trust me I know ALL these good feelings ¯\_(ツ)_/¯
          </p>

          <p className="text-base leading-relaxed mb-6">
            My mission is to document the weirdest people and their weird lives. The trajectories that make absolutely no sense.
          </p>

          <p className="text-base leading-relaxed mb-6">
            I will show the real self-discovery, fear, and strength needed to find and walk the road less traveled.
          </p>

          <p className="text-base leading-relaxed mb-6 font-bold">
            WYRD is to help the ones who want the unconventional path.
          </p>
        </article>

        <div className="w-full mt-12 mb-6">
          <DarkModeImage
            lightSrc="/line8.png"
            darkSrc="/line8-dark.png"
            alt=""
            width={1200}
            height={20}
            className="w-full h-auto"
          />
        </div>

        <Link
          href="/"
          className="border-b border-foreground hover:opacity-70 transition-opacity text-base inline-block"
        >
          ← Back Home
        </Link>
      </div>
    </div>
  );
}
