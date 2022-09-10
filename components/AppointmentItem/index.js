// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointMent, isFavoriteAppointment} = props
  const {title, date, isFavorite, id} = appointMent

  const favoriteAppointment = () => {
    isFavoriteAppointment(id)
  }

  const isFavImage = isFavorite ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
      alt="star"
    />
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
      alt="star"
    />
  )

  return (
    <li className="appointment-item">
      <div className="para-and-start">
        <p className="title">{title}</p>
        <button
          type="button"
          className="fav-btn"
          onClick={favoriteAppointment}
          testid="star"
        >
          {isFavImage}
        </button>
      </div>
      <p className="date-time">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
