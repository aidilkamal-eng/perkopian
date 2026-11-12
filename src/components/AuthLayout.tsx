import React from 'react';
import { Coffee } from 'lucide-react';
import BeanDivider from './BeanDivider';

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    align?: 'left' | 'right';
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    title,
    subtitle,
    align = 'right',
    children,
}) => {
    const alignClass =
        align === 'right' ? 'lg:justify-end lg:pr-[8%]' : 'lg:justify-start lg:pl-[8%]';
    
    return (
        <div
            className={`relative min-h-screen flex items-center justify-center ${alignClass} px-4 pt-24 pb-12`}
        >
            <div
                aria-hidden="true"
                className="fixed inset-0 bg-cream bg-[url('/login-bg.png')] bg-cover bg-left bg-no-repeat"
            />

            <div className="relative z-10 w-full max-w-[34rem] bg-[url('/login-card.png')] bg-[length:100%_100%] bg-no-repeat px-10 sm:px-16 pt-20 pb-14">
                <div className="text-center">
                    <Coffee className="h-12 w-12 text-caramel mx-auto" />
                    <h1 className="mt-3 font-heading text-4xl text-espresso">{title}</h1>
                    <p className="mt-1 font-heading italic text-lg text-espresso/80">{subtitle}</p>
                </div>

                <BeanDivider />

                {children}
            </div>
        </div>
    );
};

export default AuthLayout;