// src/components/ui/Input.tsx
type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="text-gray-400 w-full border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#46c2de]"
    />
  );
}
