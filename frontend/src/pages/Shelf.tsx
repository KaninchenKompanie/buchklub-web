import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { error } from 'console';
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Shelf({ }: Props) {

  const [blb, setBlb] = useState([{ name: '', author: '' }]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/shelf')
      .then(response => response.json())
      .then(blb => setBlb(blb))
      .catch(error => console.error(error))
  }, []);

  return (
    <Table>
      <TableCaption>Shelf</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> Name </TableHead>
          <TableHead> Author </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blb.map((book, index) => (
          <TableRow key={index}>
            <TableCell key={index}> {book.name} </TableCell>
            <TableCell> {book.author} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}