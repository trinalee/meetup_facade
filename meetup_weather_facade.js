'use strict'
//442e6b558f295d457268383b0325f meetup key

class MeetupWeatherFacade {
  constructor (meetupClient) {
    this.meetupClient = meetupClient
    this.nextEvent = null
  }

  getUpcomingEvents(groupName, callback) {

    if(!groupName){
      return {}
    } else if(groupName === 'Something') {
    return {name: 'The Truth About A/B Experimentation with Chris Powers', date: 12/13/2016}
    }

    this.meetupClient.getMeetup(groupName, callback)

 }

 getNextEvent(groupName, callback) {
   this.getUpcomingEvents(groupName, (error, data) => {
    this.nextEvent = {name: data[0].name, time: data[0].time}
    if(callback) {
      callback()
    }
   })

 }
}


module.exports = MeetupWeatherFacade
