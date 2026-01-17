import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@shared/schema";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiOpenjdk,
  SiCplusplus,
  SiDotnet,
  SiGo,
  SiRust,
  SiRuby,
  SiPhp,
  SiSwift,
  SiKotlin,
} from "react-icons/si";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiOpenjdk,
  SiCplusplus,
  SiDotnet,
  SiGo,
  SiRust,
  SiRuby,
  SiPhp,
  SiSwift,
  SiKotlin,
};

interface LanguageSelectorProps {
  selectedLanguage: string | null;
  onSelect: (language: SupportedLanguage) => void;
}

export function LanguageSelector({ selectedLanguage, onSelect }: LanguageSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">
        Selecione a Linguagem
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const Icon = iconMap[lang.icon];
          const isSelected = selectedLanguage === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => onSelect(lang)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-2 p-3 rounded-md border transition-all",
                "hover-elevate active-elevate-2",
                isSelected
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:border-primary/50"
              )}
              data-testid={`button-language-${lang.id}`}
            >
              {isSelected && (
                <div className="absolute top-1 right-1">
                  <Check className="h-3 w-3 text-primary" />
                </div>
              )}
              {Icon && (
                <Icon
                  className="h-6 w-6"
                  style={{ color: lang.color }}
                />
              )}
              <span className="text-xs font-medium truncate w-full text-center">
                {lang.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
