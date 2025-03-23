import { LeftArrow, RightArrow } from "../common/Icons";

type PageCountProps = {
  currentPage: number;
  totalPages: number;
};

export const PageCount: React.FC<PageCountProps> = ({
  currentPage,
  totalPages,
}) => (
  <div className="flex items-center justify-center">
    <div className="text-sm text-gray-600">
      {currentPage} / {totalPages}
    </div>
  </div>
);

type NavArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  dataTestId?: string;
};

export const NavArrow: React.FC<NavArrowProps> = ({
  direction,
  onClick,
  className,
  disabled = false,
  dataTestId,
}) => {
  const renderArrow = () =>
    direction === "left" ? <LeftArrow /> : <RightArrow />;

  return (
    <button
      data-testid={dataTestId}
      onClick={onClick}
      className={`bg-violet-300 rounded-full color-slate-500 p-1 ${
        disabled ? "opacity-20" : "hover:opacity-80 cursor-pointer"
      } ${className}`}
      disabled={disabled}
    >
      {renderArrow()}
    </button>
  );
};
