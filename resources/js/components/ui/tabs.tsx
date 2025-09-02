'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn('flex flex-col gap-2', className)}
            {...props}
        />
    );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0
    });
    const tabsListRef = useRef<HTMLDivElement | null>(null);

    const updateIndicator = useCallback(() => {
        if (!tabsListRef.current) return;

        const activeTab = tabsListRef.current.querySelector<HTMLElement>(
            '[data-state="active"]'
        );
        if (!activeTab) return;

        const activeRect = activeTab.getBoundingClientRect();
        const tabsRect = tabsListRef.current.getBoundingClientRect();

        requestAnimationFrame(() => {
            setIndicatorStyle({
                left: activeRect.left - tabsRect.left,
                top: activeRect.top - tabsRect.top,
                width: activeRect.width,
                height: activeRect.height
            });
        });
    }, []);

    useEffect(() => {
        // Initial update
        const timeoutId = setTimeout(updateIndicator, 0);

        // Event listeners
        window.addEventListener('resize', updateIndicator);
        const observer = new MutationObserver(updateIndicator);

        if (tabsListRef.current) {
            observer.observe(tabsListRef.current, {
                attributes: true,
                childList: true,
                subtree: true
            });
        }

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateIndicator);
            observer.disconnect();
        };
    }, [updateIndicator]);

    return (
        <div className="relative" ref={tabsListRef}>
            <TabsPrimitive.List
                data-slot="tabs-list"
                className={cn(
                    'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
                    className
                )}
                {...props}
            />
            <div
                className="absolute rounded-md border border-transparent bg-background shadow-sm dark:border-input transition-all duration-300 ease-in-out"
                style={indicatorStyle}
            />
        </div>
    );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                'data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 z-10',
                className
            )}
            {...props}
        />
    );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn('flex-1 outline-none', className)}
            {...props}
        />
    );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
