import Image from 'next/image';
import styles from './LogoCard.module.css';

interface LogoCardProps {
    name: string;
    logoUrl?: string;
    onClick?: () => void;
}

export function LogoCard({ name, logoUrl, onClick }: LogoCardProps) {
    return (
        <button className={styles.card} onClick={onClick} title={name}>
            {logoUrl ? (
                <Image
                    src={logoUrl}
                    alt={name}
                    width={80}
                    height={80}
                    className={styles.logo}
                    unoptimized // Using external placeholder service
                />
            ) : (
                <div className={styles.placeholder}>
                    {name.substring(0, 2).toUpperCase()}
                </div>
            )}
            <span className={styles.name}>{name}</span>
        </button>
    );
}
