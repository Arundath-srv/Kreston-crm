/* eslint-disable */

import React, { memo, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Button, Card } from "components/ui";
import * as yup from "yup";
import { useParams } from "react-router";
import { get, put } from "utility";
import { toast } from "sonner";
import Inputs from "components/Inputs";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .test(
      "has-letters",
      "First name must contain at least one letter",
      (value) => value && /[a-zA-Z]/.test(value.trim())
    ),
  lastName: yup
    .string()
    .nullable()
    .test(
      "has-letters-if-filled",
      "Last name must contain letters if provided",
      (value) => !value || /[a-zA-Z]/.test(value.trim())
    ),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: yup
    .string()
    // .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  landline: yup
    .string()
    .nullable()
    .test(
      "is-numeric-or-empty",
      "Landline must be numeric if provided",
      (value) => !value || /^\d+$/.test(value.trim())
    ),
  address: yup.string().nullable(),
  city: yup
    .string()
    .required("Location is required")
    .test(
      "has-letters",
      "Location must contain at least one letter",
      (value) => value && /[a-zA-Z]/.test(value.trim())
    ),
});

const Profile = ({ onProfileUpdate }) => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const abortControllerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (!id) {
      setProfileData(null);
      return;
    }

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await get(`/client/singleclient/${id}`);        

        if (res?.success && res?.data) {
          const client = res.data;
          const mappedData = {
            firstName: client.firstName || "",
            lastName: client.lastName || "",
            email: client.email || "",
            mobile: client.mobile || "",
            landline: client.landline || "",
            address: client.address || "",
            city: client.location || "",
            uniqueId: client.uniqueId || "",
          };
          setProfileData(mappedData);
          reset(mappedData);
        } else {
          setProfileData(null);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch client profile:", err);
          setProfileData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    return () => controller.abort();
  }, [id, reset]);

  const onSubmit = async (formData) => {
    if (!id) {
      toast.error("Customer ID is missing.");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = { ...formData, location: formData.city, uniqueId: id };
      const res = await put(`/client/updatecustomer/${id}`, payload);

      if (res.success) {
        toast.success("Customer profile updated successfully!");

        const freshRes = await get(`/client/singleclient/${id}`);
        if (freshRes?.success && freshRes?.data?.length) {
          const client = freshRes.data[0];
          const freshData = {
            firstName: client.firstName || "",
            lastName: client.lastName || "",
            email: client.email || "",
            mobile: client.mobile || "",
            landline: client.landline || "",
            address: client.address || "",
            city: client.location || "",
            uniqueId: client.uniqueId || "",
          };
          setProfileData(freshData);
          reset(freshData);
        }

        if (typeof onProfileUpdate === "function") onProfileUpdate();
      } else {
        toast.error(res.message || "Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Mobile number already exists");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (profileData) reset(profileData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  if (!profileData) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Profile Information
      </h2>

      {profileData?.uniqueId && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Customer ID:
          </span>{" "}
          <span className="font-mono">{profileData.uniqueId}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} id="profile-form">
        <Card className="gap-4 p-4 sm:px-5">
          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 sm:gap-5 lg:gap-6">
            {[
              { name: "First Name", field: "firstName", type: "text", required: true },
              { name: "Last Name", field: "lastName", type: "text" },
              { name: "Email", field: "email", type: "email" },
              { name: "Mobile No", field: "mobile", type: "tel", required: true },
              // { name: "Landline No", field: "landline", type: "tel" },
              // {name:"Location",field:"city",type:"text",required:true},
              { name: "Address", field: "address", type: "text" },
            ].map((input, idx) => (
              <Inputs
                key={idx}
                type={input.type}
                name={input.field}
                control={control}
                label={input.name}
                required={input.required}
                placeholder={`Enter the ${input.name?.toLowerCase()}`}
                {...(!["select", "date"].includes(input.type) &&
                  register(input.field))}
                error={errors[input?.field]?.message}
              />
            ))}

            <div
              className={clsx(
                "mt-6 flex items-center justify-start gap-2 col-span-full",
                Object.keys(errors)?.length > 0 && "!mb-5"
              )}
            >
              <Button
                className="min-w-[7rem]"
                color="primary"
                type="submit"
                form="profile-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                className="min-w-[7rem]"
                variant="outlined"
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default memo(Profile);