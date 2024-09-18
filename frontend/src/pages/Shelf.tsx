import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddBook from "@/modules/book/components/AddBook";
import BookInfo from "@/modules/book/components/bookInfo/BookInfo";
import RateBook from "@/modules/book/components/RateBook";
import { useBooks } from "@/modules/book/hooks/useBooks";
import useBooksStats from "@/modules/book/hooks/useBooksStats";
import { useReviews } from "@/modules/book/hooks/useReviews";
import RatingDisplay from "@/modules/common/components/RatingDisplay";
import { GoCommentDiscussion } from "react-icons/go";

const defaultRating = 0;

export default function Shelf() {
  const {
    books,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
  } = useBooks();
  const {
    reviews,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useReviews();
  const {
    booksStats,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useBooksStats();

  if (isLoadingBooks && isLoadingReviews && isLoadingStats)
    return <div>Loading</div>;

  if (isErrorBooks && isErrorReviews && isErrorStats) return <div>Error</div>;

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
                <RatingDisplay rating={book.rating ?? defaultRating} />
              </TableCell>
              <TableCell>
                <GoCommentDiscussion />
              </TableCell>
              <TableCell>
                <RateBook id={book.id} />
              </TableCell>
              <TableCell>
                <BookInfo
                  book={books.find((item) => item.id == book.id)}
                  reviews={reviews.filter((review) => review.bookId == book.id)}
                  stats={booksStats?.bookStats.find(
                    (item) => item.bookId == book.id
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
