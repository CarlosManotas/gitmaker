##App para charla de react-native basado en el curso de [egghead.io](https://egghead.io/courses/react-native-fundamentals)

### Gitmaker ###
>v.0.1.0

###Caracteristicas:
* App en react-native
* IOS
* ANDROID


> Antes de descargar o clonar este repositorio desbes seguir primero todos los pasos de instalacion en la documentacion oficial de [React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)


### 1.Como empezar
#### Correr comandos

```bash
react-native run-ios
```

o.


```bash
react-native run-android
```
### 2. Modifica el archivo app.js o en el directorio /App los archivos necesarios
Muestra de la estructura del archivo App/Main.js.
Prueba cambiando la palabra Buscar

```html
render() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.firstTex}>Buscar Usuarios de Github</Text>
      <TextInput
        placeholder=' Nombre'
        style={styles.inputField}
        value={this.state.username}
        onChange={this.handleChange.bind(this)}/>
      <TouchableHighlight
        style={styles.touchField}
        underlayColor='#ddd'
        onPress={this.handleSubmit.bind(this)} >
        <Text style={styles.secondTex}>Buscar</Text>
      </TouchableHighlight>
      <ActivityIndicator
        animating={this.state.isLoading}
        size='large'
        style={{height:100}}>
      </ActivityIndicator>
    </View>
  );
}
```
### 3.Es hora de jugar
Esto es todo, diviertanse .


License
------------
The MIT License (MIT)
