import React, { useState } from 'react';
import UserAddPage from './UserAddPage';
import { Link } from '@tanstack/react-router';
import { Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const users = [
  // Your user data
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
    id: 'AB12457',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12458',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB12459',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB124510',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB124511',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB124512',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },
  {
    id: 'AB124513',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  }, {
    id: 'AB124514',
    name: 'Scarlett Johansson',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'XYZ organization',
    roles: 'Admin',
    status: 'Inactive',
  },

  {
    id: '789',
    name: 'yamuna',
    email: 'scarlettjohansson@gmail.com',
    contact: '+919652358844',
    organization: 'yamuna organization',
    roles: 'employee',
    status: 'active',
  },
  // Other user data...
];

const UserListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list');
  const [currentViews, setCurrentViews] = useState('list1');
  const [filterField, setFilterField] = useState('Organization'); // Default filter field
  const [filterCondition, setFilterCondition] = useState('contains'); // Default filter condition
  const [filterQuery, setFilterQuery] = useState(''); // Filter query
  const usersPerPage = 5;

  // Filtering function
  const filterUsers = (user) => {
    const query = filterQuery.toLowerCase();

    switch (filterField) {
      case 'User ID':
        return filterCondition === 'contains'
          ? user.id.toLowerCase().includes(query)
          : user.id.toLowerCase() === query;
      case 'Full Name':
        return filterCondition === 'contains'
          ? user.name.toLowerCase().includes(query)
          : user.name.toLowerCase() === query;
      case 'Status':
        return filterCondition === 'contains'
          ? user.status.toLowerCase().includes(query)
          : user.status.toLowerCase() === query;
      case 'Organization':
        return filterCondition === 'contains'
          ? user.organization.toLowerCase().includes(query)
          : user.organization.toLowerCase() === query;
      case 'Roles':
        return filterCondition === 'contains'
          ? user.roles.toLowerCase().includes(query)
          : user.roles.toLowerCase() === query;
      default:
        return true;
    }
  };

  // Filter users before pagination
  const filteredUsers = users.filter(filterUsers);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  const [editingUser, setEditingUser] = useState(null);
const [isEditing, setIsEditing] = useState(false);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (currentView === 'add') {
    return <UserAddPage />;
  }
  // if (currentViews === 'edit') {
  //   return <UserEditPage />;
  // }
   if (currentViews === 'edit') {
    return <UserAddPage />;
  }
  const onEdit = (user) => {
    setEditingUser(user);
    setIsEditing(true);
  };
  
  // Dynamic table height
  const tableHeight = Math.min(currentUsers.length * 95, 450); 

  return (
    <div className="tw-p-8 tw-pl-0  tw-overflow-hidden">
    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
      <div className="tw-flex tw-gap-2 tw-w-[600px]">
        <Select onValueChange={setFilterField}>
          <SelectTrigger className="tw-bg-white tw-h-[33px] tw-w-[140px] tw-text-primary tw-border-primary">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Organization">Organization</SelectItem>
            <SelectItem value="No.of Batches">No.of Batches</SelectItem>
            <SelectItem value="Email Address">Email Address</SelectItem>
            <SelectItem value="Status">Status</SelectItem>
            <SelectItem value="State">State</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setFilterCondition}>
          <SelectTrigger className="tw-bg-white tw-h-[35px] tw-w-[110px] tw-text-primary tw-border-[#1D1F71]">
            <SelectValue placeholder="Contains" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equals">Equals to</SelectItem>
            <SelectItem value="startsWith">Starts with</SelectItem>
            <SelectItem value="contains">Contains</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <Input
            className="tw-bg-white tw-h-[35px] tw-w-[270px] tw-left-[2px]  tw-border-[#1D1F71]"
            type="text"
            placeholder="Write"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="tw-flex tw-justify-end tw-gap-4">
        <a
          href="#"
          className="tw-text-primary tw-underline tw-mt-2 tw-h-[17px] tw-text-[16px]"
        >
          Data Import/Export
        </a>
          {/* <Button
            variant="default"
            className="tw-bg-[#1D1F71] tw-text-[#FFFFFF] tw-text-[13px] tw-h-[35px] hover:tw-bg-primary/180"
            onClick={() => setCurrentView('add')}
          >
            <Plus className="tw-h-[25px] tw-w-[15px]" /> Add User
          </Button> */}
          <Link
  to="/users/add"
  className="tw-bg-[#1D1F71] tw-text-[#FFFFFF] tw-text-[13px] tw-h-[35px] hover:tw-bg-primary/180 tw-flex tw-items-center tw-px-2 tw-py-1 tw-rounded"
  onClick={() => setCurrentView('add')}
>
  <Plus className="tw-h-[25px] tw-w-[15px] tw-mr-1" /> Add User
</Link>
        </div>
      </div>

      <div className="tw-overflow-hidden tw-bg-white tw-shadow-md tw-rounded-lg">
        <Table className={`tw-overflow-y-auto`} style={{ height: tableHeight }}>
          <TableHeader className="tw-p-4 tw-text-center tw-bg-[#FFDF9B]">
            <TableRow>
              <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                User ID
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Full Name
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Email Address
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Contact
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Organization
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Roles
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Status
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-b tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow key={index} className="tw-border-b tw-border-gray-300 ">
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.id}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.name}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.email}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.contact}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.organization}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.roles}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">
  <span
    className={`tw-py-1 tw-px-3 tw-rounded-full ${
      user.status.toLowerCase() === 'active' ? 'tw-text-green-500' : 'tw-text-red-500'
    }`}
  >
    {user.status}
  </span>
</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">
                  <button
                    className="tw-w-5 tw-h-4 tw-ml-6 tw-flex tw-items-center tw-justify-center tw-bg-transparent tw-border-none tw-cursor-pointer"
                    onClick={() => setCurrentViews('edit')}
                    aria-label="Edit"
                  >
                    <Pencil className="tw-h-4 tw-w-4" />
                  </button>
                </TableCell>
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
        <div className="tw-flex tw-items-center tw-space-x-2 tw-mr-[-275px]">
        <Pagination className="tw-flex tw-items-center tw-space-x-2">
  <PaginationContent className="tw-flex tw-items-center tw-space-x-1">
    <PaginationItem>
      <PaginationPrevious
        className={`tw-px-3 tw-py-1 tw-cursor-pointer ${currentPage === 1 ? 'tw-opacity-50 tw-cursor-not-allowed' : ''}`}
        onClick={() =>
          setCurrentPage((prev) => Math.max(prev - 1, 1))
        }
        aria-disabled={currentPage === 1}
      />
    </PaginationItem>
    
    <PaginationItem>
      <PaginationNext
        className={`tw-px-3 tw-py-1 tw-cursor-pointer ${currentPage === totalPages ? 'tw-opacity-50 tw-cursor-not-allowed' : ''}`}
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        aria-disabled={currentPage === totalPages}
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