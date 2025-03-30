import { CategoryPreview } from './category-preview';

interface CategoryGridProps {
    categories: string[];
    onCategoryClick?: (category: string) => void;
}

export function CategoryGrid({ categories, onCategoryClick }: CategoryGridProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
                <CategoryPreview 
                    key={category} 
                    name={category} 
                    onClick={onCategoryClick}
                />
            ))}
        </div>
    );
}
