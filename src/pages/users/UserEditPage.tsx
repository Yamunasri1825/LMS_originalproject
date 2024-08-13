import React, { useState, useEffect } from 'react';
import { useMatch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormLabel } from "@/components/ui/form";

interface Student {
  id: string;
  name: string;
  email: string;
  contact: string;
  organization: string;
  roles: string;
  status: string;
}

const UserEditPage: React.FC = () => {
  const match = useMatch('/users/:userId'); // Ensure the route matches exactly
  const userId = match.params.userId; // Extract userId
  const [student, setStudent] = useState<Student | null>(null);

  // Initial students data (you might fetch this from an API in a real application)
  const initialStudents: Student[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', contact: '123-456-7890', organization: 'Company A', roles: 'Admin', status: 'Active' },
    // Add more student data here if needed...
  ];

  useEffect(() => {
    console.log(`Route matched: ${userId}`); // Debug log
    const studentData = initialStudents.find((student) => student.id === userId);
    console.log('Student data found:', studentData); // Debug log
    setStudent(studentData || null);
  }, [userId, initialStudents]);

  if (!student) {
    return <p>Loading...</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => prevStudent ? ({
      ...prevStudent,
      [name]: value,
    }) : null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send updated data to the backend)
    console.log('Updated student:', student);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Unique ID</FormLabel>
          <Input name="id" value={student.id} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>Student Name</FormLabel>
          <Input
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            value={student.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Roles</FormLabel>
          <Input
            name="roles"
            value={student.roles}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Organization</FormLabel>
          <Input
            name="organization"
            value={student.organization}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Contact</FormLabel>
          <Input
            name="contact"
            value={student.contact}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input
            name="status"
            value={student.status}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit">
          Update Student
        </Button>
      </form>
    </div>
  );
};

export default UserEditPage;
