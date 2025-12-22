/**
 * Reusable Button Component
 * 
 * Usage:
 * <Button variant="primary" size="md" onClick={handleClick}>Click Me</Button>
 * <Button variant="secondary" size="lg" disabled>Disabled</Button>
 * <Button variant="danger" size="sm" fullWidth>Full Width</Button>
 */

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  // Variant styles
  const variants = {
    primary: "bg-[#4CAF50] hover:bg-[#388E3C] text-white",
    secondary: "bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    info: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "bg-transparent border-2 border-[#E5E5E5] text-[#333333] hover:bg-[#F9F9F9]",
    ghost: "bg-transparent text-[#333333] hover:bg-[#F9F9F9]",
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  // Base styles
  const baseStyles = "font-semibold rounded-lg transition shadow-sm inline-flex items-center justify-center gap-2";
  
  // Width style
  const widthStyle = fullWidth ? "w-full" : "";
  
  // Disabled style
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthStyle}
        ${disabledStyle}
        ${className}
      `}
    >
      {children}
    </button>
  );
}