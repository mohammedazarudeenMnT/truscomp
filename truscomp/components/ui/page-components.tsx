import React from 'react';

interface PageContainerProps {
    children: React.ReactNode;
    maxWidth?: "default" | "full" | "xl" | "lg";
    className?: string;
}

export const PageContainer = ({ 
    children, 
    maxWidth = "default",
    className = "" 
}: PageContainerProps) => {
    const maxWidthClass = {
        default: "max-w-7xl",
        full: "max-w-full",
        xl: "max-w-xl",
        lg: "max-w-lg"
    }[maxWidth];

    return (
        <div className={`w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 ${maxWidthClass} ${className}`}>
            {children}
        </div>
    );
};

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, icon, action }: PageHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 lg:mb-8">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    {icon && <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>}
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                </div>
                {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
    );
};

interface StatsCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    gradient?: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export const StatsCard = ({ label, value, icon, gradient, trend }: StatsCardProps) => {
    return (
        <div className="bg-card w-full rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <h3 className="text-2xl font-bold tracking-tight mt-2">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${gradient ? gradient + '/10' : 'bg-primary/10'}`}>
                    {icon}
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-xs">
                    <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                        {trend.value}
                    </span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                </div>
            )}
        </div>
    );
};
