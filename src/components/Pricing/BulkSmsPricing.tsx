import { Button } from "@/components/ui/button";

const getPrice = (v: number) => {
  if (v <= 10000) return { price: 2500, rate: 0.25 };
  if (v <= 50000) return { price: 10000, rate: 0.2 };
  if (v <= 100000) return { price: 18000, rate: 0.18 };
  return { price: 80000, rate: 0.16 };
};

const BulkSmsPricing = ({ volume }: { volume: number }) => {
  const { price, rate } = getPrice(volume);

  return (
    <section className="mb-32">
      <h2 className="heading-md text-center mb-12">
        Bulk SMS Pricing
      </h2>

      <div className="glass-card p-10 max-w-2xl mx-auto text-center mb-16 border border-cyan/40">
        <h3 className="text-4xl font-bold text-orange">
          ₹{price.toLocaleString()}*
        </h3>
        <p className="text-muted-foreground mt-2">
          ₹{rate} per SMS for {volume.toLocaleString()} messages
        </p>
        <Button className="mt-6">Get Started</Button>
      </div>
    </section>
  );
};

export default BulkSmsPricing;
