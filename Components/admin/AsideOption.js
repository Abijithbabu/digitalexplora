import styles from "./AsideOption.module.css";

function AsideOption({ Icon, title, active }) {
  return (
    <div
      className={`lg:h-auto px-8 py-3 mx-auto w-full cursor-pointer flex items-center text-gray-900 hover:text-blue-600 ${
        active && "text-blue-600"
      }`}
    >
      {Icon && <Icon fontSize="small" className="w-4 h-4" />}
      {title && <h3 className={`lg:inline-block ml-3 font-medium`}>{title}</h3>}
    </div>
  );
}

export default AsideOption;
