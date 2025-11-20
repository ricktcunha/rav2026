import { Sprout, Target, Users, Zap, Leaf, Lightbulb, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Sprout,
  Target,
  Users,
  Zap,
  Leaf,
  Lightbulb
};

interface Props {
  iconName: string;
  className?: string;
  size?: number;
  color?: string;
}

export default function ArchetypeIcon({ iconName, className = "", size = 24, color }: Props) {
  const Icon = iconMap[iconName] || Sprout;
  
  return <Icon className={className} size={size} color={color} />;
}

