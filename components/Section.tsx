interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ title, children, className = "" }: SectionProps) => {
  return (
    <section className={`mb-4 ${className}`}>
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      {children}
    </section>
  );
};
