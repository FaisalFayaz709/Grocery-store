/**
 * Reusable Input Component
 * 
 * Usage:
 * <Input type="text" placeholder="Enter name" value={value} onChange={handleChange} />
 * <Input type="email" label="Email" error="Invalid email" />
 * <Input type="password" icon="🔒" />
 */

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  icon,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-[#333333] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        
        {/* Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
            {icon}
          </span>
        )}

        {/* Input Field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full p-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#4CAF50]
            ${icon ? "pl-11" : ""}
            ${error ? "border-red-500" : "border-[#E5E5E5]"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
            ${className}
          `}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

// Textarea Component
export function Textarea({
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  rows = 4,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-[#333333] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Textarea Field */}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full p-3 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-[#4CAF50]
          ${error ? "border-red-500" : "border-[#E5E5E5]"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${className}
        `}
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

// Select Component
export function Select({
  name,
  value,
  onChange,
  options,
  label,
  error,
  disabled = false,
  required = false,
  placeholder = "Select an option",
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-[#333333] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Field */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full p-3 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-[#4CAF50]
          ${error ? "border-red-500" : "border-[#E5E5E5]"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

// Checkbox Component
export function Checkbox({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-5 h-5 text-[#4CAF50] rounded focus:ring-2 focus:ring-[#4CAF50]"
        {...props}
      />
      {label && <span className="text-[#333333]">{label}</span>}
    </label>
  );
}

// Radio Component
export function Radio({
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-5 h-5 text-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
        {...props}
      />
      {label && <span className="text-[#333333]">{label}</span>}
    </label>
  );
}