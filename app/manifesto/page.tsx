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
            People often wander aimlessly. Know what you want and execute. Think about something, and it becomes real.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Life is really weird. 3 years ago, I became deeply existential and introspected everyday on what I want. In the process, I made money, traveled the world, attained freedom, and recognized my passion.
          </p>

          <p className="text-base leading-relaxed mb-6">
            I left UCLA to create WYRD, because I am weird and I love talking to people.
          </p>

          <p className="text-base leading-relaxed mb-6">
            The pursuit of this path has been hard. You trade comfort for uncertainty, imposter syndrome, failure, loneliness, existential dread, feeling cringe ... trust me I know ALL these good feelings ¯(ツ)/¯
          </p>

          <p className="text-base leading-relaxed mb-6">
            WYRD shares stories of how people strive towards the highest, truest expression themselves as human beings— and how to live a weird life.
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
