import { Settings as SettingsIcon, Shield, Database, Palette } from 'lucide-react';
import { SettingCard } from './_components/SettingCard';

export function Settings() {
    return (
        <div className="space-y-6">
            {/* Page header */}
            <header>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Configure your application preferences</p>
            </header>

            {/* Settings cards */}
            <div className="grid gap-6 md:grid-cols-2">
                <SettingCard
                    title="General Settings"
                    icon={SettingsIcon}
                    items={[
                        { label: 'Application Name', value: 'Admin Panel' },
                        { label: 'Version', value: '1.0.0', variant: 'outline' },
                        { label: 'Environment', value: 'Development' },
                    ]}
                />

                <SettingCard
                    title="Security"
                    icon={Shield}
                    items={[
                        { label: 'Authentication', value: 'JWT Mock' },
                        { label: 'Session Timeout', value: '30 min', variant: 'outline' },
                        { label: 'Protected Routes', value: 'Enabled' },
                    ]}
                />

                <SettingCard
                    title="Data Source"
                    icon={Database}
                    items={[
                        { label: 'API Provider', value: 'JSONPlaceholder' },
                        { label: 'Connection Status', value: 'Connected' },
                        { label: 'Cache Strategy', value: 'None', variant: 'outline' },
                    ]}
                />

                <SettingCard
                    title="UI Preferences"
                    icon={Palette}
                    items={[
                        { label: 'Theme', value: 'System' },
                        { label: 'Components', value: 'shadcn/ui', variant: 'outline' },
                        { label: 'Responsive Design', value: 'Enabled' },
                    ]}
                />
            </div>
        </div>
    );
}
