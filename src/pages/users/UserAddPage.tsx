import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "@/components/ui/phone-input";
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
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form schema definition
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  contactPhoneNumber: z.object({
    countryCode: z.string().min(1, {
      message: "Country code is required.",
    }),
    number: z.string().min(10, {
      message: "Contact number must be at least 10 digits.",
    }),
  }),
  active: z.boolean(),
  inactive: z.boolean(),
});

const handlePhoneChange = () => {
  const number = form.getValues("contactPhoneNumber.number");
  if (isValidPhoneNumber(number)) {
    const phoneNumber = parsePhoneNumber(number);
    form.setValue("contactPhoneNumber.countryCode", +phoneNumber.countryCallingCode);
    form.setValue("contactPhoneNumber.number", phoneNumber.nationalNumber);
  }
};

function UserAddPage() {
  const [date, setDate] = React.useState<Date>();

  // Initialize form with react-hook-form and zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      contactPhoneNumber: {
        countryCode: "",
        number: "",
      },
      active: false,
      inactive: false,
    },
  });

  const watchActive = form.watch("active");
  const watchInactive = form.watch("inactive");

  React.useEffect(() => {
    if (watchActive && watchInactive) {
      form.setValue("inactive", false);
    }
  }, [watchActive, watchInactive, form]);

  return (
    <>
      <p className="tw-h-[7px] tw-w-[560px] tw-top-[120px] tw-left-[234px] tw-text-extend tw-text-[10px] tw-text-[#4B4B4B]">
        User profiles store information about users. You can update user information later by clicking on the user profile.
      </p>
      <div className="tw-mt-4">
        <a href="#" className="tw-text-primary tw-underline tw-w-[200px] tw-text-[14px]">Data Import/Export</a>
      </div>
      <div className="tw-mt-8 tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-border tw-w-[770px] tw-h-[413px] tw-border-gray-300">
        {/* <hr className="tw-mt-2 tw-border-t tw-border-gray-300 tw-w-[700px] tw-pb-4" /> */}
        <Form {...form}>
          <div className="tw-w-[616px] tw-h-[176px]">
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px]">
                <label className="tw-block tw-text-[12px] tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#BDBDBD]"
                  {...form.register("username")}
                />
              </div>
              <div className="tw-flex tw-flex-col tw-gap-[8px] tw-ml-14 tw-w-[340px]">
                <FormField
                  control={form.control}
                  name="contactPhoneNumber.number"
                  render={({ field }) => (
                    <FormItem className="tw-w-full">
                      <FormLabel htmlFor="number" className="tw-block tw-text-[10px] tw-font-medium tw-font-extend tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303] tw-mt-1">Phone Number</FormLabel>
                      <FormControl className="tw-w-full">
                        <div className="tw-w-[340px] tw-h-[30px] tw-radius-[4px] tw-text-[#020202]">
                        <PhoneInput
                          international
                          initialValueFormat="international"
                          id="number"
                          placeholder="Enter a phone number"
                          className="tw-w-[330px] tw-h-[30px] tw-mt-2"
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          onBlur={handlePhoneChange}
                        />
                        </div>
                      </FormControl>
                      <FormMessage>{form.formState.errors.contactPhoneNumber?.number?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4">
              <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px]">
                <label className="tw-block tw-text-[12px] tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                  Email ID
                </label>
                <Input
                  type="email"
                  placeholder="yourname@gmail.com"
                  className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#020202]"
                />
              </div>
              <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-ml-14">
                <Popover>
                  <label className="tw-block tw-text-[12px] tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#050505]">
                    Joining Date
                  </label>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#0f0f0f]"
                    >
                      <CalendarIcon className="tw-mr-2 tw-h-4 tw-w-4" />
                      {date ? format(date, "dd/MM/yyyy") : "Select Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="tw-w-auto tw-p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4">
              <div className="tw-w-[340px] tw-h-[46px] tw-gap-[8px] tw-mt-2">
                <label className="tw-block tw-text-[12px] tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303]">
                  Organization
                </label>
                <Input
                  type="text"
                  placeholder="XYZ College"
                  className="tw-w-[330px] tw-h-[40px] tw-radius-[4px] tw-text-[#BDBDBD]"
                />
              </div>
              <div className="tw-ml-14 tw-mt-2 tw-w-[340px]">
                <label className="tw-block tw-text-[12px] tw-font-medium tw-leading-[24px] tw-tracking-[-0.025em] tw-text-left tw-text-[#030303] ">
                  Assign Role
                </label>
                <Select>
                  <SelectTrigger className="tw-bg-white tw-h-[40px] tw-w-[330px] tw-text-primary">
                    <SelectValue placeholder="Admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-items-center tw-space-x-4 tw-mt-14">
            <div className="tw-w-[346px] tw-flex tw-gap-[8px]">
              <input
                type="checkbox"
                className="tw-rounded tw-border-gray-300 tw-text-blue-600 tw-focus:ring-blue-500 tw-w-[16px] tw-h-[16px]"
              />
              <span className="tw-w-[322px] tw-text-[12px] tw-font-normal tw-leading-[20px]">
                Generate new password and notify user immediately
              </span>
            </div>

            <div className="tw-flex tw-gap-4">
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="tw-flex tw-items-center tw-gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked || false);
                          if (checked) form.setValue("inactive", false);
                        }}
                      />
                    </FormControl>
                    <p className="tw-text-[13px]">Active</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inactive"
                render={({ field }) => (
                  <FormItem className="tw-flex tw-items-center tw-gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked || false);
                          if (checked) form.setValue("active", false);
                        }}
                      />
                    </FormControl>
                    <p className="tw-text-[13px]">Inactive</p>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="tw-flex tw-justify-between tw-items-center tw-mt-5">
            <p className="tw-text-[13px] tw-text-primary tw-italic tw-w-[251px] tw-h-[20px] tw-top-[300px] tw-left-[26px] tw-mt-1">
              All fields are mandatory*
            </p>
          </div>
          <div className="tw-mt-2">
            <hr className="tw-border-t tw-border-gray-300 tw-w-[700px]" />
          </div>
          <Button
            variant="default"
            className="tw-bg-primary tw-text-white tw-rounded-md tw-px-4 tw-py-2 tw-mt-5"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UserAddPage;
