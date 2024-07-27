import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function CollapsibleItem({ title, bgColor, children }) {
  return (
    <Disclosure as="div" className={`mb-4 bg-${bgColor}-50 rounded-md`}>
      <Disclosure.Button className="w-full focus:outline-none px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-blue-600 capitalize">
            {title}
          </h3>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </Disclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        show={true}
      >
        <Disclosure.Panel>{children}</Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
}

export default CollapsibleItem;
