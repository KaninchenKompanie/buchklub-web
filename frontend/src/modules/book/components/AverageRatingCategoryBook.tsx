import React from 'react'
import AverageRatingCategory from './AverageRatingCategory'

type AverageRatingCategoryBookProps = {
    id: number;
}

export default function AverageRatingCategoryBook({ id }: AverageRatingCategoryBookProps) {
  return (
    <AverageRatingCategory
        title="Durchschnittliche Bewertung der Kategorien"
        description={"Anzahl Bewertungen: " + 42}
        data={[
          { category: "setting", rating: 4 },
          { category: "plot", rating: 4 },
          { category: "engagement", rating: 7 },
          { category: "characters", rating: 2 },
          { category: "style", rating: 7 },
        ]}
      />
  )
}