import { useState } from "react";
import { Check, MessageSquare, Phone, MessageCircle } from "lucide-react";

// Individual Volume Slider Component
const IndividualVolumeSlider = ({ value, onChange, color = "green", icon: Icon }) => {
  const tiers = [
    { value: 10000, label: "10K" },
    { value: 50000, label: "50K" },
    { value: 100000, label: "100K" },
    { value: 500000, label: "500K" },
  ];

  const colorClasses = {
    green: {
      bg: "from-green-50 to-emerald-50",
      gradient: "#22c55e",
      text: "text-green-600",
      dot: "bg-green-600",
      track: "bg-green-100",
      icon: "text-green-600"
    },
    blue: {
      bg: "from-blue-50 to-cyan-50",
      gradient: "#3b82f6",
      text: "text-blue-600",
      dot: "bg-blue-600",
      track: "bg-blue-100",
      icon: "text-blue-600"
    },
    purple: {
      bg: "from-purple-50 to-pink-50",
      gradient: "#9333ea",
      text: "text-purple-600",
      dot: "bg-purple-600",
      track: "bg-purple-100",
      icon: "text-purple-600"
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-3xl p-8 shadow-sm border border-gray-100`}>
      <div className="flex items-center justify-center gap-3 mb-6">
        <Icon className={`w-8 h-8 ${colors.icon}`} />
        <div className={`text-4xl font-bold ${colors.text}`}>
          {value.toLocaleString()}
        </div>
      </div>
      
      <div className="relative px-2">
        <input
          type="range"
          min="10000"
          max="500000"
          step="10000"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full h-2 ${colors.track} rounded-full appearance-none cursor-pointer relative z-10`}
          style={{
            background: `linear-gradient(to right, ${colors.gradient} 0%, ${colors.gradient} ${((value - 10000) / (500000 - 10000)) * 100}%, #e5e7eb ${((value - 10000) / (500000 - 10000)) * 100}%, #e5e7eb 100%)`
          }}
        />
        
        {/* Tier Markers */}
        <div className="relative mt-1">
          {tiers.map((tier) => (
            <div
              key={tier.value}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${((tier.value - 10000) / (500000 - 10000)) * 100}%` }}
            >
              <div className={`w-3 h-3 ${colors.dot} rounded-full border-2 border-white shadow-sm`}></div>
              <div className="text-[10px] font-semibold text-gray-500 mt-1 whitespace-nowrap">
                {tier.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bulk SMS Pricing Component
const BulkSmsPricing = () => {
  const [volume, setVolume] = useState(50000);

  const getTierInfo = (vol) => {
    if (vol <= 10000) return { 
      price: 0.25, 
      total: 2500, 
      tier: "Starter",
      features: [
        "Lifetime validity",
        "Multi-language SMS support",
        "Fixed 6 letters/numbers sender ID",
        "Instant delivery report",
      ]
    };
    if (vol <= 50000) return { 
      price: 0.2, 
      total: vol * 0.2, 
      tier: "Growing",
      features: [
        "Lifetime validity",
        "Multi-language SMS support",
        "Fixed 6 letters/numbers sender ID",
        "Instant delivery report",
        "API access included",
      ]
    };
    if (vol <= 100000) return { 
      price: 0.18, 
      total: vol * 0.18, 
      tier: "Professional",
      features: [
        "Lifetime validity",
        "Multi-language SMS support",
        "Fixed 6 letters/numbers sender ID",
        "Instant delivery report",
        "API access included",
        "Priority delivery",
      ]
    };
    return { 
      price: 0.16, 
      total: vol * 0.16, 
      tier: "Enterprise",
      features: [
        "Lifetime validity",
        "Multi-language SMS support",
        "Fixed 6 letters/numbers sender ID",
        "Instant delivery report",
        "API access included",
        "Priority delivery",
        "Dedicated account manager",
      ]
    };
  };

  const info = getTierInfo(volume);

  return (
    <div className="mb-32">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full mb-4 shadow-lg">
          <MessageSquare className="w-6 h-6" />
          <span className="font-bold text-lg">Bulk SMS Pricing</span>
        </div>
        <p className="text-gray-600 text-lg">Adjust the slider to see pricing and benefits</p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: Slider and Price */}
        <div className="space-y-6">
          <IndividualVolumeSlider 
            value={volume} 
            onChange={setVolume}
            color="green"
            icon={MessageSquare}
          />
          
          <div className="bg-white rounded-3xl shadow-lg p-10 border-2 border-green-600">
            <div className="text-center">
              <div className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
                {info.tier} Plan
              </div>
              <div className="text-6xl font-bold text-green-600 mb-3">
                ₹{Math.round(info.total).toLocaleString()}
              </div>
              <div className="text-xl text-gray-600">
                {volume.toLocaleString()} SMS @ ₹{info.price} per SMS
              </div>
            </div>
          </div>
        </div>

        {/* Right: Benefits */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-sm p-10 border border-green-100 h-full">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            What's Included
          </h3>
          <ul className="space-y-4">
            {info.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transition-all hover:bg-white/80">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 text-lg font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-5 bg-white rounded-2xl shadow-sm">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-800">Note:</strong> Tax extra
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Voice Call Pricing Component
const VoiceSmsPricing = () => {
  const [volume, setVolume] = useState(50000);

  const getTierInfo = (vol) => {
    if (vol <= 10000) return { 
      price: 0.35, 
      total: 3500, 
      tier: "Starter",
      features: [
        "Lifetime validity",
        "Multi-language voice call support",
        "Fixed 10-digit sender ID",
        "100% delivery with instant delivery report",
      ]
    };
    if (vol <= 50000) return { 
      price: 0.3, 
      total: vol * 0.3, 
      tier: "Growing",
      features: [
        "Lifetime validity",
        "Multi-language voice call support",
        "Fixed 10-digit sender ID",
        "100% delivery with instant delivery report",
        "API available at extra cost",
      ]
    };
    if (vol <= 100000) return { 
      price: 0.28, 
      total: vol * 0.28, 
      tier: "Professional",
      features: [
        "Lifetime validity",
        "Multi-language voice call support",
        "Fixed 10-digit sender ID",
        "100% delivery with instant delivery report",
        "API available at extra cost",
        "Advanced call routing",
      ]
    };
    return { 
      price: 0.25, 
      total: vol * 0.25, 
      tier: "Enterprise",
      features: [
        "Lifetime validity",
        "Multi-language voice call support",
        "Fixed 10-digit sender ID",
        "100% delivery with instant delivery report",
        "API available at extra cost",
        "Advanced call routing",
        "Dedicated support line",
      ]
    };
  };

  const info = getTierInfo(volume);

  return (
    <div className="mb-32">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full mb-4 shadow-lg">
          <Phone className="w-6 h-6" />
          <span className="font-bold text-lg">Voice Call Pricing</span>
        </div>
        <p className="text-gray-600 text-lg">Adjust the slider to see pricing and benefits</p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: Slider and Price */}
        <div className="space-y-6">
          <IndividualVolumeSlider 
            value={volume} 
            onChange={setVolume}
            color="blue"
            icon={Phone}
          />
          
          <div className="bg-white rounded-3xl shadow-lg p-10 border-2 border-blue-600">
            <div className="text-center">
              <div className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
                {info.tier} Plan
              </div>
              <div className="text-6xl font-bold text-blue-600 mb-3">
                ₹{Math.round(info.total).toLocaleString()}
              </div>
              <div className="text-xl text-gray-600">
                {volume.toLocaleString()} Calls @ ₹{info.price} per call
              </div>
            </div>
          </div>
        </div>

        {/* Right: Benefits */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-sm p-10 border border-blue-100 h-full">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            What's Included
          </h3>
          <ul className="space-y-4">
            {info.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transition-all hover:bg-white/80">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 text-lg font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-5 bg-white rounded-2xl shadow-sm">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-800">Note:</strong> Tax extra
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// RCS Pricing Component
const RcsPricing = () => {
  const [volume, setVolume] = useState(50000);

  const getTierInfo = (vol) => {
    if (vol <= 10000) return { 
      price: 3500,
      setupFee: "₹5,000",
      tier: "Starter",
      range: "10,000 Messages",
      features: [
        "Powerful web APIs",
        "Rich media support",
        "No-code chatbot builder",
        "No monthly cost",
      ]
    };
    if (vol <= 50000) return { 
      price: 15000,
      setupFee: "₹5,000",
      tier: "Most Popular",
      range: "50,000 Messages",
      features: [
        "Powerful web APIs",
        "Rich media support",
        "No-code chatbot builder",
        "No monthly cost",
        "Unlimited live chat agents",
        "Bulk RCS campaigns",
      ]
    };
    return { 
      price: 24000,
      setupFee: "Free",
      tier: "Regular",
      range: "1,00,000+ Messages",
      features: [
        "Powerful web APIs",
        "Rich media support",
        "No-code chatbot builder",
        "No monthly cost",
        "Unlimited live chat agents",
        "Bulk RCS campaigns",
        "24×7 support",
        "Conversation analytics",
        "Blue tick verification",
      ]
    };
  };

  const info = getTierInfo(volume);

  return (
    <div className="mb-32">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full mb-4 shadow-lg">
          <MessageCircle className="w-6 h-6" />
          <span className="font-bold text-lg">RCS Messaging Pricing</span>
        </div>
        <p className="text-gray-600 text-lg">Adjust the slider to see pricing and benefits</p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: Slider and Price */}
        <div className="space-y-6">
          <IndividualVolumeSlider 
            value={volume} 
            onChange={setVolume}
            color="purple"
            icon={MessageCircle}
          />
          
          <div className="bg-white rounded-3xl shadow-lg p-10 border-2 border-purple-600">
            <div className="text-center">
              <div className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide shadow-md">
                {info.tier}
              </div>
              <div className="text-6xl font-bold text-purple-600 mb-3">
                ₹{info.price.toLocaleString()}
              </div>
              <div className="text-xl text-gray-600 mb-4">
                {info.range}
              </div>
              <div className="inline-block text-sm text-gray-600 bg-gray-100 rounded-xl py-2 px-6">
                RCS Setup: <span className="font-bold text-gray-800">{info.setupFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Benefits */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-sm p-10 border border-purple-100 h-full">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            What's Included
          </h3>
          <ul className="space-y-4">
            {info.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 transition-all hover:bg-white/80">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 text-lg font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// WhatsApp Pricing Component
const WhatsappPricing = () => {
  const plans = [
    {
      name: "Growth Plan",
      price: "₹3,599",
      billing: "per month, billed yearly",
      description:
        "Plug-and-play chatbots, broadcasts and a shared inbox to jump-start marketing and sales automation with integrated workflows for expanding teams.",
      features: [
        "Template message charges",
        "6 users",
        "Chatbot builder with basic connectors",
        "Messaging and chatbot analytics",
        "Broadcast to segmented contacts",
        "Shared team inbox with collaborative features",
        "WhatsApp Flows/Forms",
        "Basic messaging API",
        "30+ Native integrations",
        "WhatsApp catalogs",
      ],
      popular: false,
    },
    {
      name: "Scale Plan",
      price: "₹7,799",
      billing: "per month, billed yearly",
      description:
        "Ideal for companies looking to grow with advanced WhatsApp automation capabilities + nifty team management features.",
      features: [
        "Template message charges",
        "6 users",
        "Everything in Growth plan, plus:",
        "Chatbot builder with advanced connectors and utilities",
        "Drip campaigns",
        "WhatsApp native payment",
        "Advanced messaging API",
        "Custom roles",
        "Multiple WhatsApp numbers/channels",
        "AI rewrite",
        "Team management",
      ],
      popular: true,
    },
    {
      name: "Pro Plan",
      price: "₹14,999",
      billing: "per month, billed yearly",
      description:
        "Perfect for large teams ready to unlock advanced, AI-based WhatsApp automation with enterprise-ready security.",
      features: [
        "Template message charges (5% Off)",
        "6 users",
        "Everything in Scale plan, plus:",
        "AI-powered chatbots",
        "Dynamic forms",
        "Enterprise-grade security",
        "IP restrictions",
        "Number masking",
        "Priority support",
      ],
      popular: false,
    },
  ];

  return (
    <div className="mb-32">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full mb-4 shadow-lg">
          <MessageSquare className="w-6 h-6" />
          <span className="font-bold text-lg">WhatsApp Automation Pricing</span>
        </div>
        <p className="text-gray-600 text-lg">Choose the perfect plan for your team</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-3xl shadow-sm p-8 border-2 transition-all hover:shadow-xl hover:scale-105 ${
              plan.popular ? "border-green-600 shadow-lg scale-105" : "border-gray-100"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Most Popular
                </span>
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{plan.name}</h3>
              <div className="text-5xl font-bold text-green-600 mb-2">
                {plan.price}
              </div>
              <div className="text-sm text-gray-600">{plan.billing}</div>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed min-h-[80px]">{plan.description}</p>
            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Pricing Page
const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-green-50/20 to-white py-20">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full text-sm font-bold mb-6 uppercase tracking-wide shadow-lg">
            💰 Pricing
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Transparent Pricing
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Across All Channels
            </span>
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            Interactive sliders for usage-based pricing and monthly plans for WhatsApp automation.
          </p>
        </div>

        {/* Usage-Based Services with Individual Sliders */}
        <BulkSmsPricing />
        <VoiceSmsPricing />
        <RcsPricing />
        
        {/* WhatsApp at the end */}
        <WhatsappPricing />

        {/* Footer Notes */}
        <div className="text-center mt-20 space-y-3 bg-gradient-to-br from-gray-50 to-green-50 rounded-3xl shadow-sm p-10 max-w-3xl mx-auto border border-gray-100">
          <div className="text-2xl mb-4">📌</div>
          <p className="text-sm text-gray-700 font-semibold">* Prices are indicative</p>
          <p className="text-sm text-gray-700 font-semibold">
            * All prices are exclusive of taxes
          </p>
          <p className="text-sm text-gray-700 font-semibold">
            * Usage-based plans come with lifetime validity unless stated otherwise
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;