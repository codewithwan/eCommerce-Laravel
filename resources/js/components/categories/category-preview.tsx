interface CategoryPreviewProps {
    name: string;
    imageUrl?: string;
    onClick?: (name: string) => void;
}

export function CategoryPreview({ name, imageUrl, onClick }: CategoryPreviewProps) {
    const imageSource = imageUrl || `https://source.unsplash.com/random/300x400/?${name.toLowerCase()}`;
    
    return (
        <div 
            className="group relative h-48 cursor-pointer overflow-hidden rounded-md bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSource})` }}
            onClick={() => onClick && onClick(name)}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity group-hover:opacity-90"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-medium">{name}</h3>
                <p className="mt-1 text-sm opacity-90 transition-all group-hover:translate-x-1">
                    Explore Collection →
                </p>
            </div>
        </div>
    );
}
