export default function HeroSection() {
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-secondary">
            Social media, <br />
            <span className="text-secondary">
              re-imagined as <span className="text-accent">Cleo.</span>
            </span>
          </h1>
          <p className="py-6 font-medium">
            A minimalist space built for high-signal conversations. Experience
            real-time connection without the algorithmic noise.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
