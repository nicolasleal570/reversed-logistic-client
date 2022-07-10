export function InputLabel({ title, inputId }) {
  return (
    <label htmlFor={inputId} className="mb-1.5 block">
      <span className="text-sm leading-5 font-bold text-gray-700">{title}</span>
    </label>
  );
}
