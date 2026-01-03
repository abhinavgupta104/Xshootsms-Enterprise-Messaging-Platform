import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Growth",
    price: "₹3,599",
    desc: "Best for small teams starting WhatsApp automation.",
  },
  {
    name: "Scale",
    price: "₹7,799",
    popular: true,
    desc: "Advanced automation with workflows & team tools.",
  },
  {
    name: "Pro",
    price: "₹14,999",
    desc: "Enterprise-grade WhatsApp with AI & security.",
  },
];

const WhatsappPricing = () => {
  return (
    <section className="mb-32">
      <h2 className="heading-md text-center mb-16">
        WhatsApp Business Pricing
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`glass-card p-8 border border-white/10 relative ${
              p.popular ? "ring-2 ring-green-500/60" : ""
            }`}
          >
            {p.popular && (
              <span className="absolute top-4 right-4 badge-green">
                Popular
              </span>
            )}

            <h3 className="text-3xl font-bold text-orange">{p.price}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              per month, billed yearly
            </p>

            <h4 className="text-xl font-semibold">{p.name}</h4>
            <p className="text-muted-foreground mb-8">{p.desc}</p>

            <Button className="w-full">Get Started</Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatsappPricing;
