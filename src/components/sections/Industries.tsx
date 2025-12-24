import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Landmark, 
  GraduationCap, 
  Heart, 
  Truck, 
  Building2,
  Smartphone,
  Utensils,
  Plane,
  Car
} from "lucide-react";

const industries = [
  { icon: ShoppingCart, name: "E-commerce", description: "Order updates & promotions" },
  { icon: Landmark, name: "Fintech", description: "Secure OTPs & alerts" },
  { icon: GraduationCap, name: "EdTech", description: "Student engagement" },
  { icon: Heart, name: "Healthcare", description: "Appointment reminders" },
  { icon: Truck, name: "Logistics", description: "Delivery notifications" },
  { icon: Building2, name: "Enterprise", description: "Internal communications" },
  { icon: Smartphone, name: "Technology", description: "User verification" },
  { icon: Utensils, name: "Food & Beverage", description: "Order tracking" },
  { icon: Plane, name: "Travel", description: "Booking confirmations" },
  { icon: Car, name: "Automotive", description: "Service reminders" },
];

export const Industries = () => {
  return (
    <section id="industries" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-medium mb-6"
          >
            Industries
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Powering Every{" "}
            <span className="text-gradient-accent">Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From startups to Fortune 500 companies, businesses across all sectors trust Xshootsms.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center group-hover:from-cyan/20 group-hover:to-orange/20 transition-all duration-300"
              >
                <industry.icon className="w-7 h-7 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.div>
              <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
              <p className="text-xs text-muted-foreground">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
