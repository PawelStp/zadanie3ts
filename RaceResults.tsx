import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

interface ResultResponse {
    MRData: {
        RaceTable: {
            Races: [{
                Results: Result[]
            }]
        }
    }
}

interface Result {
    Position: number,
    Driver: {
        givenName: string,
        familyName: string,
        nationality: string,
        dateOfBirth: string
    },
    Constructor: {
        name: string,
        nationality: string
    }
    Time: {
        time: string
    },
    status: string
}

export default function RaceResults({ route: { params }, navigation }) {
    const [results, setResults] = useState<Result[]>();

    useEffect(() => {
        fetch(`http://ergast.com/api/f1/${params.sezon}/circuits/${params.wyscig.circuitId}/results.json`)
            .then(response => response.json() as Promise<ResultResponse>)
            .then(response => {
                const r = response.MRData.RaceTable.Races.map(r => r.Results);
                console.log(`ttp://ergast.com/api/f1/${params.sezon}/circuits/${params.wyscig.circuitId}/results.json`);
                setResults(r[0]);
            });
    }, []);

    return (<View>
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
        navigation.navigate('Result Details', {
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
                <Text style={styles.resultStyle2} >{(result.Time?.time ?? result.status)}</Text>
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