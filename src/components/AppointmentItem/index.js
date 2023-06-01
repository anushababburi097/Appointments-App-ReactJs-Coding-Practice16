// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {name, date, isFilterActive, id} = appointmentDetails

  const starImgUrl = isFilterActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="appointment-item">
      <div>
        <h1>{name}</h1>
        <button type="button" onClick={onClickFavoriteIcon}>
          <img src={starImgUrl} alt="star" className="favorite-icon" />
        </button>
      </div>
      <p>Date {date}</p>
    </li>
  )
}
export default AppointmentItem
