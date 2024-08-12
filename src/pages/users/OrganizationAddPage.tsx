//add Organization                                                                                                                                     import * as React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleCheck } from 'lucide-react';
import { X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { parsePhoneNumber } from "libphonenumber-js";
import { Separator } from "@/components/ui/separator"


// Form schema definition
const userSchema = z.object({
  fullName: z.string().min(2, "First Name is required"),
  contactDetails: z.object({
    dialingCode: z.string().min(1, "Country code is required."),
    phone: z.string().min(1, "Phone number is required."),
  }),
  emailAddress: z.string().email("Email address required"),
  organizationId: z.string().min(2, "Organization ID is required."),
  address: z.string().min(2, "Address is required."),
  state: z.string().min(2, "State is required."),
  pincode: z.string().min(4, "Pincode is required."),
  // status: z.enum(["active", "inactive"]),
});

// Phone number handling
const handlePhoneChange = (formHandler) => {
  const phoneNumber = formHandler.getValues("contactDetails.phone");
  if (phoneNumber) {
    try {
      const parsedNumber = parsePhoneNumber(phoneNumber);
      formHandler.setValue("contactDetails.dialingCode", parsedNumber.countryCallingCode);
      formHandler.setValue("contactDetails.phone", parsedNumber.formatInternational()); // Retain international format
    } catch (error) {
      console.error("Invalid phone number", error);
    }
  }
};

function UserAddPage() {
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(false);

  const formInstance = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      contactDetails: {
        dialingCode: "",
        phone: "",
      },
      emailAddress: "",
      organizationId: "",
      address: "",
      pincode: "",
      state:"",
      // status: "active",
    },
  });

  const { handleSubmit, reset, watch, formState, setValue, clearErrors } = formInstance;
  // const observedStatus = watch("status");

  useEffect(() => {
    handlePhoneChange(formInstance);
  }, [formInstance]);

  const handleFormSubmit = (data) => {
    console.log(data);
    if (autoGeneratePassword) {
      setIsDialogOpen(true);
    } else {
      reset({
        fullName: "",
        contactDetails: {
          dialingCode: "",
          phone: "",
        },
        emailAddress: "",
        organizationId: "",
        address: "",
        pincode: "",
        state:"",
      });
      // setSelectedDate(undefined);
      setAutoGeneratePassword(false);
    }
  };

  const closeAlertDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <p className="tw-h-[7px] tw-w-[560px] tw-top-[120px] tw-left-[234px] tw-text-extend tw-text-[10px] tw-text-[#4B4B4B]">
        User profiles store information about users. You can update user information later by clicking on the user profile.
      </p>
      <div className="tw-mt-4">
        <a href="#" className="tw-text-primary tw-underline tw-w-[200px] tw-text-[14px]">Data Import/Export</a>
      </div>
      <div className="tw-mt-8 tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-border tw-w-[770px] tw-h-[470px] tw-border-gray-300">
        <Form {...formInstance}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="tw-w-[616px] tw-h-[176px]">
              <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px]">
                  <FormLabel className="tw-block tw-text-[12px] tw-mb-1 tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                    Full Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#070707]"
                    {...formInstance.register("fullName")}
                    onChange={() => clearErrors("fullName")}
                  />
                  <FormMessage className="tw-text-red-500">
                    {formState.errors.fullName?.message?.toString()}
                  </FormMessage>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-[8px] tw-ml-14 tw-w-[340px] tw-mt-[-8px]">
                  <FormField
                    control={formInstance.control}
                    name="contactDetails.phone"
                    render={({ field }) => (
                      <FormItem className="tw-w-full">
                        <FormLabel htmlFor="phoneNumber" className="tw-block tw-text-[10px] tw-font-medium tw-font-extend tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303] tw-mt-2">
                          Phone Number
                        </FormLabel>
                        <FormControl className="tw-w-full">
                          <PhoneInput
                            international
                            id="phoneNumber"
                            placeholder="Enter a phone number"
                            className="tw-w-[330px] tw-h-[40px] tw-mt-1"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              clearErrors("contactDetails.phone");
                            }}
                            onBlur={() => {
                              handlePhoneChange(formInstance); // Ensure the flag and country code are retained
                            }}
                            defaultCountry="IN" // You can set a default country
                          />
                        </FormControl>
                        <FormMessage className="tw-text-red-500">
                          {formState.errors.contactDetails?.phone?.message?.toString()}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4">
                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-bg-white">
                  <FormLabel className="tw-block tw-text-[12px]  tw-mb-1 tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                    Email ID
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="yourname@gmail.com"
                    className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#020202]"
                    {...formInstance.register("emailAddress")}
                    onChange={() => clearErrors("emailAddress")}
                  />
                  <FormMessage className="tw-text-red-500">
                    {formState.errors.emailAddress?.message?.toString()}
                  </FormMessage>
                </div>
                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-ml-14 tw-mt-[-1px]">
                  <FormLabel className="tw-block tw-text-[12px]  tw-mb-1 tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                    Organization ID
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Organization ID"
                    className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#070707]"
                    {...formInstance.register("organizationId")}
                    onChange={() => clearErrors("organizationId")}
                  />
                  <FormMessage className="tw-text-red-500">
                    {formState.errors.organizationId?.message?.toString()}
                  </FormMessage>
                </div>
              </div>

              <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-8">
                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-bg-white">
                  <FormLabel className="tw-block tw-text-[12px]  tw-mb-1 tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                    State
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Andhra Pradesh"
                    className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#070707]"
                    {...formInstance.register("state")}
                    onChange={() => clearErrors("state")}
                  />
                  <FormMessage className="tw-text-red-500">
                    {formState.errors.state?.message?.toString()}
                  </FormMessage>
                </div>

                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-bg-white tw-ml-[53px]">
                  <FormLabel className="tw-block tw-text-[12px]  tw-mb-1 tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                    Address
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Address"
                    className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#070707]"
                    {...formInstance.register("address")}
                    onChange={() => clearErrors("address")}
                  />
                  <FormMessage className="tw-text-red-500">
                    {formState.errors.address?.message?.toString()}
                  </FormMessage>
                </div>
              </div>
              <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-ml-[1px] tw-mt-7">
                <FormLabel className="tw-block tw-text-[12px]  tw-mb-1 tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                  Pincode
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Pincode"
                  className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#070707]"
                  {...formInstance.register("pincode")}
                  onChange={() => clearErrors("pincode")}
                />
                <FormMessage className="tw-text-red-500">
                  {formState.errors.pincode?.message?.toString()}
                </FormMessage>
              </div>

              <div className="tw-flex tw-items-center tw-space-x-3 tw-mt-[30px]">
                <div className="tw-w-[600px] tw-flex tw-gap-[8px]">
                  <Checkbox
                    id="autoGeneratePassword"
                    checked={autoGeneratePassword}
                    onCheckedChange={(checked) => setAutoGeneratePassword(checked)}
                    className="tw-mr-2"
                  />
                  <FormLabel htmlFor="autoGeneratePassword" className="tw-text-[12px] tw-w-[410px] tw-font-medium tw-leading-[24px] tw-text-[#0a0a0a]">
                    Organization Created in GitHub
                  </FormLabel>
                </div>
              </div>
              <div className="tw-flex tw-justify-between tw-items-center tw-mt-2">
                <p className="tw-text-[13px] tw-text-primary tw-italic tw-w-[251px] tw-h-[20px] tw-top-[300px] tw-left-[26px] tw-mt-1">
                  All fields are mandatory*
                </p>
              </div>

              <div className="tw-mt-2">
                {/* <hr className="tw-border-t tw-border-gray-300 tw-w-[700px]" /> */}
                <Separator className="tw-border-t tw-border-gray-300 tw-w-[710px]" />
              </div>
              <div className="tw-mt-[10px]">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </Form>
                    {/* <div className="tw-w-[1000px]"> */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="tw-w-[280px] tw-h-[240px]">
          <div className="tw-ml-[210px]">
                  <X size={16} className="tw-text-gray-500 tw-cursor-pointer " onClick={closeAlertDialog} />
                </div>
                <div className="tw-ml-[90px] tw-mt-[-15px]">
                  <CircleCheck className="tw-text-green-500" size={60} />
                </div>
            <AlertDialogHeader className="tw-mt-[-20px] tw-text-center">
              <AlertDialogTitle className="tw-text-lg tw-ml-[80px] tw-mt-2 tw-font-semibold">Completed</AlertDialogTitle>
              <AlertDialogDescription className="tw-text-center tw-text-sm tw-mt-2 tw-w-[250px]">
                We have successfully registered the organization details
                {/* User can click the link to reset the password. */}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="tw-w-[200px] tw-pt-0 tw-ml-[10px]">
              <AlertDialogAction
                onClick={closeAlertDialog}
                className="tw-bg-blue-500 tw-text-white tw-w-[150px] tw-mt-[-8px] tw-h-[38px] tw-mr-[18px] tw-rounded-md tw-text-center"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* </div> */}
      </div>
    </>
  );
}

export default UserAddPage;