//add user page
import * as React from "react";
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "@/components/ui/phone-input";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parsePhoneNumber } from "libphonenumber-js";
const today = new Date();
const userSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  contactDetails: z.object({
    dialingCode: z.string().min(1, "Country code is required."),
    phone: z.string().min(1, "Phone number is required."),
  }),
  emailAddress: z.string().email("Email address required"),
  company: z.string().min(2, "Organization is required."),
  designation: z.string(),
  joiningDate: z.date().optional().refine(date => date != null, {
    message: "Joining Date is required"
  }),
  status: z.enum(["active", "inactive"]),
});

const handlePhoneChange = (formHandler) => {
  const phoneNumber = formHandler.getValues("contactDetails.phone");
  if (phoneNumber) {
    try {
      const parsedNumber = parsePhoneNumber(phoneNumber);
      formHandler.setValue("contactDetails.dialingCode", parsedNumber.countryCallingCode);
      formHandler.setValue("contactDetails.phone", parsedNumber.formatInternational());
    } catch (error) {
      console.error("Invalid phone number", error);
    }
  }
};

function UserAddPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
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
      company: "",
      designation: "",
      joiningDate: undefined,
      status: "active",
    },
  });

  const { handleSubmit, reset, watch, formState, setValue, clearErrors } = formInstance;
  const observedStatus = watch("status");

  useEffect(() => {
    handlePhoneChange(formInstance);
  }, [formInstance]);

  const handleFormSubmit = (data) => {
    console.log(data);
    if (autoGeneratePassword){
      setIsDialogOpen(true);
    } else {
      reset({
        fullName: "",
        contactDetails: {
          dialingCode: "",
          phone: "",
        },
        emailAddress: "",
        company: "",
        designation: "",
        joiningDate: undefined,
        status: "active",
      });
      setSelectedDate(undefined);
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
      <div className="tw-mt-8 tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-border tw-w-[800px] tw-h-[550px] tw-border-gray-300">
        <Form {...formInstance}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="tw-w-[616px] tw-h-[176px]">
              <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px]">
                  <FormLabel className="tw-block tw-text-[12px] tw-mb-1 tw-font-medium tw-text-left tw-text-[#030303]">
                    Full Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-black"
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
                        <FormLabel htmlFor="phoneNumber" className="tw-block tw-font-medium tw-text-left tw-text-black tw-mt-2">
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
                              handlePhoneChange(formInstance);
                            }}
                            defaultCountry="IN"
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

              <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-5">
                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-bg-white">
                  <FormLabel className="tw-block tw-mb-1 tw-font-medium tw-text-left tw-text-black">
                    Email ID
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="yourname@gmail.com"
                    className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-black"
                    {...formInstance.register("emailAddress")}
                    onChange={() => clearErrors("emailAddress")}
                  />
                  <FormMessage className="tw-text-red-500">
                    {formState.errors.emailAddress?.message?.toString()}
                  </FormMessage>
                </div>
                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-ml-14 tw-mt-[-5.2px]">
                  <Popover>
                  <FormLabel htmlFor="phoneNumber" className="tw-block  tw-mb-1 tw-text-[10px] tw-text-left tw-text-black tw-mt-1">
                          Joining Date
                        </FormLabel>
                    <PopoverTrigger asChild>
                    <Button
  variant={"outline"}
  className="tw-w-[337px] tw-h-[40px] tw-radius-[4px] tw-gap-[180px]  tw-text-black"
>
  {selectedDate ? format(selectedDate, "dd/MM/yyyy") : format(today, "dd/MM/yyyy")}
  <CalendarIcon className="tw-mr-1 tw-h-4 tw-w-4" />
</Button>
                    </PopoverTrigger>
                    <PopoverContent className="tw-w-auto tw-p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date || null);
                          setValue("joiningDate", date || null, { shouldValidate: true });
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                    <FormMessage className="tw-text-red-500">
                    {formState.errors.joiningDate?.message?.toString()}
                    </FormMessage>
                  </Popover>
                </div>

              </div>

              <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-7">
                <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-mt-4">
                  <FormLabel className="tw-block tw-text-[12px] tw-mb-1 tw-font-medium tw-text-left tw-text-black">
                    Organization
                  </FormLabel>
                  <Select
  {...formInstance.register("company")}
  value={formInstance.getValues("company") || ""}
  onValueChange={(value) => {
    formInstance.setValue("company", value);
    clearErrors("company");
  }}
