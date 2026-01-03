import { yupResolver } from "@hookform/resolvers/yup";
import { projectSchema } from "../../Projects/AddProject/schema";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import Inputs from "components/Inputs";
import { Button, Card } from "components/ui";
import { GET_OPTIONS } from "../config";
import { deepCleanNulls, post, put, valueSetter } from "utility";
import { toast } from "sonner";
import { useDidUpdate } from "hooks";
// import moment from "moment";
import Image from "components/Image";
import { API_URL } from "constants/app.constant";

const AddProject = ({ data, setRefresh, setData }) => {
  let [selectOptions, setSelectOptions] = useState({});
  let [image, setImage] = useState(null);
  let [isSignature, setIsSignature] = useState(null);
  let [inputReset, setInputReset] = useState(0);
  // let [clientData, setClientData] = useState(null);

  useEffect(() => {
    GET_OPTIONS(setSelectOptions, { client: true }, "client");
    GET_OPTIONS(setSelectOptions, { manager: true }, "manager");
    GET_OPTIONS(setSelectOptions, { partner: true }, "partner");
    GET_OPTIONS(setSelectOptions, { audit: true }, "audit");

    GET_OPTIONS(setSelectOptions, { module: true }, "module");
    // GET_OPTIONS(setSelectOptions, { department: true }, "department");
  }, []);

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      firstName: "",
    },
  });

  useDidUpdate(() => {
    if (data) {
      let uType = data.type;
      let uCompany = data?.company?.value;
      let uBranch = data?.uBranch?.value;


      if (data.image) {
        setImage(`${API_URL}${data.image}`);
      } else {
        setImage(null);
      }

      if (data.signature?.img) {
        setIsSignature(data?.signature?.img);
      } else {
        setIsSignature(null);
      }

      if (uCompany) {
        GET_OPTIONS(setSelectOptions, { "main-branch": true }, "branch", {
          company: uCompany,
        });
      }

      if (uType == 2) {
        GET_OPTIONS(setSelectOptions, { "sub-branch": true }, "subBranch", {
          company: uCompany,
          mainBranch: uBranch,
        });
      }
      if (uType == 3) {
        GET_OPTIONS(setSelectOptions, { franchise: true }, "franchise", {
          company: uCompany,
          mainBranch: uBranch,
        });
      }

      if (uType == 4) {
        GET_OPTIONS(
          setSelectOptions,
          { "collection-center": true },
          "collectionCenter",
          {
            company: uCompany,
            mainBranch: uBranch,
          },
        );
      }

      // if(data.manager ){
      //   const managerId = getPrivilegeId('manager');
      //   const partnerId = getPrivilegeId('partner');        

      //   GET_OPTIONS(setSelectOptions, {user: true}, "partner", {
      //     privilege: partnerId
      //   });

      //   GET_OPTIONS(setSelectOptions, {user: true}, "manager", {
      //     privilege: managerId
      //   });

      // }

      // if(privilegeLabel === 'manager'){
      //   const partnerId = getPrivilegeId('partner');

      //   GET_OPTIONS(setSelectOptions, {user: true}, "partner", {
      //     privilege: partnerId
      //   });

      // }

      let fields = [
        "_id",
        "name",
        "remarks",
        "mobile",
        "email",
        "username",
        "dob",
        "gender",
        "address",
        "referral",
        "pType",
        "year",
        "reviewer",
        {
          field: "privilege",
          path: "privilege.value",
          default: null,
        },
        {
          field: "partner",
          path: "partner.value",
          default: null,
        },
        {
          field: "manager",
          path: "manager.value",
          default: null,
        },
        {
          field: "audit",
          path: "audit.value",
          default: null,
        },
        {
          field: "pStatus",
          path: "pStatus",
          default: null,
        },
        {
          field: "feeStatus",
          path: "feeStatus",
          default: null,
        },
        {
          field: "client",
          path: "client.value",
          default: null,
        },
        {
          field: "module",
          path: "module.value",
          default: null,
        },
        {
          field: "company",
          path: "company.value",
          default: null,
        },
        {
          field: "signature",
          path: "value",
          default: null,
        },
        {
          field: "department",
          path: "department.value",
          default: null,
        },
        "type",
        {
          field: "branch",
          path: "branch.value",
          default: null,
        },
        data.type == 2 && {
          field: "subBranch",
          path: "subBranch.value",
          default: null,
        },
        data.type == 3 && {
          field: "franchise",
          path: "franchise.value",
          default: null,
        },
        data.type == 4 && {
          field: "collectionCenter",
          path: "collectionCenter.value",
          default: null,
        },
      ].filter(Boolean);

      valueSetter({ setValue, data, fields, removeNullValue: true });

      setData(null);
    }
  }, [data]);

  let watchId = watch("_id") || null;
  let company = watch("company") || null;
  let type = watch("type") || null;
  let branch = watch("branch") || null;
  // let client = watch("client") || null;

  let privilege = watch("privilege") || null;

  const getPrivilegeId = (label) => {
    return selectOptions?.privilege?.find(
      (p) => p?.label.toLowerCase() === label.toLowerCase()
    )?.value;
  }

  const privilegeLabel = useMemo(() => {
    return selectOptions?.privilege?.find(
      (p) => p?.value === privilege
    )?.label.toLowerCase()
  }, [privilege, selectOptions]);

  const showPartner = privilegeLabel === 'audit' || privilegeLabel === 'manager';
  const showManager = privilegeLabel === 'audit';

  const handleOnChange = ({ name, value, obj }) => {
    if (name === "signature") {
      setIsSignature(obj?.img ?? null);
    }

    if (name === "privilege") {

      setValue("manager", null);
      setValue("partner", null);

      const privilegeLabel = obj?.label?.toLowerCase();

      if (privilegeLabel === 'audit') {
        const managerId = getPrivilegeId('manager');
        const partnerId = getPrivilegeId('partner');

        GET_OPTIONS(setSelectOptions, { user: true }, "partner", {
          privilege: partnerId
        });

        GET_OPTIONS(setSelectOptions, { user: true }, "manager", {
          privilege: managerId
        });

      }

      if (privilegeLabel === 'manager') {
        const partnerId = getPrivilegeId('partner');

        GET_OPTIONS(setSelectOptions, { user: true }, "partner", {
          privilege: partnerId
        });

      }


    }

    if (name === "client") {
      let client = selectOptions?.client?.find(c => c.value === value);

      setValue("manager", client.manager);
      setValue("partner", client.partner);
      setValue("audit", client.audit);

    }


    if (name === "image") {
      setImage(null);
    }

    if (name === "company") {
      setValue("branch", null);
      setValue("franchise", null);
      setValue("subBranch", null);
      setValue("collectionCenter", null);

      GET_OPTIONS(setSelectOptions, { "main-branch": true }, "branch", {
        company: value,
      });
    }

    if (name === "type") {
      setValue("franchise", null);
      setValue("subBranch", null);
      setValue("collectionCenter", null);

      if (value === 2) {
        GET_OPTIONS(setSelectOptions, { "sub-branch": true }, "subBranch", {
          company: company,
          mainBranch: branch,
        });
      }
      if (value === 3) {
        GET_OPTIONS(setSelectOptions, { franchise: true }, "franchise", {
          company: company,
          mainBranch: branch,
        });
      }
      if (value === 4) {
        GET_OPTIONS(
          setSelectOptions,
          { "collection-center": true },
          "collectionCenter",
          {
            company: company,
            mainBranch: branch,
          },
        );
      }
    }

    if (name === "branch") {
      setValue("franchise", null);
      setValue("subBranch", null);
      setValue("collectionCenter", null);

      if (type === 2) {
        GET_OPTIONS(setSelectOptions, { "sub-branch": true }, "subBranch", {
          company: company,
          mainBranch: value,
        });
      }
      if (type === 3) {
        GET_OPTIONS(setSelectOptions, { franchise: true }, "franchise", {
          company: company,
          mainBranch: value,
        });
      }
      if (type === 4) {
        GET_OPTIONS(
          setSelectOptions,
          { "collection-center": true },
          "collectionCenter",
          {
            company: company,
            mainBranch: value,
          },
        );
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      let obj = { ...data };

      let id = obj?._id;
      let file = obj?.image;
      let res = null;

      delete obj.image;
      delete obj._id;

      obj = deepCleanNulls(obj);

      if (id) {
        res = await put(`project-type?other=${id}`, {
          ...obj,
          imageChanged: image ? false : true,
        });
      } else {
        res = await post("project-type", obj);

      }

      if (res.data?._id && file) {
        let formData = new FormData();
        formData.append("file", file);
        await post(`user/image?other=${res.data?._id}`, formData);
      }

      toast.success(res.message ?? "Project created successfully");

      setRefresh(Date.now());
      handleReset();
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const handleReset = () => {
    reset();
    setInputReset(Date.now());
    setData(null);
    setImage(null);
    setIsSignature(null);
  };


  let inputs = useMemo(
    () => [
      {
        label: "Project Type",
        name: "name",
        type: "text",
        required: true,
      },
      {
        label: "Remarks",
        name: "remarks",
        type: "text",
        required: false,
      },
    ],
    [type, selectOptions, branch, company, watchId, image, inputReset, showManager, showPartner],
  );

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      id="new-analysis-type"
      className="mt-3"
    >
      <Card className="gap-4 p-4 sm:px-5">
        <div className="grid grid-cols-4 place-content-start gap-2 max-lg:grid-cols-2 max-sm:grid-cols-1 sm:gap-5 lg:gap-6">
          {inputs.map((input, idx) => {
            if (input.hide) return null;
            else if (input.join) {
              return (
                <div
                  className="col-span-2 flex -space-x-px max-sm:col-auto"
                  key={idx}
                >
                  <Inputs
                    {...input.left}
                    control={control}
                    placeholder={`${input.left.type === "select" ? "Select" : "Enter"} the ${input.left.label?.toLowerCase()}`}
                    handleOnChange={handleOnChange}
                    classNames={{
                      root: "flex-1",
                      input:
                        "relative hover:z-1 focus:z-1 ltr:rounded-r-none rtl:rounded-l-none",
                    }}
                    error={errors[input.left.name]?.message}
                  />
                  <Inputs
                    {...input.right}
                    control={control}
                    placeholder={`${input.right.type === "select" ? "Select" : "Enter"} the ${input.right.label?.toLowerCase()}`}
                    handleOnChange={handleOnChange}
                    classNames={{
                      root: "flex-1",
                      input:
                        "relative hover:z-1 focus:z-1 ltr:rounded-l-none rtl:rounded-r-none",
                      options: "mt-1",
                    }}
                    error={errors[input.right.name]?.message}
                  />
                </div>
              );
            } else {
              return (
                <Inputs
                  key={idx}
                  {...input}
                  control={control}
                  placeholder={`${input.type === "select" ? "Select" : "Enter"} the ${input.label?.toLowerCase()}`}
                  handleOnChange={handleOnChange}
                  classNames={{ options: "mt-1" }}
                  error={errors[input.name]?.message}
                />
              );
            }
          })}
        </div>

        {isSignature && (
          <Image
            src={isSignature}
            classNames={{ wrapper: "w-22", root: "mt-4 h-14" }}
          />
        )}

        <div className="mt-5 flex items-center justify-start gap-2">
          <Button
            className="min-w-[7rem]"
            color="primary"
            type="submit"
            form="new-analysis-type"
          >
            {watchId ? "Update" : "Create"}
          </Button>
          <Button
            type="reset"
            onClick={handleReset}
            className="min-w-[7rem]"
            variant="outlined"
          >
            {watchId ? "Cancel" : "Reset"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default AddProject;
