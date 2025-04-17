import { categories, plugins } from '@/data/plugins';
import PluginCard from '@/components/PluginCard';
import CategoryButton from '@/components/CategoryButton';

interface SearchParams {
  category?: string;
}

export default function PluginsPage({ searchParams }: { searchParams: SearchParams }) {
  const selectedCategory = searchParams.category || 'all';

  const filteredPlugins = selectedCategory === 'all'
    ? plugins
    : plugins.filter(plugin => plugin.category === selectedCategory);

  return (
    <main className="min-h-screen bg-minecraft-light py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-minecraft-green mb-8">Plugins</h1>

        {/* Categorias */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={category.id === selectedCategory}
            />
          ))}
        </div>

        {/* Grid de Plugins */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.map((plugin) => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
      </div>
    </main>
  );
}
