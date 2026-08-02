import Link from "next/link";

export const Definition = () => {
  return (
    <div className="mb-12">
      <div>
        <h3 className="text-5xl font-bold mb-4">WYRD</h3>
        <p className="text-base mb-4">/pronounced &ldquo;weird&rdquo;/</p>
        <p className="text-base mb-4">
          noun: fate or destiny, root of the modern English word <em>weird</em>
        </p>
        <p className="text-base mb-4">
          WYRD is a show exploring the truth behind weird life trajectories.
        </p>
        <p className="text-base mb-4">
          <Link
            href="/manifesto"
            className="border-b border-foreground hover:opacity-70 transition-opacity"
          >
            Read the WYRD manifesto.
          </Link>
        </p>
      </div>
    </div>
  );
};
