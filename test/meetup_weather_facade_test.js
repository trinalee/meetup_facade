'use strict'

//442e6b558f295d457268383b0325f meetup key
//3247aba053ce485f7e5d695ddd2f2442 weather key
const expect = require('chai').expect;
const MeetupWeatherFacade = require('../meetup_weather_facade')
const MeetupClient = require('../meetup_client')
const sinon = require('sinon')

const geekfestMock = [
  {
    created: 1477316651000,
    id: "235078278",
    name: "The Truth About A/B Experimentation with Chris Powers",
    status: "upcoming",
    time: 1481652000000,
    updated: 1477316651000,
    utc_offset: -21600000,
    waitlist_count: 0,
    yes_rsvp_count: 97,
    venue: {
      id: 11088462,
      name: "Groupon, 3rd floor, Corky Romano",
      lat: 41.896915435791016,
      lon: -87.64354705810547,
      repinned: false,
      address_1: "600 W Chicago Ave",
      city: "Chicago",
      country: "us",
      localized_country_name: "USA",
      zip: "60654",
      state: "IL"
    },
    group: {
      created: 1357337942000,
      name: "Geekfest",
      id: 6490382,
      join_mode: "open",
      lat: 41.88999938964844,
      lon: -87.63999938964844,
      urlname: "Geekfest",
      who: "Geeks"
    },
    link: "https://www.meetup.com/Geekfest/events/235078278/",
    description: "<p>There are plenty of blog articles singing the praises of using A/B experimentation to iteratively make product improvements, but what details are they missing? After spending the last five years running thousands of experiments across the web, mobile, and email platforms at Groupon, I've learned firsthand about the successes and pitfalls of experimenting at scale. Turns out that experimentation is not simple, nor is it a solved problem. That said, getting experimentation right is the difference between organizations being driven by data versus being driven by a CEO's latest whims. </p> <p>Attendees of this talk will walk away knowing: </p> <p>• What is A/B experimentation, and how does it work?</p> <p><br/>• What happens when all the \"low-hanging fruit\" optimizations are gone?</p> <p>• What are the flaws with Frequentist and Bayesian methods, and how did we solve them?</p> <p><br/>• What are the organizational hurdles that prevent the adoption of experimentation best practices?</p> <p>---</p> <p>Chris Powers has been developing Web applications for the last ten years. He strongly believes in the power technology has to bring people together and enjoys developing platforms that empower the user. Currently Chris is a senior engineering manager at Groupon and lives in the northern Chicago suburbs with his wife and two children. In his free time he enjoys drumming, tabletop gaming and homebrewing.</p> <p><br/><a href=\"http://chrisjpowers.com\" class=\"linkified\">http://chrisjpowers.com</a></p> <p>Geekfest Events</p> <p><br/><i>Food is always provided! Plan on coming a few minutes early (11:40-12:00) to grab a bite and a seat. Attendees arriving after 12:10 will not be admitted.</i></p> <p>All Geekfest events are <a href=\"https://www.youtube.com/channel/UCC0tmJUMusYsJbPN3-Acikg/live\">streamed live</a> and then are immediately published to <a href=\"https://www.youtube.com/channel/UCC0tmJUMusYsJbPN3-Acikg\">our YouTube account</a>. </p> <p><i>Make sure to let us know if you need building access! Answer the \"RSVP Question\" with your full name.</i></p> <p><i>Geekfest is always looking for speakers! Email us at [masked] if you are interested in giving a talk.</i></p> ",
    visibility: "public"
  }
]

const paleoChicagoMock = [
  {
    created: 1478789668000,
    duration: 5400000,
    id: "235486543",
    name: "Loop Lunch @ Revival Food Hall",
    status: "upcoming",
    time: 1481218200000,
    updated: 1478789668000,
    utc_offset: -21600000,
    waitlist_count: 0,
    yes_rsvp_count: 12,
    venue: {
      id: 24738404,
      name: "Revival Food Hall",
      lat: 41.879852294921875,
      lon: -87.63060760498047,
      repinned: false,
      address_1: "125 S Clark",
      city: "Chicago",
      country: "us",
      localized_country_name: "USA",
      zip: "",
      state: "IL"
    },
    group: {
      created: 1270657725000,
      name: "Paleo Chicago",
      id: 1626903,
      join_mode: "open",
      lat: 41.880001068115234,
      lon: -87.62000274658203,
      urlname: "PaleoChicago",
      who: "Members"
    },
    link: "https://www.meetup.com/PaleoChicago/events/235486543/",
    description: "<p><a href=\"http://revivalfoodhall.com/\" class=\"linkified\">http://revivalfoodhall.com/</a></p> <p>I've recently discovered this awesome food court with many popular Chicago eateries:</p> <p>Options like:<br/>* Smoque BBQ<br/>* Farmer's Fridge<br/>... and maybe a couple others that could be modified to be Paleo-friendly</p> <p>Been wanting to try this place out- figured why not with a group :-)</p> ",
    visibility: "public"
  },
  {
    created: 1480432889000,
    duration: 7200000,
    id: "235904648",
    name: "Paleo Holiday Baking w/ Kitchfix!",
    status: "upcoming",
    time: 1481763600000,
    updated: 1480444944000,
    utc_offset: -21600000,
    waitlist_count: 0,
    yes_rsvp_count: 10,
    venue: {
      id: 24128917,
      name: "Kitchfix",
      lat: 41.90374755859375,
      lon: -87.62841796875,
      repinned: false,
      address_1: "1165 N. STATE STREET",
      city: "Chicago",
      country: "us",
      localized_country_name: "USA",
      zip: "",
      state: "IL"
    },
    group: {
      created: 1270657725000,
      name: "Paleo Chicago",
      id: 1626903,
      join_mode: "open",
      lat: 41.880001068115234,
      lon: -87.62000274658203,
      urlname: "PaleoChicago",
      who: "Members"
    },
    link: "https://www.meetup.com/PaleoChicago/events/235904648/",
    description: "<p>** Purchase tickets here:<br/><a href=\"https://www.eventbrite.com/e/paleo-holiday-baking-with-kitchfix-tickets-29595691510\" class=\"linkified\">https://www.eventbrite.com/e/paleo-holiday-baking-with-kitchfix-tickets-29595691510</a></p> <p>(For $8):</p> <p>Join us at Kitchfix Gold Coast for a night of paleo baking! Sip on complimentary spiked vegan nog while we demonstrate and sample our paleo chocolate chip walnut cookies and Simple Mills truffles featuring Vital Proteins grass-fed collagen protein.</p> <p>Registration includes:</p> <p>-Tons of delicious samples!<br/>-Complimentary spiked vegan nog<br/>-Recipe cards<br/>-Special in store discount just for attendees!</p> ",
    visibility: "public"
  }
]


