import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CategoryFilterProps {
    categories: string[];
    currentCategory?: string;
    baseRoute: string;
}

export function CategoryFilter({ categories, currentCategory = 'All', baseRoute }: CategoryFilterProps) {
    const allCategories = categories.includes('All') ? categories : ['All', ...categories];

    return (
        <div className="mb-8">
            <h2 className="mb-4 text-lg font-medium">Categories</h2>
            <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                    <Link
                        key={category}
                        href={category === 'All'
                            ? route(baseRoute)
                            : route(baseRoute, { category })
                        }
                        className="inline-flex items-center"
                    >
                        <Button
                            variant={category === currentCategory ? "default" : "outline"}
                            size="sm"
                            className="rounded-full"
                        >
                            {category}
                            <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
} 