import { useState } from 'react'

import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import useKeyPress from 'app/hooks/useKeyPress'
import { useEffectsSavingGoal } from 'app/providers/SavingGoalProvider'
import { MinDate } from 'app/models/SavingGoal'

import DatePicker from '../../components/DatePicker'

const DatePickerContainer = ({ initialDate }: MinDate) => {
  const { setDateToReachGoal } = useEffectsSavingGoal()

  const [date, setDate] = useState(initialDate)

  const month = date.toLocaleString('en-US', {
    month: 'long'
  })

  const year = date.getFullYear()

  const incrementDate = () => {
    setDate(addMonths(date, 1))
    setDateToReachGoal(addMonths(date, 1))
  }

  const decrementDate = () => {
    if (date > initialDate) {
      setDate(subMonths(date, 1))
      setDateToReachGoal(subMonths(date, 1))
    }
  }

  useKeyPress('ArrowRight', incrementDate)
  useKeyPress('ArrowLeft', decrementDate)

  return (
    <DatePicker
      incrementDate={incrementDate}
      decrementDate={decrementDate}
      month={month}
      year={year}
    />
  )
}

export default DatePickerContainer
