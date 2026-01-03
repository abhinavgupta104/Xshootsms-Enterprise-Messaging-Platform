type Props = {
  value: number;
  onChange: (v: number) => void;
};

const STEPS = [10000, 50000, 100000, 200000, 500000];

const VolumeSlider = ({ value, onChange }: Props) => {
  return (
    <div className="glass-card max-w-3xl mx-auto p-8 mb-32 border border-white/10">
      <h3 className="text-xl font-semibold text-center mb-6">
        Estimate Monthly Message Volume
      </h3>

      <input
        type="range"
        min={0}
        max={STEPS.length - 1}
        value={STEPS.indexOf(value)}
        onChange={(e) =>
          onChange(STEPS[Number(e.target.value)])
        }
        className="w-full accent-cyan"
      />

      <div className="flex justify-between text-xs text-muted-foreground mt-3">
        {STEPS.map((v) => (
          <span key={v}>{v.toLocaleString()}</span>
        ))}
      </div>

      <p className="text-center mt-6 text-lg font-bold text-orange">
        {value.toLocaleString()} messages / month
      </p>
    </div>
  );
};

export default VolumeSlider;
