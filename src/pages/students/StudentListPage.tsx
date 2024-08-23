import React, { useState } from 'react';
import StudentAddPage from './StudentAddPage';
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
    studentid: 'Ab1243545',
    studentName: 'YAmuna',
    email: 'yamunasri@gamil.com',
    mentor: 'yamuna',
    organization: 'XYZ organazation',
    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    studentid: 'Ab1243545',
    studentName: 'YAmuna',
    email: 'yamunasri@gamil.com',
    mentor: 'yamuna',
    organization: 'XYZ organazation',
  
    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    studentid: 'Ab1243545',
    studentName: 'YAmuna',
    email: 'yamunasri@gamil.com',
    mentor: 'yamuna',
    organization: 'XYZ organazation',
 
    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    studentid: 'Ab1243545',
    studentName: 'YAmuna',
    email: 'yamunasri@gamil.com',
    mentor: 'yamuna',
    organization: 'XYZ organazation',
 
    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    studentid: 'Ab1243545',
    studentName: 'YAmuna',
    email: 'yamunasri@gamil.com',
    mentor: 'yamuna',
    organization: 'XYZ organazation',
   
    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    studentid: 'Ab1243545',
    studentName: 'YAmuna',
    email: 'yamunasri@gamil.com',
    mentor: 'yamuna',
    organization: 'XYZ organazation',

    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    studentid: 'Ab1243545',
    studentName: 'YAmuna',
    email: 'yamunasri@gamil.com',
    mentor: 'yamuna',
    organization: 'XYZ organazation',
    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'Active',
  },
  {
    studentid: 'Ab345',
    studentName: 'raji',
    email: 'raji@gamil.com',
    mentor: 'raji',
    organization: 'raji organazation',
    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'inActive',
  },
  {
    studentid: 'Ab345',
    studentName: 'raji',
    email: 'raji@gamil.com',
    mentor: 'raji',
    organization: 'raji organazation',
    program: 'Java',
    state: 'Andhra Pradesh',
    status: 'inActive',
  },
  {
    studentid: 'Ab345',
    studentName: 'raji',
    email: 'raji@gamil.com',
    mentor: 'raji',
    organization: 'raji organazation',
    program: 'Java',
    state: 'Himachal Pradesh',
    status: 'inActive',
  },

];

const UserListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list');
  const [filterField, setFilterField] = useState('Student ID'); 
  const [filterCondition, setFilterCondition] = useState('contains');
  const [filterQuery, setFilterQuery] = useState(''); 
  const usersPerPage = 5;


  const filterUsers = (user) => {
    const query = filterQuery.toLowerCase();

    switch (filterField) {
      case 'Student ID':
        return filterCondition === 'contains'
          ? user.studentid.toLowerCase().includes(query)
          : user.studentid.toLowerCase() === query;
      case 'Student Name':
        return filterCondition === 'contains'
          ? user.studentName.toLowerCase().includes(query)
          : user.studentName.toLowerCase() === query;
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
      case 'Mentor':
        return filterCondition === 'contains'
          ? user.mentor.toLowerCase().includes(query)
          : user.mentor.toLowerCase() === query;
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
    return <StudentAddPage />;
  }



  const tableHeight = Math.min(currentUsers.length * 105, 650);

  return (
    <div className="tw-p-8 tw-pl-0 tw-bg-colors tw-overflow-hidden">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <div className="tw-flex tw-gap-2 tw-w-[600px]">
          <Select onValueChange={setFilterField}>
            <SelectTrigger className="tw-bg-white tw-h-[33px] tw-w-[165px] tw-text-primary tw-border-primary">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student ID">Student ID</SelectItem>
              <SelectItem value="Student Name">Student Name</SelectItem>
              <SelectItem value="Email Address">Email Address</SelectItem>
              <SelectItem value="Status">Status</SelectItem>
              <SelectItem value="Mentor">Mentor</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setFilterCondition}>
            <SelectTrigger className="tw-bg-white tw-h-[35px] tw-w-[165px] tw-text-primary tw-border-primary">
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
              className="tw-bg-white tw-h-[35px] tw-w-[210px] tw-left-[2px] tw-border-primary"
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
  to="/students/StudentAdd"
  className="tw-bg-primary tw-text-white  hover:tw-bg-primary tw-flex tw-items-center tw-px-2 tw-py-1 tw-rounded"
  onClick={() => setCurrentView('add')}
>
  <Plus className="tw-h-[25px] tw-w-[15px] tw-mr-1" /> Add Student
</Link>
        </div>
      </div>

      <div className="tw-overflow-hidden tw-bg-white tw-shadow-md tw-rounded-lg ">
      <Table className={`tw-overflow-y-auto`} style={{ height: tableHeight }}>
          <TableHeader className="tw-p-4 tw-text-center tw-bg-[#FFDF9B]">
            <TableRow>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Student Name
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Email Address
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Mentor
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Organization
              </TableHead>
              <TableHead className="tw-py-3 tw-px-4 tw-border-gray-300 tw-text-extend tw-font-semibold tw-text-center">
                Program
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
              <TableRow key={index} className="tw-border-b tw-border-gray-300">
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.studentName}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.email}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.mentor}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.organization}</TableCell>
                <TableCell className="tw-py-3 tw-px-4 tw-text-center">{user.program}</TableCell>
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
                    className="tw-w-5 tw-h-4 tw-flex tw-ml-6 tw-justify-center tw-bg-transparent tw-border-none tw-cursor-pointer"
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
