// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    initialAppointmentList: [],
    tittleName: '',
    inputDate: '',
    isFilterActive: false,
  }

  addAppointmentBtn = event => {
    event.preventDefault()
    const {tittleName, inputDate} = this.state
    const formateDate = inputDate
      ? format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      name: tittleName,
      date: formateDate,
      isFilterActive: false,
    }

    this.setState(prevState => ({
      initialAppointmentList: [
        ...prevState.initialAppointmentList,
        newAppointment,
      ],
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeName = event => {
    this.setState({tittleName: event.target.value})
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {initialAppointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return initialAppointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return initialAppointmentList
  }

  render() {
    const {tittleName, inputDate, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    // const {initialAppointmentList, isFilterActive} = this.state
    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="appointment-item-container">
            <form className="form" onSubmit={this.addAppointmentBtn}>
              <h1 className="main-heading">Add Appointment</h1>
              <label className="label" htmlFor="tittle">
                TITTLE
              </label>
              <input
                type="text"
                className="input"
                placeholder="Title"
                id="tittle"
                onChange={this.onChangeName}
              />
              <label className="label" htmlFor="date" placeholder="DATE">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="input"
                onChange={this.onChangeDate}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointments">
            <div className="appointments-item">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-container">
              {filteredAppointmentsList.map(each => (
                <AppointmentItem
                  key={each.id}
                  initialAppointmentList={each}
                  toggleIsStarred={this.toggleIsStarred}
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
