import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddBook from "@/modules/book/components/AddBook";
import RateBook from "@/modules/book/components/RateBook";
import { GoCommentDiscussion } from "react-icons/go";
import BookInfo from "@/modules/book/components/BookInfo";
import Rating from "@/modules/common/components/Rating";
import { useBooks } from "@/modules/book/hooks/useBooks";

export default function Shelf() {
  const { books, isLoading, isError } = useBooks();

  // // TODO show custom loader
  if (isLoading) return <div>Loading</div>;

  // TODO show error
  if (isError) return <div>Error sorry</div>;

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
          {books.map((book, index) => (
            <TableRow key={index}>
              <TableCell key={index}> {book.name} </TableCell>
              <TableCell> {book.author} </TableCell>
              <TableCell> {book.genre} </TableCell>
              <TableCell>
                <Rating value={book.rating ?? 0} />
              </TableCell>
              <TableCell>
                <GoCommentDiscussion />
              </TableCell>
              <TableCell>
                <RateBook />
              </TableCell>
              <TableCell>
                

                  <BookInfo 
                    book={books.find(item => item.id == book.id)}
                  />
                
              </TableCell>
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
