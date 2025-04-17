import Link from 'next/link';

interface CategoryButtonProps {
  category: {
    id: string;
    name: string;
    icon: string;
  };
  isActive?: boolean;
}

export default function CategoryButton({ category, isActive = false }: CategoryButtonProps) {
  return (
    <Link
      href={`/plugins?category=${category.id}`}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-minecraft transition-colors ${
        isActive
          ? 'bg-minecraft-green text-white'
          : 'bg-white hover:bg-minecraft-green hover:text-white'
      }`}
    >
      <span className="text-2xl">{category.icon}</span>
      <span className="font-bold">{category.name}</span>
    </Link>
  );
}
