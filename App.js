import React from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {ShakeEventExpo} from './ShakeEventExpo';
let paddock = require('./Paddock.json');
let ville = require('./Ville.json');
let radio_props = [
    {label: 'paddock   ', value: 0 },
    {label: 'ville', value: 1 }
];
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            paddock: paddock,
            ville: ville,
            restau: '',
            value: 0
        };
    }

    choose(){
        if(this.state.value === 0){
            let index = Math.floor(Math.random() * this.state.paddock.length);
            this.setState({restau:this.state.paddock[index].name});
            console.log(index)
        }else{
            let index = Math.floor(Math.random() * this.state.ville.length);
            this.setState({restau:this.state.ville[index].name})
        }
    }

    componentWillMount() {
        ShakeEventExpo.addListener(() => {
            this.choose();
            Vibration.vibrate([0, 500, 200, 500]);
        });
    }

    componentWillUnmount() {
        ShakeEventExpo.removeListener();
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Où t'es ? </Text>
          <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              onPress={(value) => {this.setState({value})}}
          />

          <Text> Vous allez mangez chez : </Text>
          <Text> {this.state.restau} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    title: {
    }
});
