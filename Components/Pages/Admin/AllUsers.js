import { ScrollView,  Dimensions, Alert } from "react-native";
import {Button, Card, Text} from 'react-native-paper';

const cardWidth = Dimensions.get('window').width - 20;

const AllUsers = ({route}) => {
    const {data} = route.params;
    const deleteHandler = id => {
        Alert.alert(
          'Are you sure you want to delete this user?',
          "Press 'No' to cancel\nPress 'Yes' to delete",
          [
            {
              text: 'No',
            },
            {
              text: 'Yes',
              onPress: () => {
                remove(ref(database, 'Articles/' + id)).then(snapshot => {
                  console.log('After deletion', snapshot);
                  Toast.success('Article deleted successfully', 'top');
                });
              },
            },
          ],
        );
      };
    
    return ( <ScrollView contentContainerStyle={{    flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: 'white',
    }}>
      <Text style={{fontSize: 25, fontWeight: 'bold', marginVertical: 30}}>
        All Users
      </Text>
      {data.map(user => (
        <Card
          key={user.id}
          style={{
            backgroundColor: '#f9f9f9',
            width: cardWidth,
            marginBottom: 30,
          }}>
          {/* <Card.Cover source={{uri: `data:${user.mimeType};base64,${user.image}`}} /> */}
          <Card.Title title={user.firstName+ " "+ user.secondName} subtitle={user.email} />
          <Card.Content>
            <Text>{user.phoneNo}</Text>
            <Text>{user.userRole}</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              buttonColor="tomato"
              icon={'delete'}
              textColor="white"
              onPress={() => deleteHandler(user.id)}>
              Delete
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView> );
}
 
export default AllUsers;