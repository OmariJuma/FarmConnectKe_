import { ScrollView,  Dimensions, Alert } from "react-native";
import {Button, Card, Text} from 'react-native-paper';
import { primaryColor } from "../../UI/AppBar";

const cardWidth = Dimensions.get('window').width - 20;

const AllUsers = ({route, navigation}) => {
    const {data} = route.params;
    
    return ( <ScrollView contentContainerStyle={{    flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: 'white',
    }}>
      <Text style={{fontSize: 25, fontWeight: 'bold', marginVertical: 30}}>
        All Chats
      </Text>
      {data.map(chat => (
        <Card
          key={chat._id}
          style={{
            backgroundColor: '#f9f9f9',
            width: cardWidth,
            marginBottom: 30,
          }}>
          {/* <Card.Cover source={{uri: `data:${chat.mimeType};base64,${chat.image}`}} /> */}
          <Card.Title title={"Message: "+chat.text} subtitle={"Sender: "+ chat.user._id} />
          <Card.Content>
            <Text>{chat.phoneNo}</Text>
            <Text>{chat.userRole}</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              buttonColor={primaryColor}
              textColor="white"
              onPress={() => Alert.alert("This feature is not yet complete 😞")}>
              Enter chat
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView> );
}
 
export default AllUsers;