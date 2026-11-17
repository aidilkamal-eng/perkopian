import React from 'react';

interface SectionFrameProps {
    number: string;
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}

const SectionFrame: React.FC<SectionFrameProps> = ({ number, title, action, children }) => (
    <section className="relative mb-8 border-b border-caramel/40 pb-8 pl-8">
        {/* Curved start of the left line */}
        <span
            aria-hidden="true"
            className="absolute left-0 top-4 h-4 w-4 rounded-tl-xl border-l border-t border-caramel/40"
        />
        {/* Left vertical line */}
        <span aria-hidden="true" className="absolute left-0 top-8 bottom-0 w-px bg-caramel/40" />

        <div className="flex items-center gap-4 mb-6">
            <span className="h-10 w-10 flex-shrink-0 rounded-full bg-caramel text-white font-heading flex items-center justify-center">
                {number}
            </span>
            <h2 className="font-heading text-2xl text-espresso">{title}</h2>
            <span className="flex-1 h-px bg-caramel/30" />
            {action}
        </div>

        {children}
    </section>
);

export default SectionFrame;