// src/components/ui/Button.tsx
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="w-full bg-[#46c2de] text-white py-2 rounded-lg hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}
