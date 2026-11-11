import React from 'react';

const BeanDivider: React.FC = () => (
    <div className="flex items-center gap-3 my-6">
        <span className="flex-1 hidden sm:block h-px bg-gradient-to-r from-transparent to-caramel/50"/>
        <img src="/bean.png" alt="" className="h-5 w-4 text-caramel" />
        <span className="flex-1 hidden sm:block h-px bg-gradient-to-l from-transparent to-caramel/50"/>
    </div>
);

export default BeanDivider;