describe('Given Meetup', () => {
  describe('#getUpcomingEvents', () => {
    it('returns an empty object when nothing passed', () => {
      const meetupWeatherFacade = new MeetupWeatherFacade()

      expect(meetupWeatherFacade.getUpcomingEvents()).to.eql({})
    })

    it('returns an object with event name and upcoming event date when group is passed', () => {
      const meetupWeatherFacade = new MeetupWeatherFacade()

      expect(meetupWeatherFacade.getUpcomingEvents('Something')).to.eql({name: 'The Truth About A/B Experimentation with Chris Powers', date: 12/13/2016})
    })

    it('sets an object with the event data', (done) => {
      const meetupClient = new MeetupClient()
      const mockConfiguration = sinon.mock(meetupClient)
      mockConfiguration.expects('getMeetup')
      .twice()
      //    .withArgs('Geekfest')
      .onFirstCall()
      .yields(null, geekfestMock)
      //    .withArgs('PaleoChicago')
      .onSecondCall()
      .yields(null, paleoChicagoMock)



      const meetupWeatherFacade = new MeetupWeatherFacade(meetupClient)

      meetupWeatherFacade.getUpcomingEvents('Geekfest', (error, data, response) => {
        if(error) {
          return done(error)
        }

        const meetupData = data.map((meetup) => ({ name: meetup.name, time: meetup.time }))

        expect(meetupData).to.eql([{name: 'The Truth About A/B Experimentation with Chris Powers', time: 1481652000000}])
        expect(data).to.eql(geekfestMock)

        meetupWeatherFacade.getUpcomingEvents('PaleoChicago', (error, data, response) => {
          if(error) {
            return done(error)
          }

          const meetupData = data.map((meetup) => ({ name: meetup.name, time: meetup.time }))

          expect(meetupData).to.eql([{name: 'Loop Lunch @ Revival Food Hall', time: 1481218200000}, {name: 'Paleo Holiday Baking w/ Kitchfix!', time: 1481763600000}])
          expect(data).to.eql(paleoChicagoMock)
          mockConfiguration.verify()
          done()
        })
      })
    })
  })

  describe('#getNextEvent', () => {
    it('sets an object with the correct event name and upcoming event date for each group passed', (done) => {
      const meetupClient = new MeetupClient()
      const mockConfiguration = sinon.mock(meetupClient)
      mockConfiguration.expects('getMeetup')
      .once()
      .onFirstCall()
      .yields(null, geekfestMock)

      const meetupWeatherFacade = new MeetupWeatherFacade(meetupClient)

      meetupWeatherFacade.getNextEvent('Geekfest', (error, data, response) => {
        if (error) {
          return done(error)
        }

        expect(meetupWeatherFacade.nextEvent).to.eql({name: 'The Truth About A/B Experimentation with Chris Powers', time: 1481652000000})


        mockConfiguration.verify()
        done()
      })
    })

    it('sets an object with the correct event name and upcoming event date for each group passed', (done) => {
      const meetupClient = new MeetupClient()
      const mockConfiguration = sinon.mock(meetupClient)
      mockConfiguration.expects('getMeetup')
      .twice()
      .onFirstCall()
      .yields(null, geekfestMock)
      .onSecondCall()
      .yields(null, paleoChicagoMock)

      const meetupWeatherFacade = new MeetupWeatherFacade(meetupClient)

      meetupWeatherFacade.getNextEvent('Geekfest', (error, data, response) => {
        if (error) {
          return done(error)
        }

        expect(meetupWeatherFacade.nextEvent).to.eql({name: 'The Truth About A/B Experimentation with Chris Powers', time: 1481652000000})

        meetupWeatherFacade.getNextEvent('PaleoChicago', (error, data, response) => {
          if (error) {
            return done(error)
          }

          expect(meetupWeatherFacade.nextEvent).to.eql({name: 'Loop Lunch @ Revival Food Hall', time: 1481218200000})

          mockConfiguration.verify()
          done()
        })
      })
    })

    }) //describe
  }) //describe
