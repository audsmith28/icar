import { Initiative } from '@/lib/mockData';
import { LogoCard } from './LogoCard';
import styles from './LandscapeGrid.module.css';

interface LandscapeGridProps {
    initiatives: Initiative[];
}

export function LandscapeGrid({ initiatives }: LandscapeGridProps) {
    // Group initiatives by category
    const grouped = initiatives.reduce((acc, initiative) => {
        const category = initiative.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(initiative);
        return acc;
    }, {} as Record<string, Initiative[]>);

    const categories = Object.keys(grouped).sort();

    return (
        <div className={styles.container}>
            {categories.map((category) => (
                <div key={category} className={styles.categorySection}>
                    <h3 className={styles.categoryTitle}>{category}</h3>
                    <div className={styles.grid}>
                        {grouped[category].map((initiative) => (
                            <LogoCard
                                key={initiative.id}
                                name={initiative.name}
                                logoUrl={initiative.logoUrl}
                                onClick={() => alert(`Clicked: ${initiative.name}`)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
