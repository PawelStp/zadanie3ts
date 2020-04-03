

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker, FlatList, ScrollView } from 'react-native';

interface Result {
    MRData: {
        StandingsTable: {
            StandingsLists: [{
                DriverStandings: DriverStandings[]
            }]
        }
    }
}

interface DriverStandings {
    position: number,
    points: number,
    Driver: {
        givenName: string,
        familyName: string,
        dateOfBirth: string,
        nationality: string
    },
}

export default function Standings({ route: { params }, navigation }) {
    const [results, setResults] = useState<DriverStandings[]>();

    console.log(params)
    useEffect(() => {
        fetch(`http://ergast.com/api/f1/${params.sezon}/${params.wyscig.round}/driverStandings.json`)
            .then(response => response.json() as Promise<Result>)
            .then(response => {
                setResults(response.MRData.StandingsTable.StandingsLists.map(x => x.DriverStandings)[0]);
            });
    }, []);

    return (<View >
        <Text style={styles.header}>{params.wyscig.circuitName} {params.sezon}</Text>
        <ScrollView>
            <View style={styles.MainContainer}>
                <FlatList data={results}
                    renderItem={({ item }) => <Item result={item} navigation={navigation} />}
                />
            </View>
        </ScrollView>

    </View>)
}


function Item({ result, navigation }) {
    const handleResult = (result: Result) => {
        navigation.navigate('Standings Details', {
            result
        });
    }

    return (
        <TouchableOpacity
            onPress={() => handleResult(result)}
        >
            <View style={styles.container}>
                <Text style={styles.resultStyle1} >{result.position} </Text>
                <Text style={styles.resultStyle2} >{result.Driver.givenName} {result.Driver.familyName}</Text>
                <Text style={styles.resultStyle2} >{(result.points)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 10,
    },
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#7a42f4",
        margin: 5
    },
    resultStyle1: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 20
    },
    resultStyle2: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 260
    },
    resultStyle3: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 100
    },
});