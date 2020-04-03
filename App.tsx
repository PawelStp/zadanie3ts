import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RaceResults from './RaceResults';
import ResultDetails, { QualiResultDetails, StandingsDetails } from './ResultDetails';
import QualiResults from './QualiResults';
import Standings from './Standings';
const Stack = createStackNavigator();

interface Data {
  MRData: {
    SeasonTable: {
      Seasons: [{
        season: number
      }]
    }
  }
}

interface CircuitResponse {
  MRData: {
    RaceTable: {
      Races: [{
        Circuit: {
          circuitName: string,
          circuitId: string
        }
        raceName: string,
        round: number
      }]
    }
  }
};

interface WyscigModel {
  Circuit: {
    circuitName: string,
    circuitId: string
  }
  raceName: string,
  round: number
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Race Results" component={RaceResults} />
        <Stack.Screen name="Quali Results" component={QualiResults} />
        <Stack.Screen name="Standings" component={Standings} />
        <Stack.Screen name="Result Details" component={ResultDetails} />
        <Stack.Screen name="Standings Details" component={StandingsDetails} />
        <Stack.Screen name="Quali Result Details" component={QualiResultDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [sezony, setSezony] = useState<number[]>([]);
  const [wyscigi, setWyscigi] = useState<WyscigModel[]>([]);
  const [sezon, setSezon] = useState<number>();
  const [wyscig, setWyscig] = useState<string>();

  useEffect(() => {
    fetch('https://ergast.com/api/f1/seasons.json?limit=100&offset=0')
      .then((res) => res.json() as Promise<Data>)
      .then((res) => {
        setSezony(res.MRData.SeasonTable.Seasons.map(item => item.season));
      });
  }, []);

  const getCircuits = ((year: number) => {
    fetch(`http://ergast.com/api/f1/${year}.json`)
      .then(res => res.json() as Promise<CircuitResponse>)
      .then(res => {
        setSezon(year);
        setWyscigi(res.MRData.RaceTable.Races);
      });
  });

  const showRaceResult = () => {
    const wys = wyscigi.filter(x => x.Circuit.circuitId === wyscig)[0];
    navigation.navigate('Race Results', {
      sezon,
      wyscig: {
        circuitId: wys.Circuit.circuitId,
        circuitName: wys.raceName
      }
    });
  }

  const showQualiResult = () => {
    const wys = wyscigi.filter(x => x.Circuit.circuitId === wyscig)[0];
    navigation.navigate('Quali Results', {
      sezon,
      wyscig: {
        circuitId: wys.Circuit.circuitId,
        circuitName: wys.raceName
      }
    });
  }

  const showStandings = () => {
    const wys = wyscigi.filter(x => x.Circuit.circuitId === wyscig)[0];
    navigation.navigate('Standings', {
      sezon,
      wyscig: {
        round: wys.round,
        circuitName: wys.raceName
      }
    });
  }

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.text}>Wybierz sezon</Text>
      <View style={homeStyles.pickerContainer}>
        <Picker
          selectedValue={sezon}
          style={homeStyles.picker}
          onValueChange={(itemValue) => {
            getCircuits(itemValue);
          }}>
          {sezony.map((item, inde) => {
            return (<Picker.Item label={item.toString()} value={item} key={item} />)
          })}
        </Picker>
      </View>

      <Text style={homeStyles.text}>Wybierz etap</Text>
      <View style={homeStyles.pickerContainer}>
        <Picker
          selectedValue={wyscig}
          style={homeStyles.picker}
          onValueChange={itemValue => { setWyscig(itemValue) }}>
          {wyscigi.map((item, inde) => {
            return (<Picker.Item label={item.raceName.toString()} value={item.Circuit.circuitId} key={item.Circuit.circuitId} />)
          })}
        </Picker>
      </View>
      <View style={homeStyles.button}>
        <Button color="#7a42f4" title="Znajdz wyścig" onPress={showRaceResult} />
      </View>
      <View style={homeStyles.button}>
        <Button color="#7a42f4" title="Pokaż wyniki kwalifikacje" onPress={showQualiResult} />
      </View>
      <View style={homeStyles.button}>
        <Button color="#7a42f4" title="Pokaż kalsyfikację generalną " onPress={showStandings} />
      </View>
    </View >
  );
}

const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 400,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    paddingHorizontal: 10
  },
  picker: {
    margin: 15,
    height: 40,
    borderBottomWidth: 1,
    width: 200,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#7a42f4",
  },
  button: {
    borderRadius: 3,
    marginTop: 14,
    width: 200,
    backgroundColor: "#7a42f4",
    height: 50
  },
  submitButtonText: {
    color: 'white'
  },
  select: {
    borderColor: "#7a42f4",
    borderWidth: 1,
    margin: 15,
    height: 40,
  }
});

