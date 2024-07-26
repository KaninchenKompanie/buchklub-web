import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow }
  from '@/components/ui/table'
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from 'react'
import { Book } from '@/modules/book/types/book';
import { GiFeather } from "react-icons/gi";
import AddBook from '@/components/AddBook';


export default function Shelf() {

  const [catalogue, setCatalogue] = useState<Book[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/shelf')
      .then(response => response.json())
      .then(catalogue => setCatalogue(catalogue))
      .catch(error => console.error(error))
  }, []);

  const goldenFeathers = (n: number) => {
    let feathers = [];
    for (let i = 0; i < n; i++) {
      feathers.push(<GiFeather className='text-pink-400' />);
    }
    return (
      <div className='flex flex-row'>{feathers}</div>
    );
  };
  return (
    <div className='flex flex-col p-20'>
      <div className='ml-auto mb-10'>
        <AddBook />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name </TableHead>
            <TableHead> Author </TableHead>
            <TableHead> Rating </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {catalogue.map((book, index) => (
            <TableRow key={index}>
              <TableCell key={index}> {book.name} </TableCell>
              <TableCell> {book.author} </TableCell>
              <TableCell> {goldenFeathers(book.rating)} </TableCell>
              {/* <TableCell> <GiFeather />{book.rating} </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}