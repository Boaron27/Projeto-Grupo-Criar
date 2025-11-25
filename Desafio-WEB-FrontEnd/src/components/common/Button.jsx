import "./Button.css";
import { Tooltip } from "react-tooltip";

const Button = ({
  children,
  className,
  onClick,
  tooltipId,
  tooltipContent,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${className ?? ""}`}
      onClick={onClick}
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      {...props}
    >
      {children}
      {tooltipId && <Tooltip id={tooltipId} place="top" type="dark" />}
    </button>
  );
};

const ButtonSmall = ({
  children,
  className,
  onClick,
  tooltipId,
  tooltipContent,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${className ?? ""}`}
      onClick={onClick}
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      {...props}
    >
      {children}
      {tooltipId && <Tooltip id={tooltipId} place="top" type="dark" />}
    </button>
  );
};

export { Button, ButtonSmall };