>
  <SelectTrigger className="tw-bg-white tw-h-[40px] tw-w-[330px] tw-text-primary">
    <SelectValue placeholder="Organization Name" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="organization1">Organization 1</SelectItem>
    <SelectItem value="organization2">Organization 2</SelectItem>
    <SelectItem value="organization3">Organization 3</SelectItem>
  </SelectContent>
</Select>

                  <FormMessage className="tw-text-red-500">
                    {formState.errors.company?.message?.toString()}
                  </FormMessage>
                </div>
                <div className="tw-ml-14 tw-mt-4 tw-w-[340px]">
                  <FormLabel className="tw-block tw-mb-1 tw-text-[12px] tw-font-medium tw-text-left tw-text-black">
                    Assign Role
                  </FormLabel>
                  <FormField
                    control={formInstance.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select {...field} value={field.value || ""} onValueChange={field.onChange}>
                            <SelectTrigger className="tw-bg-white tw-h-[40px] tw-w-[330px] tw-text-primary">
                              <SelectValue placeholder="Admin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="super-admin">Super Admin</SelectItem>
                              <SelectItem value="faculty">Faculty</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage>
                          {formState.errors.designation?.message?.toString()}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="tw-flex tw-items-center tw-space-x-3 tw-mt-[110px]">
              <div className="tw-w-[600px] tw-flex tw-gap-[8px]">
              <Checkbox
  id="autoGeneratePassword"
  checked={autoGeneratePassword}
  onCheckedChange={(checked) => {
    if (typeof checked === 'boolean') {
      setAutoGeneratePassword(checked);
    }
  }}
  className="tw-mr-2"
/>
    <FormLabel htmlFor="autoGeneratePassword" className="tw-text-[12px] tw-w-[410px] tw-font-medium tw-leading-[24px] tw-text-black">
                  Generate new password and notify user immediately
              </FormLabel>
              </div>
              <div className="tw-flex tw-gap-4">
                <FormField
                  control={formInstance.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="tw-flex tw-items-center tw-gap-2">
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <div className="tw-flex  tw-mr-[70px] tw-gap-3 tw-ml-1">
                            <RadioGroupItem
                              value="active"
                              id="active"
                              className="tw-rounded tw-border-gray-300 tw-text-blue-600 tw-focus:ring-blue-500"
                            />
                            <label htmlFor="active">Active</label>
                            <RadioGroupItem
                              value="inactive"
                              id="inactive"
                              className="tw-rounded tw-border-gray-300 tw-text-blue-600 tw-focus:ring-blue-500"
                            />
                            <label htmlFor="inactive">Inactive</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="tw-flex tw-justify-between tw-items-center tw-mt-8">
              <p className="tw-text-[13px] tw-text-primary tw-w-[251px] tw-h-[20px] tw-top-[300px] tw-left-[26px] tw-mt-1">
                All fields are mandatory*
              </p>
            </div>
            <div className="tw-mt-4">
              <Separator className="tw-border-t tw-border-gray-300 tw-w-[700px]" />
            </div>
            <Button
              type="submit"
              variant="default"
              className="tw-bg-primary tw-text-white tw-rounded-md tw-px-4 tw-py-2 tw-mt-8"
            >
              Submit
            </Button>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <AlertDialogContent className="tw-w-[333px] tw-h-[244px] tw-px-6 tw-py-4 tw-flex tw-flex-col tw-items-center">
    <div className="tw-ml-[280px]">
  <X size={15} className="tw-text-gray-500 tw-cursor-pointer" onClick={closeAlertDialog} />
  </div>
    <div className="tw-ml-[108px]">
    <CircleCheck className="tw-text-green-500" size={60} />
    </div>
    <AlertDialogHeader className="tw-mt-[-20px] tw-text-center">
      <AlertDialogTitle className="tw-text-lg tw-text-center tw-font-semibold">Completed</AlertDialogTitle>
      <AlertDialogDescription className="tw-text-center tw-text-sm tw-mt-2">
        We will share a link at <span className="tw-font-bold">username@gmail.com</span>. 
        User can click the link to reset password.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="tw-w-full tw-pt-0 tw-ml-[-69px] ">
      <AlertDialogAction
        onClick={closeAlertDialog}
        className="tw-bg-blue-500 tw-text-white tw-w-[150px] tw-h-[38px] tw-ml-5 tw-rounded-md tw-text-center"
      >
        Continue
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</form>
        </Form>
      </div>
    </>
  );
}

export default UserAddPage;