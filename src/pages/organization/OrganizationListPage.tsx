import React, { useState } from 'react';
import OrganizationAddPage from './OrganizationAddPage';
import { Pencil, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';
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
  {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'raji@gamil.com',
    contact: '+919823323875',
    state: 'Himachal Pradesh',
    status: 'Active',
  }, {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'inActive',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'KLC Tech College',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIIt Nuzvid',
    students: '50',
    batches: '5',
    email: 'raji@gamil.com',
    contact: '+919823323875',
    state: 'Himachal Pradesh',
    status: 'inActive',
  },{
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }, {
    organization: 'IIT nuzvid',
    students: '50',
    batches: '6',
    email: 'yamunasri@gamil.com',
    contact: '+919823323875',
    state: 'Andhra Pradesh',
    status: 'Active',
  }

];

const UserListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list');
  const [filterField, setFilterField] = useState('Organization'); 
  const [filterCondition, setFilterCondition] = useState('contains');
  const [filterQuery, setFilterQuery] = useState('');
  const usersPerPage = 5;


  const filterUsers = (user) => {
    const query = filterQuery.toLowerCase();

    switch (filterField) {
      case 'Organization':
        return filterCondition === 'contains'
          ? user.organization.toLowerCase().includes(query)
          : user.organization.toLowerCase() === query;
      case 'No.of Batches':
        return filterCondition === 'contains'
          ? user.batches.toLowerCase().includes(query)
          : user.batches.toLowerCase() === query;
      case 'Email Address':
        return filterCondition === 'contains'
          ? user.email.toLowerCase().includes(query)
          : user.email.toLowerCase() === query;
      case 'Status':
        return filterCondition === 'contains'
          ? user.status.toLowerCase().includes(query)
          : user.status.toLowerCase() === query;
      case 'State':
        return filterCondition === 'contains'
          ? user.state.toLowerCase().includes(query)
          : user.state.toLowerCase() === query;
      default:
        return true;
    }
  };

  const filteredUsers = users.filter(filterUsers);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (currentView === 'add') {
    return <OrganizationAddPage />;
  }


  const tableHeight = Math.min(currentUsers.length * 105, 550);

  return (
    <div className="tw-p-8 tw-pl-0 tw-bg-colors tw-overflow-hidden">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <div className="tw-flex tw-gap-2 tw-w-[550px]">
          <Select onValueChange={setFilterField}>
            <SelectTrigger className="tw-bg-white tw-h-[33px] tw-w-[149px] tw-text-primary tw-border-primary">
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
            <SelectTrigger className="tw-bg-white tw-h-[35px] tw-w-[149px] tw-text-primary tw-border-primary">
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
              className="tw-bg-white tw-h-[35px] tw-w-[280px] tw-left-[2px]  tw-border-primary"
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
          <Link
  to="/organization/OrganizationAdd"
  className="tw-bg-primary tw-text-white tw-h-[35px] hover:tw-bg-primary/180 tw-flex tw-items-center tw-px-2 tw-py-1 tw-rounded"
  onClick={() => setCurrentView('add')}
>
  <Plus className="tw-h-[25px] tw-w-[15px] tw-mr-1" /> Add Organization
</Link>
        </div>
      </div>

      <div className="tw-overflow-hidden tw-bg-white tw-shadow-md tw-rounded-lg">
      <Table className={`tw-overflow-y-auto`} style={{ height: tableHeight }}>
          <TableHeader className="tw-p-4 tw-text-center tw-bg-[#FFDF9B]">
            <TableRow>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Organization
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                No.of Students
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                No.of Batches
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Email Address
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Contact
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                State
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Status
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow key={index} className="tw-border-b tw-border-gray-300 ">
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.organization}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.students}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-primary tw-text-center">{user.batches}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.email}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.contact}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.state}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">
                <span
    className={`tw-py-1 tw-px-3 tw-rounded-full ${
      user.status.toLowerCase() === 'active' ? 'tw-text-green-500' : 'tw-text-red-500'
    }`}
  >
    {user.status}
  </span>
                </TableCell>
                <TableCell className="tw-py-3 tw-px-4 ">
                  <button
                    className="tw-w-5 tw-ml-6 tw-h-4 tw-flex tw-items-center tw-justify-center tw-bg-transparent tw-border-none tw-cursor-pointer"
                    onClick={() => setCurrentView('add')}
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
