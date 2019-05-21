import React from 'react';
import { StyleSheet, Text, View,Platform,TextInput,KeyboardAvoidingView,ImageBackground,ActivityIndicator,StatusBar,Button} from 'react-native';

import { fetchLocationId, fetchWeather ,fetchAutoLocation} from './utils/api';
import getImageForWeather from './utils/getImageForWeather'
import SearchInput from './components/SearchInput'

export default class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      loading: false, 
       error: false,
       location: '', 
       temperature: 0, 
       weather: '',
        };
    }

    componentDidMount() {
      this.handleUpdateLocation('Delhi');
   }

    handleAutoLocation = async () => {
      const city = await fetchAutoLocation();
      this.handleUpdateLocation(city);
    }
    handleUpdateLocation = async city => { 
      if (!city) return;
      console.log("city passed",city) 
      this.setState({ loading: true }, async () => { try 
        {
          console.log("calling function now")
        const locationId = await fetchLocationId(city);
        console.log("after function call",locationId);
        const { location, weather, temperature } = await fetchWeather(
                  locationId,
                );
             
        this.setState({ loading: false, error: false, location, weather, temperature,
        });
        console.log(location)
        } 
        catch (e) {
        this.setState({ loading: false, error: true,
        }); }
        });
    };
  render() {
    const { loading, error, location, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground 
      source={getImageForWeather(weather)}
      style={styles.imageContainer}
      imageStyle={styles.image}
      >
      <View style={styles.detailsContainer}>
      <ActivityIndicator animating={loading} color="white" size="large" />
      {!loading && (
       <View>
        {error && (<Text style={[styles.smallText, styles.textStyle]}>
           Could not load weather, please try a different city.</Text>
        )}
      {!error && (
      <View>
       <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
        </View>
        )}
        <SearchInput placeholder="Search any city" onSubmit={this.handleUpdateLocation}/>
        <View style={[{ width: "100%", margin: 10,justifyContent: 'center',backgroundColor: "black" }]}>
        <Button onPress={this.handleAutoLocation}
          title="AutoDetect Location"
          color="#33cc33"
          accessibilityLabel="Autodetect Location"
         />
        </View>
        </View>
      )}
      </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer:{
   flex:1
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
},
  image:{
    flex: 1,
    width: null, 
    height: null, 
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  
});
