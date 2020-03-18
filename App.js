import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
import ImgToBase64 from 'react-native-image-base64'

class App extends Component {
  constructor() {
    super()
    this.state =
    {
      data: 'data'
    }
  }

  imageBase64() {
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true
    })
      .fetch("GET", 'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
      .then(resp => {
        imagePath = resp.path();
        return resp.readFile("base64");
      })
      .then(base64Data => {
        this.setState({ data: 'data:image/jpeg;base64,' + base64Data })
        return fs.unlink(imagePath);
      });
  }

  offline() {
    ImgToBase64.getBase64String(require('./assets/Chat.png'))
      .then(base64String => console.log(base64String))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appHeader}>
          <Text style={styles.headerText}>Image to base64 encoding and decoding</Text>
        </View>
        <View style={styles.mainScreen}>
          <Image style={styles.image} source={{ uri: this.state.data }}></Image>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.imageBase64.bind(this)}>
            <Text style={styles.buttonText}>ENCODE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.offline.bind(this)}>
            <Text style={styles.buttonText}>OFFLINE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appHeader: {
    height: '8.5%',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  headerText: {
    marginTop: '4.25%',
    fontWeight: 'normal',
    fontSize: 19,
    color: 'snow'
  },
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer:
  {
    height: 40,
    width: '30%',
    margin: 3,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  buttonText:
  {
    fontSize: 18,
    color: 'snow',
  },
  image: {
    height: '30%',
    width: '45%',
    backgroundColor: 'black'
  }
})