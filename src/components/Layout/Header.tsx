import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <h2 className="ml-2 text-lg font-semibold lg:ml-0">Dashboard</h2>
            </div>
        </header>
    );
}