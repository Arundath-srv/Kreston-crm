import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "components/ui";
import TwdTable from "components/TwdTable";
import InputBundle from "components/InputBundle";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { get, post } from "utility";
import { toast } from "sonner";
import CustomBadge from "components/CustomBadge";
const schema = yup.object({
  status: yup.string().required(),
  priority: yup.string().required(),
  date: yup.string(),
  comments: yup.string(),
});
const FollowUp = ({ leadId = null }) => {
  const [refresh, setRefresh] = useState(false);
  const [tableData, setTableData] = useState([]);
  const statusOptions = [
    { label: "Interested", value: "interested" },
    { label: "Follow-Up", value: "followup" },
    { label: "Order", value: "order" },
    { label: "Price Approval", value: "priceapproval" },
    { label: "Lost", value: "lost" },
  ];
  const priorityOptions = [
    { label: "Cool", value: "cool" },
    { label: "Warm", value: "warm" },
    { label: "Hot", value: "hot" },
  ];
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leadId,
      status: "",
      priority: "",
      nextFollowup: "",
      remarks: "",
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (leadId) fetchFollowUpData(leadId);
  }, [leadId, refresh]);
  const tableConfig = useMemo(() => {
    const displayRows = tableData.length > 0
      ? tableData
      : [{
        date: "25-11-2025",
        time: "04:00 PM",
        nextfollowup: "25-12-2022",
        remarks: "No follow-recorded yet.",
        status: <CustomBadge color="gray" title="" />,
        addedBy: "John",
      }];
    return {
      columns: [
        { label: "Date", field: "date", type: "date", enableSorting: true },
        { label: "Time", field: "time", type: "text", enableSorting: true },
        { label: "Next Followup", field: "nextfollowup", type: "date" },
        { label: "Remarks", field: "remarks" },
        { label: "Status", field: "status", type: "tags" },
        { label: "Added By", field: "addedBy" },
      ],
      rows: displayRows,
    };
  }, [tableData]);
  const fetchFollowUpData = async (id) => {
    const response = await get(`leads/follow-up/${id}`);
    let data = response?.data || [];
    data = data.map((item) => ({
      date: item?.date,
      time: item?.time,
      nextfollowup: item?.nextFollowup,
      remkarks: item?.remarks,
      status: (
        <CustomBadge
          color={item?.followupStatus?.color}
          title={item?.followupStatus?.name}
        />
      ),
      addedBy: `${item?.addedBy?.firstName} ${item?.addedBy?.lastName}`,
    }));
    setTableData(data);
  };
  const onSubmit = useCallback(async (data) => {
    try {
      const response = await post("leads/follow-up", data);
      toast.success(response.message ?? "Follow-up added successfully");
      reset();
      setRefresh((pre) => !pre);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  }, []);
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        id="lead-followup"
        className="mt-3"
      >
        <div className="my-3 mt-6 grid grid-cols-4 gap-2 max-lg:grid-cols-2 max-sm:grid-cols-1 sm:gap-5 lg:gap-6">
          <InputBundle
            type="select"
            options={statusOptions}
            control={control}
            required={true}
            placeholder={`Select status`}
            name={"status"}
            label={"Status"}
            error={errors?.status?.message}
          />

          <InputBundle
            type="select"
            options={priorityOptions}
            control={control}
            required={true}
            placeholder={`Select priority`}
            name={"priority"}
            label={"Priority"}
            error={errors?.priority?.message}
          />

          <InputBundle
            type="date"
            control={control}
            placeholder={`Choose the date`}
            name={"nextFollowup"}
            label={"Follow Up Date"}
            error={errors?.date?.message}
          />

          <InputBundle
            type="text"
            control={control}
            placeholder={`Enter the remarks`}
            name={"remarks"}
            label={"Remarks"}
            error={errors?.remarks?.message}
          />
        </div>

        <div className="my-3 mt-6 flex items-center gap-2">
          <Button className="min-w-[7rem]" color="primary" type="submit">
            Create
          </Button>
          <Button
            type="reset"
            onClick={() => reset()}
            className="min-w-[7rem]"
            variant="outlined"
          >
            Reset
          </Button>
        </div>
      </form>
      <hr className="mt-5" />
      <TwdTable searchable={false} data={tableConfig} count={0} selectable={false} />
    </>
  );
};

export default FollowUp;