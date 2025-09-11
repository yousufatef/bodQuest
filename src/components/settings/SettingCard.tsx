import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SettingItem {
    label: string;
    value: string;
    variant?: 'secondary' | 'outline';
}

interface SettingCardProps {
    title: string;
    icon: React.ElementType;
    items: SettingItem[];
}

export function SettingCard({ title, icon: Icon, items }: SettingCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map(({ label, value, variant = 'secondary' }) => (
                    <div key={label} className="flex items-center justify-between">
                        <span className="text-sm">{label}</span>
                        <Badge variant={variant}>{value}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
