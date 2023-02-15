import "react-native-gesture-handler";
import {AppRegistry,Text,TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import { persistor, Persistor ,store} from "./redux-toolkit/store";
import { PersistGate } from "redux-persist/integration/react";

const Root = () =>(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App/>

      </PersistGate>
 

  
    </Provider>
)


AppRegistry.registerComponent(appName, () => Root);



if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
 }
  
   if (TextInput.defaultProps == null) {
     TextInput.defaultProps = {};
     TextInput.defaultProps.allowFontScaling = false;
   }
