import React, {useState, useLayoutEffect, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {onValue, push, update, ref, query,} from 'firebase/database';
import {signOut} from 'firebase/auth';
import {auth, database} from '../..//firebase';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from 'react-native-vector-icons';
import uuid from "react-native-uuid";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const token = auth?.currentUser?.email;

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color={'f9f9f9'}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const chatsRef = ref(database, 'Chats/');
    const orderedChatsQuery = query(chatsRef);
  
    const unsubscribe = onValue(orderedChatsQuery, (snapshot) => {
      if (snapshot.exists()) {
        setMessages(Object.values(snapshot.val()));
      } else {
        console.log('Empty database or has not yet fetched');
      }
    });
  
    return unsubscribe;
  }, []);
  const onSend = useCallback((messages = []) => {
    const { user } = messages[0];
    const newId = uuid.v4(); // Generate a new ID for the chat
    const newMessages = messages.map((message) => ({
      ...message,
      _id: newId, // Generate unique ID for each message
    }));
  
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  
    push(ref(database, 'Chats/'), {
      _id: newId,
      createdAt: new Date(),
      text: messages[0].text,
      user
    });
  }, []);
  
  return (
    <GiftedChat
      messages={messages.reverse()}
      showAvatarForEveryMessage={true}
      showUserAvatar={false}
      inverted={true}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      textInputStyle={{
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      }}
  
    />
  );
}
