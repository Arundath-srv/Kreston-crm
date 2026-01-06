import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import InputBundle from "components/InputBundle";
import { Button, Table, THead, TBody, Th, Tr, Td } from "components/ui";
import { PlusCircleIcon, Save, X } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";

import { toast } from "sonner";
import { get } from "utility";

const ProductItems = ({
  products = [],
  setProducts = () => { },
  submitTrigger = null,
}) => {
  let [selectOptions, setSelectOptions] = useState({
    products: [],
    productsSku: [],
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = useCallback(() => {
    get("options/products").then((res) => {
      let data = { products: res.data };

      data.productsSku = res.data
        .map((item) => ({
          ...item,
          label: item.uniqueId,
        }))
        .filter((item) => item.uniqueId);

      setSelectOptions((pre) => ({ ...pre, ...data }));
    });
  }, []);

  const handleAddProductItems = useCallback(
    () => setProducts((pre) => [...pre, {}]),
    [setProducts],
  );

  const handleRemoveItems = useCallback(
    (idx) => {
      const items = [...products];
      items.splice(idx, 1);
      setProducts(items);
    },
    [products, setProducts],
  );

  const handleChange = (e, idx, created = false) => {
    const items = [...products];

    const item = items[idx];
    const name = e?.name?.split("-")[0];

    if (name === "sku" || name === "product") {
      const alreadyAdded = items.some((itm) => {
        if (!itm || !itm[name]) return false;

        if (itm[name] === e.value) return true;

        if (itm[name]?.value && itm[name]?.value === e.value?.value)
          return true;

        return false;
      });

      if (e !== null && alreadyAdded) {
        toast.warning("This product already added");
        return;
      }
    }

    const { value, obj } = e || {};

    if (created) {
      item[name] = value;
    } else if (name === "sku" || name === "product") {
      item.product = value;
      item.sku = name === "sku" ? value : obj?.uniqueId ? value : null;
      item.price = obj?.price || "";
      item.mrp = obj?.price || "";
    } else {
      item[name] = value;
    }

    if (item?.qty === undefined) item.qty = 1;

    if (item.price) item.total = item.qty * item.price;
    setProducts(items);
  };

  return (
    <div className="mt-5">
      <Table className="w-full overflow-scroll text-left rtl:text-right">
        <THead>
          <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
            {["#", "SKU", "Product", "Qty", "MRP", "Price", "Total"].map(
              (title, idx) => (
                <Th
                  key={idx}
                  className="dark:text-dark-100 p-1 font-semibold text-gray-800 capitalize"
                >
                  {title}
                </Th>
              ),
            )}
          </Tr>
        </THead>
        <TBody>
          {products?.map((tr, idx) => {
            return (
              <Tr
                key={idx}
                className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
              >
                <Td className="p-2">{idx + 1}</Td>
                <Td className="p-2">
                  <InputBundle
                    type="select"
                    name={`sku-[${idx}]`}
                    defaultValue={tr?.sku ?? ""}
                    placeholder="Enter SKU"
                    options={selectOptions.productsSku}
                    handleOnChange={(e) => handleChange(e, idx)}
                    className="min-w-[250px]"
                    onCreateOption={(e) => {
                      handleChange(
                        {
                          name: "sku",
                          value: { label: e, value: e },
                        },
                        idx,
                        true,
                      );
                    }}
                  />
                </Td>
                <Td className="p-2">
                  <InputBundle
                    type="select"
                    name={`product-${idx}`}
                    defaultValue={tr?.product ?? ""}
                    placeholder="Select the product"
                    options={selectOptions.products}
                    handleOnChange={(e) => handleChange(e, idx)}
                    className="min-w-[250px]"
                    onCreateOption={(e) => {
                      handleChange(
                        {
                          name: "product",
                          value: { label: e, value: e },
                        },
                        idx,
                        true,
                      );
                    }}
                  />
                </Td>
                <Td className="p-2">
                  <InputBundle
                    type="number"
                    defaultValue={tr?.qty ?? ""}
                    name={`qty-${idx}`}
                    placeholder="Enter the quantity"
                    className="min-w-[100px]"
                    handleOnChange={(e) => handleChange(e, idx)}
                    required={true}
                  />
                </Td>
                <Td className="p-2">
                  <InputBundle
                    type="number"
                    defaultValue={tr?.mrp ?? ""}
                    name={`mrp-${idx}`}
                    placeholder="Enter the MRP"
                    className="min-w-[100px]"
                    handleOnChange={(e) => handleChange(e, idx)}
                  />
                </Td>
                <Td className="p-2">
                  <InputBundle
                    type="number"
                    defaultValue={tr?.price ?? ""}
                    name={`price-${idx}`}
                    placeholder="Enter the price"
                    className="min-w-[100px]"
                    handleOnChange={(e) => handleChange(e, idx)}
                  />
                </Td>
                <Td className="p-2">
                  <InputBundle
                    type="amount"
                    className="min-w-[130px]"
                    prefix={<CurrencyRupeeIcon className="size-4.5" />}
                    disabled={true}
                    defaultValue={tr?.total}
                    value={tr?.total}
                    name={`total-${idx}`}
                    placeholder="Total Amount"
                  />
                </Td>
                <Td className="p-2">
                  <div className="flex items-center justify-center space-x-1">
                    <div className="flex items-center justify-center gap-2">
                      {products.length > 1 && (
                        <Button
                          isIcon
                          variant="text"
                          onClick={() => handleRemoveItems(idx)}
                        >
                          <X className="size-4.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>

      <div className="flex justify-end gap-4">
        <Button
          variant="outlined"
          className="my-1 mt-3 h-8 space-x-2 rounded-md px-3 text-xs"
          onClick={handleAddProductItems}
        >
          <PlusCircleIcon className="size-4" />
          <span>Add Items</span>
        </Button>

        {submitTrigger && (
          <Button
            variant="outlined"
            className="my-1 mt-3 h-8 space-x-2 rounded-md px-3 text-xs"
            onClick={submitTrigger}
          >
            <Save className="size-4" />
            <span>Update</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(ProductItems);