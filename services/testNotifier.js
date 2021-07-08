import { fetchAllPeople } from './people';
import { Animated } from 'react-native';

export default class PeopleNotifier  {
 
    subscribeUpdate(fn) {
        this.handlersUpdate.push(fn);
    }

    subscribeUpdateLocation(fn) {
        this.handlersUpdateLocation.push(fn);
    }
 
    subscribeAddPeople(fn) {
        this.handlersAddPeople.push(fn);
    }

    subscribeRemovePeople(fn) {
        this.handlersRemovePeople.push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    constructor() {
        this.handlersUpdate = [];  // observers

        this.handlersUpdateLocation = [];  // observers
        this.intervalUpdateLocation = setInterval(() => {
            let person = {id: 1, angle: 50};
     
            this.handlersUpdateLocation.forEach(function(item) {
                item.call(this, person);
            });
        }, 5000);

        this.handlersAddPeople = [];  // observers
        this.intervalAddPeople = setInterval(() => {
            let person = {id: 5, name:"Suzy", angle: 60, currentDegree: new Animated.Value(0), currentDistance: new Animated.Value(0), image: require('../resources/icon2.png')};
            
            let rotateData = person.currentDegree.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
            });
            person.rotateData = rotateData;

            let rotateOposite = person.currentDegree.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '-360deg'],
            });
            person.rotateOposite = rotateOposite;

            this.handlersAddPeople.forEach(function(item) {
                item.call(this, person);
            });
        }, 10000);

        this.handlersRemovePeople = [];  // observers
        this.intervalRemovePeople = setInterval(() => {
            let person = {id: 3};
             
            this.handlersRemovePeople.forEach(function(item) {
                item.call(this, person);
            });
        }, 15000);

    }
}