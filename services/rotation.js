import {Animated, Easing} from 'react-native';

let finalDegree = 0;
let defaultDistance = 0;
let circleRadius = 40;
let distances = [];
let mainCircleRadius = 160;

export const startImageRotateFunction = (tempDegree, people) => {

    resetCurrentDistance(people.length);

    let normalizedPosition = finalDegree;

    if (normalizedPosition >= 360) {
        normalizedPosition = normalizedPosition % 360;
    } else if (normalizedPosition < 0) {
        normalizedPosition = 360 + normalizedPosition;
    }

    let nextVal = 360 - tempDegree;

    //update new value for final position
    if (normalizedPosition > 180 + nextVal) {
        finalDegree = nextVal + 360;
    } else if (nextVal > normalizedPosition + 180) {
        finalDegree = nextVal - 360;
    } else {
        finalDegree = nextVal;
    }

    for (let i = 0; i < people.length; i++) {
        let person = people[i];

        //update current position with normalized value
        person.currentDegree.setValue(normalizedPosition + person.angle);

        Animated.timing(person.currentDegree, {
            toValue: finalDegree + person.angle,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        if (i == 0) continue;

        let angle = person.angle;
        
        for (let j = i-1; j >= 0 ; j--) {
            let angleThreshold = Math.asin(circleRadius / (mainCircleRadius + getCurrentDistance(j))) * 180 / Math.PI * 2;
            let a = Math.abs(angle - people[j].angle);
            let angleDif = Math.min(a, 360 - a);

            if (angleDif < angleThreshold) {
                let value = getDistance(angleDif, circleRadius * 2, mainCircleRadius + getCurrentDistance(j));

                if (value > getCurrentDistance(i)) {
                    setCurrentDistance(i, value);
                }
            }
        }
        
        Animated.timing(person.currentDistance, {
            toValue:  - getCurrentDistance(i),
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }
}

const getCurrentDistance = (i) => {
    if (distances[i]) {
        return distances[i];
    } else {
        return defaultDistance;
    }
}

const resetCurrentDistance = (len) => {
    for (let i = 0; i < len ; i++) {
        distances[i] = 0;
    }
}

const setCurrentDistance = (i, value) => {
    distances[i] = value;
}

const getDistance = (beta, b, c) => {
    let betaRad = beta * Math.PI / 180;
    sinusC = Math.sin(betaRad)/b*c;
    gamaRad = Math.asin(sinusC);
    let gama = gamaRad *180 / Math.PI;
    alpha = 180 - beta - gama;
    
    let alphaRad = alpha * Math.PI / 180;
    a = Math.sin(alphaRad) * b / Math.sin(betaRad);
    a = Math.min(a, b + c);
    return a - mainCircleRadius;
}