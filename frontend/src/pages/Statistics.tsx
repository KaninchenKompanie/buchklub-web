import AverageRatingCategory from "@/modules/book/components/AverageRatingCategory";



const chartData = [
  { category: "Setting", rating: 7 },
  { category: "Plot", rating: 3 },
  { category: "Engagement", rating: 4 },
  { category: "Characters", rating: 4 },
  { category: "Story", rating: 5 },
]


export default function Statistics() {
  return (
    <div className="p-4">
      <AverageRatingCategory data={chartData}/>
    </div>
  )
}
