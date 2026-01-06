import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef, useState } from "react";

import { Button } from "components/ui";
import DetailsGrid from "components/DetailsGrid";
import { useDidUpdate } from "hooks";

import { dateConverter, get, timeConverter } from "utility";
import { ORDER_ITEMS_LABEL } from "app/pages/Delivery/helper";
import ViewItems from "./ViewItems";

export default function Viewlead({ id, isOpen = false, onClose = () => {} }) {
  const saveRef = useRef(null);

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  useDidUpdate(() => {
    if (id) handleData();
  }, [id]);

  const handleData = async () => {
    try {
      const response = await get(`orders/details?id=${id}`);
      let { data } = response;

      setData([
        { label: "Date", value: dateConverter(data?.date) },
        { label: "Time", value: timeConverter(data?.time) },
        { label: "Order ID", value: data?.uniqueId },
        { label: "Customer ID", value: data?.customer?.uniqueId },
        { label: "Customer", value: data?.customer?.name },
        { label: "Mobile", value: data?.customer?.mobile },
        { label: "Total Amount", value: data?.amount },
        { label: "Sales Person", value: data?.salesPerson },
        { label: "Total Items", value: String(data?.itemsCount || 0) },
        { label: "Ready To Go", value: String(data?.count?.readyToGo || 0) },
        { label: "Transit", value: String(data?.count?.dispatch || 0) },
        {
          label: "Ready To Dispatch",
          value: String(data?.count?.readyToDispatch || 0),
        },
        { label: "Delivery", value: String(data?.count?.delivery || 0) },
      ]);

      const items = data?.items || [];

      items.map((item) => {
        item.status = ORDER_ITEMS_LABEL[item.status];
        return item;
      });

      setItems(items);
    } catch (error) {
      console.log(error);
      setData([]);
      setItems([]);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
          onClose={onClose}
          initialFocus={saveRef}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity dark:bg-black/30" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="dark:bg-dark-700 relative flex w-full max-w-7xl origin-top flex-col overflow-hidden rounded-lg bg-white transition-all duration-300">
              <div className="dark:bg-dark-800 flex items-center justify-end rounded-t-lg bg-gray-200 px-4 py-1 sm:px-5">
                <Button
                  onClick={onClose}
                  variant="flat"
                  isIcon
                  className="size-7 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                >
                  <XMarkIcon className="size-4.5" />
                </Button>
              </div>

              <div className="flex flex-col overflow-y-auto px-4 py-4 sm:px-5">
                <DetailsGrid data={data} />
                <ViewItems items={items} />
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}