import classNames from "classnames";

export default function Screen({ children, active, className }) {
  return (
    <div
      className={classNames(
        className,
        { hidden: !active },
        "px-8 py-10 bg-white shadow rounded"
      )}
    >
      {children}
    </div>
  )
}
