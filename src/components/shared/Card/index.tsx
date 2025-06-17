interface CardProps {
  title: string;
  description: string;
  icon: React.ElementType; // ose `React.FC` nëse është komponent funksional
}

export default function Card({ title, description, icon: Icon }: CardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-center mb-4 text-red-600">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
