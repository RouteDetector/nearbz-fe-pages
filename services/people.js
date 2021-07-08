import { Animated } from 'react-native';

export const fetchAllPeople = () =>{

    let people = [];

    //test data
    people.push({personId: 1, name:"Katrin", angle: 25, currentDegree: new Animated.Value(0), currentDistance: new Animated.Value(0), image: require('../resources/icon1.png')});
    people.push({personId: 2, name:"Natasha", angle: 25, currentDegree: new Animated.Value(0), currentDistance: new Animated.Value(0), image: require('../resources/icon2.png')});
    people.push({personId: 3, name:"Kia", angle: 35, currentDegree: new Animated.Value(0), currentDistance: new Animated.Value(0), image: require('../resources/icon3.png')});
    people.push({personId: 4, name:"Zoe", angle: 20, currentDegree: new Animated.Value(0), currentDistance: new Animated.Value(0), image: require('../resources/icon4.png')});
    
    people.forEach(person => {

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

    });

    return people; 
}