import React, { useState } from 'react';
import UserAddPage from './UserAddPage'
import { Pencil ,ChevronDown ,ChevronRight,ChevronLeft,Plus} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const users = [
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Active',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'active',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  }, 
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  }, 
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  }, 
  {
    id: 'AB12456',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  }, 

  // Add more users as needed
];



const dataArray = Array.isArray(users) ? users : [];
const hasUsers = users.length > 0;
const UserListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list');
  const usersPerPage = 5;
  
  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / usersPerPage);
function onEdit(){

}
if (currentView === 'add') {
  return <UserAddPage />;
}


  return (
    <div className="tw-p-8 tw-pl-0 tw-bg-colors tw-min-h-[550px] tw-overflow-hidden ">


      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4  ">
        
        <div className="tw-flex tw-gap-1">
        <Select>
  <SelectTrigger className="tw-bg-white tw-h-[33px] tw-text-primary tw-w-[120px] ">
    <SelectValue placeholder="Filters" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Organization">Organzation</SelectItem>
    <SelectItem value="Roles">Roles</SelectItem>
    <SelectItem value="status">Status</SelectItem>
    <SelectItem value="name">Name</SelectItem>
    <SelectItem value="status">User ID</SelectItem>


  </SelectContent>
</Select>
        <Select>
  <SelectTrigger className=" tw-bg-white tw-h-[35px] tw-text-primary tw-w-[110px]">
    <SelectValue placeholder="Contains" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Equals to</SelectItem>
    <SelectItem value="dark">Starts with</SelectItem>
    <SelectItem value="system">Contains</SelectItem>
  </SelectContent>
</Select>




    <Input className='tw-bg-white tw-h-[35px]  tw-left-[2px] tw-w-[210px]' type="email" placeholder="Write" />
        </div>
        <div className="tw-flex tw-justify-end tw-gap-4 ">
          <a href="#" className="tw-text-primary tw-underline tw-mt-2 tw-h-[17px]  tw-text-[16px]">Data Import/Export</a>
        
          <Button variant="default" className='tw-bg-[#1D1F71] tw-text-[#FFFFFF] tw-text-[13px] tw-h-[35px] ' onClick={() => setCurrentView('add')}><Plus className='tw-h-[15px] tw-w-[15px]'/>Add User</Button>
        </div>
      </div>

      <div className="tw-overflow-hidden tw-bg-white tw-shadow-md tw-rounded-lg">
      <Table className="tw-min-w-full tw-text-[13px] tw-h-[454px] tw-border tw-border-gray-300 tw-shadow-lg ">
  <TableHeader className="tw-p-4 tw-text-center tw-bg-[#FFDF9B] ">
    <TableRow>
      <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300  tw-text-extend tw-font-semibold">User ID</TableHead>
      <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300  tw-text-extend tw-font-semibold">Full Name</TableHead>
      <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300  tw-text-extend tw-font-semibold">Email Address</TableHead>
      <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300  tw-text-extend tw-font-semibold">Contact</TableHead>
      <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300  tw-text-extend tw-font-semibold">Organization</TableHead>
      <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300  tw-text-extend tw-font-semibold">Roles</TableHead>
      <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300  tw-text-extend tw-font-semibold">Status</TableHead>
      <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300  tw-text-extend tw-font-semibold">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {currentUsers.map((user, index) => (
      <TableRow key={index} className=" tw-border-b tw-border-gray-300">
        <TableCell className="tw-py-3 tw-px-4">{user.id}</TableCell>
        <TableCell className="tw-py-3 tw-px-4">{user.name}</TableCell>
        <TableCell className="tw-py-3 tw-px-4 tw-text-primary">{user.email}</TableCell>
        <TableCell className="tw-py-3 tw-px-4">{user.contact}</TableCell>
        <TableCell className="tw-py-3 tw-px-4">{user.organization}</TableCell>
        <TableCell className="tw-py-3 tw-px-4">{user.roles}</TableCell>
        <TableCell className="tw-py-3 tw-px-4">
          <span className={`tw-py-1 tw-px-3 tw-rounded-full ${user.status.toLowerCase() === 'active' ? 'tw-text-green-500' : 'tw-text-red-500'}`}>
            {user.status}
          </span>
        </TableCell>
        <TableCell className="tw-py-3 tw-px-4">    <button 
      className="tw-w-5 tw-h-4 tw-flex tw-items-center tw-justify-center tw-bg-transparent tw-border-none tw-cursor-pointer"
      onClick={onEdit}
      aria-label="Edit"
    >
      <Pencil className="tw-w-5 tw-h-4" />
    </button></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</div>


<div className="tw-flex tw-justify-between tw-items-center tw-w-[1091px] tw-h-[45px] tw-top-[409px] tw-left-[2px] tw-p-[15px_5px_0_5px] tw-gap-[711px] tw-opacity-100 ">
        <div className="tw-text-gray-700 tw-w-[61px] tw-h-[30px] tw-gap-[25px]">
          <span className="tw-mr-4">Page</span>
          {currentPage}
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2 tw-mr-[-75px]">
          <Pagination className="tw-flex tw-items-center tw-space-x-2">
            <PaginationContent className="tw-flex tw-items-center tw-space-x-1">
              <PaginationItem>
                <PaginationPrevious
                  className="tw-px-3 tw-py-1"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
              {(() => {
                const pageNumbers = [];
                if (totalPages <= 4) {
                  for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                  }
                } else {
                  if (currentPage <= 2) {
                    pageNumbers.push(1, 2, "...", totalPages);
                  } else if (currentPage >= totalPages - 1) {
                    pageNumbers.push(1, "...", totalPages - 1, totalPages);
                  } else {
                    pageNumbers.push(1, "...", currentPage, "...", totalPages);
                  }
                }
                return pageNumbers;
              })().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "..." ? (
                    <span className="tw-px-3 tw-py-1">...</span>
                  ) : (
                    <PaginationLink
                      className={`tw-px-3 tw-py-1 ${
                        currentPage === page
                          ? "tw-bg-gray-200 tw-font-bold tw-text-black"
                          : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className="tw-px-3 tw-py-1"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>


    </div>
  );
};

export default UserListPage;
