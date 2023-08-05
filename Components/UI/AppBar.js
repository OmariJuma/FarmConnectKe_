import { Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"
import { Platform, StyleSheet } from "react-native";

export const primaryColor = "#51a539";
export const primaryColorVariant = "#467061";
export const grey = "#bcbdbc";
const AppBar = () => {
    const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

    return (<Appbar.Header style={styles.container}>
        <Appbar.Content color={"white"} title="FarmConnectKe" subtitle={'Subtitle'} />
         {/* <Appbar.Action color={"white"} icon="magnify" onPress={() => {}} />
         <Appbar.Action color={"white"} icon={MORE_ICON} onPress={() => {}} />
         <Appbar.Action color={"white"} icon="menu" onPress={()=>{}} /> */}
     </Appbar.Header>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor:primaryColor,
      borderBottomColor:primaryColor,
      borderBottomWidth:1,
    }});
  
 
export default AppBar;