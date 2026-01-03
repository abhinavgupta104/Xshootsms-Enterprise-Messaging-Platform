import { Button } from "@/components/ui/button";

const getPrice = (v: number) => {
  if (v <= 10000) return 3500;
  if (v <= 50000) return 15000;
  return 24000;
};

const RcsPricing = ({ volume }: { volume: number }) => {
  const price = getPrice(volume);

  return (
    <section>
      <h2 className="heading-md text-center mb-12">
        RCS Messaging Pricing
      </h2>

      <div className="glass-card p-10 max-w-2xl mx-auto text-center">
        <h3 className="text-4xl font-bold text-orange">
          ₹{price.toLocaleString()}*
        </h3>
        <p className="text-muted-foreground mt-2">
          Estimated cost for {volume.toLocaleString()} messages
        </p>
        <Button className="mt-6">Get Started</Button>
      </div>
    </section>
  );
};

export default RcsPricing;
