import React , {Component} from 'react';
import Profile from './Profile';
import api from '../Utils/api';
import Repos from './Repos';
import Notas from './Notas';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  Platform
} from 'react-native';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
  }
  backgroundMake(btn){
    var obj ={
      flexDirection:'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex:1
    }
    if(btn===0){
      obj.backgroundColor = 'deepskyblue';
    }else if (btn===1) {
      obj.backgroundColor = 'blue';
    }else {
      obj.backgroundColor = 'midnightblue';
    }
    return obj;
  }
  goToProfile(){
    this.props.navigator.push({
      title: 'Perfil',
      component: Profile,
      passProps: {userInfo: this.props.userInfo,navigator: this.props.navigator}
    });
  }
  goToRepo(){
    api.getRepos(this.props.userInfo.login)
      .then((res)=> {
        this.props.navigator.push({
          title: 'Repositorios',
          component: Repos,
          passProps: {
            userInfo: this.props.userInfo,
            repos: res,
            navigator: this.props.navigator
          }
        });
      });
  }
  goToNotes(){
    api.getNotes(this.props.userInfo.login)
      .then((res)=>{
        res=res||{};
        this.props.navigator.push({
          title: 'Notas',
          component: Notas,
          passProps: {userInfo: this.props.userInfo,notes:res,navigator: this.props.navigator}
        });
      })

  }
  render(){
    return(
      <View style={Platform.OS==='ios'?styles.dashboardContainerIos:styles.dashboardContainer}>
        <Image
          style={{height:350}}
          source={{uri:this.props.userInfo.avatar_url}}/>
          <TouchableHighlight
            style={this.backgroundMake(0)}
            underlayColor='rgba(0,0,0,0.3)'
            onPress={this.goToProfile.bind(this)} >
            <Text
              style={styles.dashboardTouchField}>
              Ver Perfil
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.backgroundMake(1)}
            underlayColor='rgba(0,0,0,0.3)'
            onPress={this.goToRepo.bind(this)} >
            <Text
              style={styles.dashboardTouchField}>
              Ver Repos
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.backgroundMake(2)}
            underlayColor='rgba(0,0,0,0.3)'
            onPress={this.goToNotes.bind(this)} >
            <Text
              style={styles.dashboardTouchField}>
              Ver Notas
            </Text>
          </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  dashboardContainerIos: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  dashboardTouchField:{
    fontSize:24,
    alignSelf: 'center',
    color:'white',
  },
});
