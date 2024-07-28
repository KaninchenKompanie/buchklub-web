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

  // TODO show error
  if (isError) return <div>Error sorry</div>;
    
  // // TODO show custom loader
  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-col p-20">
      <div className="ml-auto mb-10">
        <AddBook />
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-10">
        Bücherregal
      </h1>
      <Table>
        <TableHeader className="h-[60px]">
          <TableRow>
            <TableHead className="text-xl font-thin"> Buchtitel </TableHead>
            <TableHead className="text-xl font-thin"> Autor </TableHead>
            <TableHead className="text-xl font-thin"> Genre </TableHead>
            <TableHead className="text-xl font-thin"> Jahr </TableHead>
            <TableHead className="text-xl font-thin"> Bewertung </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book, index) => (
            <TableRow key={index}>
              <TableCell key={index}> {book.name} </TableCell>
              <TableCell> {book.author} </TableCell>
              <TableCell> {book.genre} </TableCell>
              <TableCell> {book.year} </TableCell>
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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-20 pb-10">
        Bibliothek
      </h1>
      {/* <Table>
        <TableHeader className="h-[60px]">
          <TableRow>
            <TableHead className="text-xl font-thin"> Buchtitel </TableHead>
            <TableHead className="text-xl font-thin"> Autor </TableHead>
            <TableHead className="text-xl font-thin"> Genre </TableHead>
            <TableHead className="text-xl font-thin"> Jahr </TableHead>
            <TableHead className="text-xl font-thin"> Bewertung </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book, index) => (
            <TableRow key={index}>
              <TableCell key={index}> {book.name} </TableCell>
              <TableCell> {book.author} </TableCell>
              <TableCell> {book.genre} </TableCell>
              <TableCell> {book.year} </TableCell>
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
                <BookInfo id={0} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </div>
  );
}
