export interface TrustIndicator {
    id: string;
    text: string;
    icon: React.ReactNode;
}

interface TrustIndicatorsProps {
    indicators: TrustIndicator[];
}

export function TrustIndicators({ indicators }: TrustIndicatorsProps) {
    return (
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-4">
            {indicators.map(indicator => (
                <div key={indicator.id} className="flex items-center gap-2">
                    {indicator.icon}
                    <span className="text-sm font-medium">{indicator.text}</span>
                </div>
            ))}
        </div>
    );
}
