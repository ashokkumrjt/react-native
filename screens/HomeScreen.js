import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import ExpoGraphics from 'expo-graphics';

// console.disableYellowBox = true;

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  onContextCreate = async({gl, scale, width, height, arSession}) => {
    
    this.renderer = new ExpoTHREE.Renderer({gl});
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);

    // Initialize scene...
    this.scene = new THREE.Scene();
    this.scene.background = ExpoTHREE.createARBackgroundTexture(arSession, this.renderer);

    // Initialize camera...
    this.camera = ExpoTHREE.createARCamera(arSession, width / scale, height / scale, 0.01, 1000);
  }

  onRender = (delta) => {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
      return (
          <ExpoGraphics.View style={{flex:1}}
              onContextCreate={this.onContextCreate}
              onRender={this.onRender}
              arEnabled={true}
          />
      );
  }

}

const styles = StyleSheet.create({
});
