import React, {useContext} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImagePicker from '../Utility/ImagePicker';
import {Button} from 'react-native-paper';
import {database} from '../../firebase';
import {ref, set} from 'firebase/database';
import uuid from 'react-native-uuid';
import {AuthenticatedUserContext} from '../../Store/Provider';

const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

const ArticleCreator = () => {
  const richText = React.useRef();
  const {user} = useContext(AuthenticatedUserContext);
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const {html, setHtml} = React.useState('');

  function extractImgSrc(htmlString) {
    const imgTagRegex = /<img[^>]*?src=["'](.*?)["'][^>]*?>/i;
    const match = htmlString.match(imgTagRegex);
    console.log('the image src: ', match[0]);
    if (match) {
      setImage(match[0]);
      return image; // Return the matched img tag
    }

    return null; // Return null if no img tag is found
  }

  function extractTitle(htmlString) {
    const titleRegex = /<h1[^>]*?>(.*?)<\/h1>/i;
    const match = htmlString.match(titleRegex);
    console.log('The title is ' + match[0]);
    if (match) {
      return setTitle(match[0]); // Return the matched img tag
    }

    return null; // Return null if no img tag is found
  }

  const handlePostSubmit = () => {
    extractImgSrc(html);
    extractTitle(html);
    const postId = uuid.v4();

    set(ref(database, 'Articles/' + postId), {
      id: postId,
      title: title,
      text: html,
      image: src,
      category: "General",
      createdOn: Date.now(),
      authorName: user.firstName + ' ' + user.secondName,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Text style={{fontSize: 20, color: 'grey'}}>Tell your story</Text>
          <RichEditor
            initialHeight={400}
            scrollEnabled={true}
            ref={richText}
            focusable={true}
            onChange={descriptionText => {
              setHtml(descriptionText);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0}}>
        <RichToolbar
          editor={richText}
          actions={[
            actions.undo,
            actions.redo,
            actions.heading1,
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.keyboard,
            actions.setStrikethrough,
            actions.setUnderline,
            // actions.insertVideo,
            // actions.removeFormat,
            // actions.checkboxList,
          ]}
          onPressAddImage={() => ImagePicker(richText)}
          iconMap={{[actions.heading1]: handleHead}}
        />
      </View>
      <Button onPress={handlePostSubmit}>Publish Article</Button>
    </SafeAreaView>
  );
};

export default ArticleCreator;
