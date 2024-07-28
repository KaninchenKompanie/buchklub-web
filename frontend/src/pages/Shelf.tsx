import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Book } from "@/modules/book/configurations/types";
import AddBook from "@/modules/book/components/AddBook";
import RateBook from "@/modules/book/components/RateBook";
import { GoCommentDiscussion } from "react-icons/go";
import BookInfo from "@/modules/book/components/BookInfo";
import Rating from "@/modules/common/components/Rating";


export default function Shelf() {
  const [catalogue, setCatalogue] = useState<Book[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/books")
      .then((response) => response.json())
      .then((catalogue) => setCatalogue(catalogue))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col p-20">
      <div className="ml-auto mb-10">
        <AddBook />
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Bücherregal
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name </TableHead>
            <TableHead> Author </TableHead>
            <TableHead> Genre </TableHead>
            <TableHead> Rating </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {catalogue.map((book, index) => (
            <TableRow key={index}>
              <TableCell key={index}> {book.name} </TableCell>
              <TableCell> {book.author} </TableCell>
              <TableCell> {book.genre} </TableCell>
              <TableCell> <Rating value={book.rating ?? 0} /> </TableCell>
              <TableCell> <GoCommentDiscussion /> </TableCell>
              <TableCell>
                <RateBook />
              </TableCell>
              <TableCell><BookInfo id={0} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Bibliothek
      </h1>
    </div>
  );
}
