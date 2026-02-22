function RangeSlider({ className = "", ref, ...props }) {
  return (
    <div className={`w-full flex items-center ${className}`}>
      <input
        type="range"
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
        ref={ref}
        {...props}
      />
    </div>
  );
}

const thumbClasses = [
  "absolute w-full appearance-none bg-transparent cursor-pointer",
  // disable pointer events on the track so the bottom input's thumb stays reachable
  "pointer-events-none",
  "[&::-webkit-slider-thumb]:pointer-events-auto",
  "[&::-moz-range-thumb]:pointer-events-auto",
  "[&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:w-[14px]",
  "[&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:bg-primary",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white",
  "[&::-webkit-slider-thumb]:shadow",
  "[&::-moz-range-thumb]:h-[14px] [&::-moz-range-thumb]:w-[14px]",
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none",
  "[&::-moz-range-thumb]:bg-primary",
  "[&::-webkit-slider-runnable-track]:bg-transparent",
  "[&::-moz-range-track]:bg-transparent",
].join(" ");

// Tick dots displayed below the slider — one every 6 hours (0, 6h, 12h, 18h, 24h)
const TICKS = [0, 25, 50, 75, 100];

function DualRangeSlider({ min = 0, max = 1440, step = 30, minValue, maxValue, onMinChange, onMaxChange }) {
  const leftPercent = ((minValue - min) / (max - min)) * 100;
  const rightPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {/* Slider track + thumbs */}
      <div className="relative w-full h-5 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-[3px] rounded-full bg-gray-200 pointer-events-none">
          <div
            className="absolute h-full rounded-full bg-primary"
            style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
          />
          {/* Tick dots — sit on the track, vertically centered */}
          {TICKS.map((pct) => (
            <span
              key={pct}
              className="absolute w-[5px] h-[5px] rounded-full bg-white border border-gray-300 top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${pct}%` }}
            />
          ))}
        </div>
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => onMinChange(Math.min(Number(e.target.value), maxValue - step))}
          className={thumbClasses}
          style={{ zIndex: minValue >= maxValue - step ? 5 : 3 }}
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => onMaxChange(Math.max(Number(e.target.value), minValue + step))}
          className={thumbClasses}
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  );
}

export { RangeSlider, DualRangeSlider };
