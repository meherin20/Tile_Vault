export default function Marquee() {
  const text =
    "New Arrivals: Emerald Green Gloss | Weekly Feature: Modern Geometric Patterns | Join the Community for Exclusive Deals | Free Shipping on Orders Over $200 | Handcrafted Moroccan Zellige Now Available";

  return (
    <div className="bg-primary text-primary-content py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="inline-block px-4 text-sm md:text-base font-medium">
          {text} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {text} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {text}
        </span>
      </div>
    </div>
  );
}
