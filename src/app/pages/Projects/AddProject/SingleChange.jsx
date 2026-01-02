/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Inputs from "components/Inputs";
import { Button } from "components/ui";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GET_OPTIONS } from "../../Client/config";
import { singleChangeSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { put } from "utility";

const SingleChange = ({ data, setRefresh, close }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(singleChangeSchema),
    defaultValues: {
      type: data.type,
      id: data?.id,
      pStatus: data?.pStatus || "",
      feeStatus: data?.feeStatus || ""
    },
  });

  let [options, setOptions] = useState({});

  useEffect(() => {
    if (data.type == 1 && !options.privilege) {
      GET_OPTIONS(setOptions, { privilege: true }, "privilege", {});
    }
  }, []);

  const projectStatus = [
    { label: "Completed", value: 1 },
    { label: "In Progress", value: 2 },
    { label: "On Hold", value: 3 },
    { label: "Not Started", value: 4 },
    { label: "Cancelled", value: 5 },
  ];

  const feeStatus = [
    { label: "Paid", value: 1 },
    { label: "Unpaid", value: 2 },
    { label: "Partially Paid", value: 3 },
  ]

  let onSubmit = async (data) => {
    try {
      const url = data.type === 1 ? "project/project-status" : "project/fee-status";
      let res = await put(url, data);

      toast.success(res?.message);
      reset();
      setRefresh(Date.now());
      close();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col overflow-y-auto px-4 py-4 sm:px-5"
    >
      {/* {data.type == 1 ? (
        <Inputs
          control={control}
          placeholder="Select the project status"
          label="Change Project Status"
          name="privilege"
          type="select"
          inline
          options={options?.privilege ?? []}
          error={errors?.privilege?.message}
        />
      ) : (
        <Inputs
          control={control}
          placeholder="Select the fee status"
          label="Change Fee Status"
          name="privilege"
          type="select"
          inline
          options={options?.privilege ?? []}
          error={errors?.privilege?.message}
        />
      )} */}

      <Inputs
        control={control}
        placeholder={
          data.type == 1 ? "Select the project status" : "Select the fee status"
        }
        label={
          data.type == 1 ? "Change Project Status" : "Change Fee Status"
        }
        name={data.type == 1 ? "pStatus" : "feeStatus"}
        type="select"
        inline
        options={
          data.type == 1 ? projectStatus : feeStatus
        }
        error={
          data.type == 1
            ? errors?.pStatus?.message
            : errors?.feeStatus?.message
        }
      />


      <div className="mt-4 space-x-3 text-end">
        <Button
          onClick={close}
          type="button"
          variant="outlined"
          className="min-w-[7rem] rounded-full"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          className="min-w-[7rem] rounded-full"
        >
          Change
        </Button>
      </div>
    </form>
  );
};

export default SingleChange;
