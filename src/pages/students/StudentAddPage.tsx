import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { format,getYear } from "date-fns";
import 'react-calendar/dist/Calendar.css';
import { Calendar as ReactCalendar, CalendarProps } from 'react-calendar';
import { Calendar as CalendarIcon } from "lucide-react";
import { Search } from "lucide-react";
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

// Dummy data for programs and courses
const dummyData = [
  { id: 1, name: "Java" },
  { id: 2, name: "React" },
  { id: 3, name: "SQL" },
  { id: 4, name: "Web Development" },
  { id: 5, name: "Advance Java" },
];


// Form schema definition
const userSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  fullName: z.string().min(2, "Full Name is required"),
 
  primaryEmailId: z.string().email("Primary Email ID is required"),
  institutionEmailId: z.string().optional(),
  contactDetails: z.object({
    dialingCode: z.string().min(1, "Country code is required."),
    phone: z.string().min(1, "Phone number is required."),
  }),
  dob: z.date().optional().refine(date => date != null, {
    message: "Date of Birth is required"
  }),
  batch: z.string().min(1, "Batch is required"),
  organization: z.string().min(2, "Organization is required."),
  apsche: z.enum(["Yes", "No"]),
  status: z.enum(["active", "inactive"]),
  // gender: z.enum(["Male", "Female", "Other"]),
  gender: z.string().min(1, "gender is required"),
});

