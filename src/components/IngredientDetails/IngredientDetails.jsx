import React, { useEffect, useState } from 'react'
import styles from './IngredientDetails.module.css'
import { useLocation, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { ThreeDots } from 'react-loader-spinner'

const IngredientDetails = () => {
  const params = useParams()
  const { ingredients } = useAppSelector(
    (state) => state.rootReducer.ingredientsMenu
  )
  const location = useLocation()
  const [ingredient, setIngredient] = useState(null)

  useEffect(() => {
    if (params?.id) {
      const requiredId = params.id.slice(1)
      const requiredIngredient = ingredients.find(
        (item) => item._id === requiredId
      )
      setIngredient(requiredIngredient)
    }
  }, [ingredients, params])

  return (
    <>
      {ingredient ? (
        <div className={!location.state ? styles.wrapper : ''}>
          <div className={styles.header}>
            <h2 className={styles.title}>Детали ингредиента</h2>
          </div>
          <div className={styles.ingredient}>
            <div className={styles.ingredientImg}>
              <img src={ingredient.image_large} alt={ingredient.name} />
            </div>
            <h2 className={styles.ingredientName}>{ingredient.name}</h2>
          </div>
          <ul className={styles.ingredientStructureList}>
            <li className={styles.ingredientStructureItem}>
              <h3 className={styles.structureTitle}>Калории,ккал</h3>
              <span className={styles.structureValue}>
                {ingredient.calories}
              </span>
            </li>
            <li className={styles.ingredientStructureItem}>
              <h3 className={styles.structureTitle}>Белки, г</h3>
              <span className={styles.structureValue}>
                {ingredient.proteins}
              </span>
            </li>
            <li className={styles.ingredientStructureItem}>
              <h3 className={styles.structureTitle}>Жиры, г</h3>
              <span className={styles.structureValue}>{ingredient.fat}</span>
            </li>
            <li className={styles.ingredientStructureItem}>
              <h3 className={styles.structureTitle}>Углеводы, г</h3>
              <span className={styles.structureValue}>
                {ingredient.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4C4CFF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          visible={true}
        />
      )}
    </>
  )
}

export default IngredientDetails
