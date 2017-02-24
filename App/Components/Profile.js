import React , {Component} from 'react';
import Badge from './Badge';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white',
  },
  buttonText:{
    alignSelf:'center',
    fontSize:18,
    color:'white',
  },
  rowContainer:{
    padding:10,
    backgroundColor: 'white',
  },
  rowTitle:{
    color:'#48bbec',
    fontSize:16,
  },
  rowContent:{
    fontSize:19
  },
  separator:{
    height:1,
    marginLeft:15,
    marginTop:3,
    flex:1,
    backgroundColor:'#eaeaea',
  }
});

export default class Profile extends Component{
  getRowTitle(user,item){
    item = (item === 'public_repos')?item.replace('_',' '):item;
    return item[0]?item[0].toUpperCase() + item.slice(1):item;
  }
  render(){
    let userInfo = this.props.userInfo;
    let arreglo = ['company','location','followers','following','email','bio','public_repos'];
    let list = arreglo.map((item,index)=>{
      if(!userInfo[item]){
        return <View key={index}/>
      }else {
        return(
          <View key={index} style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{this.getRowTitle(userInfo , item)}</Text>
            <Text style={styles.rowContent}>{userInfo[item]}</Text>
            <View style={styles.separator} />
          </View>
        );
      }
    });
    return(
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
}