function UserAddPage() {
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'year'>('month');
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const filteredData = dummyData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.name !== selectedCourse // Exclude selected course
  );
  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setValue('dob', date, { shouldValidate: true }); // Update the form value and trigger validation
      setView('month'); // Switch back to month view after selecting a date
    }
  };
  const handleCalendarChange = (value: Date | Date[] | null) => {
    if (Array.isArray(value)) {
      console.warn('Range selection is not supported for this picker.');
    } else {
      handleDateSelect(value);
    }
  };

  const formInstance = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      studentId: "",
      fullName: "",
      gender: "Male",
      primaryEmailId: "",
      institutionEmailId: "",
      contactDetails: {
        dialingCode: "",
        phone: "",
      },
      dob: null,
      batch: "",
      organization: "",
      apsche: "Yes",
      status: "active",
    },
  });

  const { handleSubmit, reset, watch, formState, setValue, clearErrors } = formInstance;
  const observedStatus = watch("status");

  useEffect(() => {
    handlePhoneChange(formInstance);
  }, [formInstance]);

  const handleFormSubmit = (data) => {
    if (selectedCourse) {
      console.log(data);
          if (autoGeneratePassword){
            setIsDialogOpen(true);
           } else {
                reset({
                  studentId: "",
                  fullName: "",
                  gender: " Male",
                  primaryEmailId: "",
                  institutionEmailId: "",
                  contactDetails: {
                    dialingCode: "",
                    phone: "",
                  },
                  dob: null,
                  batch: "",
                  organization: "",
                  apsche: "Yes",
                  status: "active",
                });
                setSelectedDate(undefined);
                setAutoGeneratePassword(false);
                setSelectedCourse("");
              }
     
       // Clear selected course after submission
    } else {
      alert("Please select a course.");
    }
  };
  const closeAlertDialog = () => {
    setIsDialogOpen(false);
  };


  
  return (
    <>
    <div>
    <p className="tw-h-[7px] tw-w-full tw-top-[120px] tw-left-[234px] tw-text-extend tw-text-[10px] tw-text-[#4B4B4B]">
  Student profiles store information about users. You can update a student's information later by clicking on the student profile, which will bring up this same screen.
</p>
<div className="tw-mt-4">
  <a href="#" className="tw-text-primary tw-underline tw-w-[200px] tw-text-[14px]">Data Import/Export</a>
</div>
<div className="tw-mt-3 tw-h-[90px] tw-bg-white tw-w-[770px] tw-rounded-lg">
  <p className="tw-text-black tw-text-[14px] tw-ml-6 tw-pt-4 tw-text-semi-bold">Tag Course Or Program</p>
  <div className="tw-relative tw-flex tw-items-center tw-h-[40px]  tw-w-[400px] tw-left-5">
    <Search className="tw-absolute tw-left-4 tw-text-primary tw-size-4" />
    <Input
      type="text"
      placeholder="Search Course or Program"
      className="tw-pl-10 tw-w-[390px] tw-h-[40px] tw-rounded-[5px] tw-border tw-border-primary tw-text-[#020202] focus:tw-outline-none"
      value={selectedCourse || searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setSelectedCourse(null); 
      }}
    />


  </div>
  {!selectedCourse && (
            <ul className="tw-ml-10 tw-mt-2">
              {searchTerm && filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <li
                    key={item.id}
                    className="tw-text-black tw-text-[14px] tw-cursor-pointer"
                    onClick={() => {
                      setSelectedCourse(item.name);
                      setSearchTerm('');
                    }}
                  >
                    {item.name}
                  </li>
                ))
              ) : searchTerm ? (
                <li className="tw-text-gray-500 tw-text-[14px]">No results found</li>
              ) : null}
            </ul>
          )}




      </div>
      <div className="tw-mt-4 tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-border tw-w-[770px] tw-h-[700px] tw-border-gray-300">
        <Form {...formInstance}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px]">Student ID</FormLabel>
                <Input
                  type="text"
                  placeholder="AB12456"
                  {...formInstance.register("studentId")}
                />
                <FormMessage className="tw-text-red-500">
                  {formState.errors.studentId?.message?.toString()}
                </FormMessage>
              </div>

        
              <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px]">Gender</FormLabel>
                <Input
                  type="text"
                  placeholder="Gender"
                  {...formInstance.register("organization")}
                />
                <FormMessage className="tw-text-red-500">
                  {formState.errors.gender?.message?.toString()}
                </FormMessage>
              </div>
            </div>

            <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4">
              <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px]">Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...formInstance.register("fullName")}
                />
                <FormMessage className="tw-text-red-500">
                  {formState.errors.fullName?.message?.toString()}
                </FormMessage>
              </div>

              <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px]">Primary Email ID</FormLabel>
                <Input
                  type="email"
                  placeholder="yourname@gmail.com"
                  {...formInstance.register("primaryEmailId")}
                />
                <FormMessage className="tw-text-red-500">
                  {formState.errors.primaryEmailId?.message?.toString()}
                </FormMessage>
              </div>
            </div>

            <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4">
              <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px]">Institution Email ID (Optional)</FormLabel>
                <Input
                  type="email"
                  placeholder="yourname@institution.com"
                  {...formInstance.register("institutionEmailId")}
                />
              </div>

              
              <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px]">DOB</FormLabel>
                <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="tw-w-full">
          {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Select Date'}
          <CalendarIcon className= "tw-ml-[195px] tw-h-4 tw-w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ReactCalendar
          onChange={handleCalendarChange}
          value={selectedDate}
          view={view}
          onViewChange={(newView) => setView(newView as 'month' | 'year')}
          // If you want to toggle views between month and year, you need to handle view changes.
        />
        <div className="tw-mt-2">
          <button onClick={() => setView('month')} className="tw-mr-2">Month</button>
          <button onClick={() => setView('year')}>Year</button>
        </div>
      </PopoverContent>
    </Popover>
                <FormMessage className="tw-text-red-500">
                  {formState.errors.dob?.message?.toString()}
                </FormMessage>
              </div>
            </div>

            <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4">
            
 <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px]">Contact</FormLabel>
                <PhoneInput
                  international
                  placeholder="Enter a phone number"
                  value={formInstance.getValues("contactDetails.phone")}
                  onChange={(value) => {
                    setValue("contactDetails.phone", value);
                    clearErrors("contactDetails.phone");
                  }}
                  onBlur={() => handlePhoneChange(formInstance)}
                  defaultCountry="IN"
                />
                <FormMessage className="tw-text-red-500">
                  {formState.errors.contactDetails?.phone?.message?.toString()}
                </FormMessage>
              </div>
              <div className="tw-w-[340px] ">
  <FormLabel className="tw-text-[12px]">Batch</FormLabel>
  <Select
    onValueChange={(value) => setValue("batch", value, { shouldValidate: true })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Batch 1" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="batch1">Batch 1</SelectItem>
      <SelectItem value="batch2">Batch 2</SelectItem>
      <SelectItem value="batch3">Batch 3</SelectItem>
      {/* Add more batch options as needed */}
    </SelectContent>
  </Select>
  <FormMessage className="tw-text-red-500">
    {formState.errors.batch?.message?.toString()}
  </FormMessage>
</div>



            </div>

            <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4 ">
             
                <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px] ">Organization</FormLabel>
                <Select {...formInstance.register("organization")}>
                  <SelectTrigger>
                    <SelectValue placeholder="XYZ Organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Xyz Organization</SelectItem>
                    <SelectItem value="Female">abc Organization</SelectItem>
                    <SelectItem value="Other">def Organization</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="tw-text-red-500">
                  {formState.errors.gender?.message?.toString()}
                </FormMessage>
              </div>

              <div className="tw-w-[340px]">
                <FormLabel className="tw-text-[12px]">APSCHE</FormLabel>
                <Select {...formInstance.register("apsche")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Yes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="tw-text-red-500">
                  {formState.errors.apsche?.message?.toString()}
                </FormMessage>
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-space-x-3 tw-mt-[60px]">
              <div className="tw-w-[600px] tw-flex tw-gap-[8px]">
              <Checkbox
                id="autoGeneratePassword"
                checked={autoGeneratePassword}
                onCheckedChange={(checked) => setAutoGeneratePassword(checked)}
                className="tw-mr-2"
              />

              <FormLabel htmlFor="autoGeneratePassword" className="tw-text-[12px] tw-w-[410px] tw-font-medium tw-leading-[24px] tw-text-[#0a0a0a]">
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
                            <label htmlFor="active" className="tw-text-[13px]">Active</label>
                            <RadioGroupItem
                              value="inactive"
                              id="inactive"
                              className="tw-rounded tw-border-gray-300 tw-text-blue-600 tw-focus:ring-blue-500"
                            />
                            <label htmlFor="inactive" className="tw-text-[13px]">Inactive</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="tw-flex tw-justify-between tw-items-center tw-mt-4">
              <p className="tw-text-[13px] tw-text-primary tw-italic tw-w-[251px] tw-h-[20px] tw-top-[300px] tw-left-[26px] tw-mt-1">
                All fields are mandatory*
              </p>
            </div>
            <div className="tw-mt-2">
              <hr className="tw-border-t tw-border-gray-300 tw-w-[700px]" />
            </div>
            <Button
              type="submit"
              variant="default"
              className="tw-bg-primary tw-text-white tw-rounded-md tw-px-4 tw-py-2 tw-mt-5" disabled={!selectedCourse}
            >
              Submit
            </Button>

          </form>
        </Form>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="tw-w-[400px] tw-h-[275px]">
          <div className="tw-ml-[340px] tw-justify-end">
                  <X size={16} className="tw-text-gray-500 tw-cursor-pointer" onClick={closeAlertDialog} />
                </div>
                <div className="tw-ml-[135px] tw-mt-[-22px]">
                  <CircleCheck className="tw-text-green-500" size={60} />
                </div>
                <div className="tw-w-[450px]">
            <AlertDialogHeader className="tw-mt-[-20px] tw-text-center">
              <AlertDialogTitle className="tw-text-lg tw-ml-[80px] tw-mt-2 tw-text-primary tw-font-semibold">Student Authentication</AlertDialogTitle>
              <AlertDialogDescription className="tw-text-center tw-text-sm tw-mt-2 tw-w-[350px]">
                We will share a link at <span className="tw-font-bold">Studentname@gmail.com</span> Student can click the link to reset password
                {/* User can click the link to reset the password. */}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="tw-w-[200px] tw-pt-0 tw-ml-[65px] tw-mt-4">
              <AlertDialogAction
                onClick={closeAlertDialog}
                className="tw-bg-blue-500 tw-text-white tw-w-[150px] tw-mt-[8px] tw-h-[38px] tw-mr-[18px] tw-rounded-md tw-text-center"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
        </div>
    </>
  );
}

export default UserAddPage;

function handlePhoneChange(formInstance) {
  const phoneNumber = formInstance.getValues("contactDetails.phone");
  if (phoneNumber) {
    const parsedNumber = parsePhoneNumber(phoneNumber);
    if (parsedNumber) {
      formInstance.setValue("contactDetails.dialingCode", parsedNumber.countryCallingCode);
    }
  }
}