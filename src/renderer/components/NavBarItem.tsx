import { ReactNode } from 'react';

interface NavBarItemProps {
  Icon: ReactNode;
  Text: string;
  divideLast?: boolean;
}

function NavBarItem({ Icon, Text, divideLast = false }: NavBarItemProps) {
  const divideLastClasses = divideLast ? 'border-b-4' : '';

  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        min-w-min
        min-h-min
        w-24
        h-24
        ${divideLastClasses}`}
    >
      <div>{Icon}</div>
      <div className="text-slate-950">{Text}</div>
    </div>
  );
}

NavBarItem.defaultProps = {
  divideLast: false,
};

export default NavBarItem;
