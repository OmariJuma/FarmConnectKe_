import {View, StyleSheet} from 'react-native';
import {Avatar, Text} from 'react-native-paper';

const ArticleInfo = props => {
  return (
    <>
      <View style={styles.miniContainer}>
        <Avatar.Icon
          icon="account-circle"
          size={props.size}
          color="grey"
          style={{backgroundColor: 'white'}}
        />
        <Text style={styles.adtnlText}>Author: {props.author}</Text>
      </View>
      <View style={styles.miniContainer}>
        <Avatar.Icon
          icon="clock"
          size={props.size}
          color="grey"
          style={{backgroundColor: 'white'}}
        />
        <Text style={styles.adtnlText}>Posted: {props.date}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  adtnlText: {
    color: 'grey',
    fontSize: 12,
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
