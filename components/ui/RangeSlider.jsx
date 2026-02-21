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

export { RangeSlider };
