import { Button } from "@/components/ui/button";

const getPrice = (v: number) => {
  if (v <= 10000) return { price: 3500, rate: 0.35 };
  if (v <= 50000) return { price: 15000, rate: 0.3 };
  if (v <= 100000) return { price: 28000, rate: 0.28 };
  return { price: 50000, rate: 0.25 };
};

const VoiceSmsPricing = ({ volume }: { volume: number }) => {
  const { price, rate } = getPrice(volume);

  return (
    <section className="mb-32">
      <h2 className="heading-md text-center mb-12">
        Voice / Transactional SMS
      </h2>

      <div className="glass-card p-10 max-w-2xl mx-auto text-center">
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

export default VoiceSmsPricing;
