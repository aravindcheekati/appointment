// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isActive: false,
  }

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onChangeDate = e => {
    const currentDate = e.target.value.split('-')
    const year = currentDate[0]
    const month = currentDate[1] - 1
    const day = currentDate[2]
    const newDate = format(new Date(year, month, day), 'dd MMMM yyyy, EEEE')
    this.setState({date: newDate})
  }

  onSubmit = e => {
    e.preventDefault()

    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  isFavoriteAppointment = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  isStarAppointments = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  starredAppointments = () => {
    const {appointmentList, isActive} = this.state
    if (isActive === true) {
      const filterList = appointmentList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
      return filterList
    }
    return appointmentList
  }

  render() {
    const {title, isActive, date} = this.state
    const btnColor = isActive ? 'isActive' : ''
    const starredAppointsments = this.starredAppointments()

    return (
      <div className="app-container">
        <div className="app-card">
          <div className="appointment-form-container">
            <div className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onSubmit}>
                <label htmlFor="Title" className="form-text">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input"
                  onChange={this.onChangeTitle}
                  value={title}
                  id="Title"
                />
                <label htmlFor="Date" className="form-text">
                  DATE
                </label>
                <input
                  type="date"
                  className="input"
                  onChange={this.onChangeDate}
                  id="Date"
                  value={date}
                />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>
          <div className="appointments-wrapper">
            <div className="appointment-text-container">
              <h1 className="appointment-list-wrapper-heading">Appointments</h1>

              <button
                type="button"
                className={`starred-btn ${btnColor}`}
                onClick={this.isStarAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-items-container">
              {starredAppointsments.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointMent={eachAppointment}
                  isFavoriteAppointment={this.isFavoriteAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
