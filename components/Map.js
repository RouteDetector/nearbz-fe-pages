import React, {useState, useEffect, useMemo} from 'react';
import { View, Image, Animated, Text, Easing } from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import { startImageRotateFunction } from '../services/rotation';
import Orientation from 'react-native-orientation-locker';
import PeopleNotifier from '../services/testNotifier';
import { fetchAllPeople } from '../services/people';
import { styles } from '../styles/map';

const Map = () => {
    
    let interval;
    let lon = 0;
    const [degree, setDegree] = useState(0);
    const [people, setPeople] = useState([]);
    const [rotation, setRotation] = useState(null);
    const [removePerson, setRemovePerson] = useState(0);
    const [updatePerson, setUpdatePerson] = useState(0);
    const [addPerson, setAddPerson] = useState(0);

    /////////////////////////////////////////////// listeners
    const updateLocationListener = (person) => {
        setUpdatePerson(person);
    }
    
    const addPersonListener = (person) => {
        setAddPerson(person);
    }
    
    const removePersonListener = (person) => {
        setRemovePerson(person);
    }

    useEffect(() => {
        if(addPerson == null)
            return;

        people.push(addPerson);
        setPeople(people);
    }, [addPerson]);

    useEffect(() => {
        if(people.length === 0)
            return;

        var i = 0;
        while (i < people.length) {
            if (people[i].personId === updatePerson["id"]) {
                people[i].angle = updatePerson.angle;
                setPeople(people);''
               break;
            }
            i++;
        }
    }, [updatePerson]);

    useEffect(() => {
        if(people.length === 0)
            return;

        console.log("remove", removePerson);
        var i = 0;
        while (i < people.length) {
            if (people[i]["id"] === removePerson["id"]) {
                break;
            }
            i++;
        }
        people.splice(i, 1)
        setPeople(people);
    }, [removePerson]);

    // useEffect(() => {
    //     people[0].angle = 20 + people[0].angle;
    //     setPeople(people);

    //     if (people.length > 0 && people.length < 5) {
    //         let name = people[0].name + Math.floor(Date.now() / 1000);
    //         let person = { name: name, angle: 90, currentDegree: new Animated.Value(0), currentDistance: new Animated.Value(0), image: require('./resources/icon1.png')};

    //         let rotateData = person.currentDegree.interpolate({
    //             inputRange: [0, 360],
    //             outputRange: ['0deg', '360deg'],
    //         });
    //         person.rotateData = rotateData;

    //         let rotateOposite = person.currentDegree.interpolate({
    //             inputRange: [0, 360],
    //             outputRange: ['0deg', '-360deg'],
    //         });
    //         person.rotateOposite = rotateOposite;
    //         people.push(person);
    //         setPeople(people);
    //     }
    // }, [u]);

    ///////////////////////////////////////////////// update location
    useEffect(() => {
        startImageRotateFunction(degree, people);
    }, [rotation]);

    const updateLocation = () => {
        setRotation(lon++);
    }

    useEffect(() => {
        if(people.length == 0)
            return;

        interval = setInterval(updateLocation, 200);
        return () => {
            clearInterval(interval);
        };
    }, [people]);

    ////////////////////////////////////////// start application lifecycle event
    useEffect(() => {
        let peop = fetchAllPeople();
        setPeople(peop);
                
        Orientation.lockToPortrait();

        let peopleNotifier = new PeopleNotifier();
        peopleNotifier.subscribeUpdateLocation(updateLocationListener);
        peopleNotifier.subscribeAddPeople(addPersonListener);
        peopleNotifier.subscribeRemovePeople(removePersonListener);

        const degree_update_rate = 0.1;
        CompassHeading.start(degree_update_rate, degree => {
            setDegree(degree);
        });
        
        return () => {
            CompassHeading.stop();
        };
    }, []);

    return useMemo(() => { return (
        <View style={[styles.container]}>
            {people.map((person, index) => {

                let transformItem ={
                    transform : [
                    { rotate: person.rotateData}
                    ]
                };

                let transformImageCont ={
                    transform : [
                    { translateY : person.currentDistance},
                    { rotate: person.rotateOposite}
                    ]
                };

                return <Animated.View key={person.name} style={[styles.item, transformItem]}>
                    <Animated.View key={person.angle} style={[styles.image_container, transformImageCont]}>
                        <Image 
                            style={[styles.image]}
                            resizeMode="contain"
                            source={ person.image }
                        />
                        </Animated.View>
                    </Animated.View>
            })}
            <Image 
                style={styles.image}
                resizeMode="contain"
                source={require('../resources/icon1.png')}
            />
            </View>
    )},[people]);
}
export default Map