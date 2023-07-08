import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import { primaryColorVariant } from './AppBar';

const ArticleInfo = props => {
  return (
    <>
      <View style={styles.miniContainer}>
        <Avatar.Icon
          icon="account-circle"
          size={props.size}
          color={primaryColorVariant}
          style={{backgroundColor: 'white'}}
        />
        <Text style={styles.adtnlText}>Author: {props.author}</Text>
      </View>
      <View style={styles.miniContainer}>
        <Avatar.Icon
          icon="clock"
          size={props.size}
          color={primaryColorVariant}
          style={{backgroundColor: 'white'}}
        />
        <Text style={styles.adtnlText}>Posted: {props.date}</Text>
      </View>
      <TouchableOpacity style={styles.miniContainer}>
        <Avatar.Icon
          icon="bookmark-plus"
          size={props.size}
          color={primaryColorVariant}
          style={{backgroundColor: 'white'}}
        />
        <Text style={styles.adtnlText}>Read Later</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  adtnlText: {
    color:{primaryColorVariant},
    fontSize: 12,
    fontWeight:"700"
  },
  miniContainer: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 5,
    alignItems: 'center',
  },
});
export default ArticleInfo;
