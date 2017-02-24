import React , {Component} from 'react';
import Badge from './Badge';
import ViewWeb from './ViewWeb';
import api from '../Utils/api';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    flexGrow:1,
    backgroundColor: 'white',
  },
  description:{
    fontSize:14,
    paddingBottom:5,
  },
  rowContainer:{
    padding:10,
    flexDirection:'column',
    flex:1,
  },
  name:{
    color:'#48bbec',
    fontSize:18,
    paddingBottom:5,
  },
  stars:{
    fontSize:14,
    color:'#48bbec',
    paddingBottom:5,
  },
  separator:{
    height:1,
    marginLeft:15,
    marginTop:3,
    flex:1,
    backgroundColor:'#eaeaea',
  }
});

export default class Repos extends Component{

  constructor(props){
    super(props);
    this.state = {
      page:this.props.nuevoState||1
    }
  }
  openPage(url){
    this.props.navigator.push({
      component: ViewWeb,
      title: 'Web View',
      passProps:{url}
    });
  }
  nextPage(){
    let nextList = this.props.userInfo.public_repos;
    let pagina = this.state.page + 1;
    console.log(pagina);
    if(nextList>50){
      let nuevoResult = Math.ceil(nextList / 50);
      console.log(nuevoResult);
      this.setState({
        page:pagina
      })
      console.log(pagina);
      if(pagina>=nuevoResult){
        this.setState({
          page:nuevoResult
        })
        console.log(pagina);
      }
      api.getRepos(this.props.userInfo.login , pagina)
        .then((res)=> {
          if(pagina>nuevoResult){
            this.props.navigator.pop();
          }else{
            this.props.navigator.push({
              title: `Pagina ${pagina}`,
              component: Repos,
              passProps: {
                userInfo: this.props.userInfo,
                repos: res,
                nuevoState: pagina
              }
            });
          }

        });
    }

  }
  render(){
    let next = (this.props.userInfo.public_repos>50)?(<View style={styles.rowContainer}>
      <TouchableHighlight
        onPress={this.nextPage.bind(this)} underlayColor='rgba(0,0,0,0.3)'>
        <Text style={{flex:1,alignSelf: 'stretch',marginLeft:10,marginRight:10,borderRadius:10,textAlign:'center',color:'white',backgroundColor:'skyblue',padding:10, fontSize:18,}}>{(Math.ceil(this.props.userInfo.public_repos / 50) > this.state.page)?'Siguiente':'Atras'}</Text>
      </TouchableHighlight>
    </View>):(<View style={styles.rowContainer}><Text style={styles.name}> </Text></View>);

    let repos = this.props.repos;
    let list = repos.map((item,index)=>{
      let desc = repos[index].description?<Text style={styles.description}>{repos[index].description}</Text>:<View/>;
      return (
        <View key={index}>
          <TouchableHighlight
            onPress={this.openPage.bind(this,repos[index].html_url)} underlayColor='rgba(0,0,0,0.3)'>
            <View style={styles.rowContainer}>
              <Text style={styles.name}>{repos[index].name}</Text>
              <Text style={styles.stars}> Stars: {repos[index].stargazers_count}</Text>
              {desc}
            </View>
          </TouchableHighlight>
          <View style={styles.separator}/>
        </View>
      )
    });
    return(
        <ScrollView style={styles.container}>
          <Badge userInfo={this.props.userInfo} />
          {list}
          {next}
        </ScrollView>
    );
  }
}

Repos.propTypes={
  userInfo: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired,
  nuevoState: React.PropTypes.number
};
