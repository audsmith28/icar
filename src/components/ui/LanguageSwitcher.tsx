"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === "en" ? "he" : "en";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button
            onClick={toggleLocale}
            className={styles.switcher}
            aria-label="Switch language"
        >
            <Globe className={styles.icon} />
            <span className={styles.label}>{locale === "en" ? "עברית" : "English"}</span>
        </button>
    );
}
