import { Ref, RefObject, createRef, useMemo } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useAppSelector } from '../../hooks/hooks'
import { selectIngredients } from '../../services/selectors/ingredientsSelectors'
import { TIngredient } from '../../utils/types'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import styles from './BurgerIngredientsSection.module.css'

type TBurgerIngredientsSection = {
  title: string
}

type TIngredientWithRef = TIngredient & {
  nodeRef: any
}
const BurgerIngredientsSection = (
  props: TBurgerIngredientsSection
): JSX.Element => {
  const ingredients = useAppSelector(selectIngredients)

  const { title } = props

  const list: Record<string, string> = {
    Булки: 'bun',
    Соусы: 'sauce',
    Начинки: 'main',
  }
  const sortedData = useMemo(
    () =>
      ingredients &&
      ingredients
        .filter((item: TIngredient) => item.type === list[title])
        .map((ingredient) => {
          return { ...ingredient, nodeRef: createRef() }
        }),
    [ingredients, title]
  )

  return (
    <li className={styles.section} id={list[title]}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        {sortedData && (
          <TransitionGroup component={null}>
            {sortedData.map((item: TIngredientWithRef) => (
              <CSSTransition
                key={item._id}
                nodeRef={item.nodeRef}
                timeout={500}
                classNames={{
                  enter: styles.ingredientEnter,
                  enterActive: styles.ingredientEnterActive,
                  exit: styles.ingredientExit,
                  exitActive: styles.ingredientExitActive,
                }}
              >
                <BurgerIngredientsItem
                  key={item._id}
                  item={item}
                  nodeRef={item.nodeRef}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </li>
  )
}

export default BurgerIngredientsSection
