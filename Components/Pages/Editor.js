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
  const {user, insertedImg, setInsertedImg} = useContext(AuthenticatedUserContext);
  const [title, setTitle] = React.useState("");
  const [html, setHtmlText] = React.useState("");
  
  function extractTitle() {
    const titleRegex = /<h1[^>]*?>(.*?)<\/h1>/i;
    const match = html.match(titleRegex);
    console.log("the title: ")
    console.log(match)
    setTitle(match[1]); // Return the matched img tag
    if (match && match[1]) {
      console.log('The title is ' + match[1]);
      return match[1];
    }
  
    return ""; // Return null if no title tag is found
  }
  
  const handlePostSubmit = async () => {
    // Extract the image and title from the HTML
    const extractedTitle = extractTitle()
  
    // Check if the title, text, and image have valid values
    if (!extractedTitle || !html) {
      console.error('Title, text, or image is missing or invalid.');
      return;
    }

    const postId = uuid.v4();
  
   await set(ref(database, 'Articles/' + postId), {
      id: postId,
      title: title,
      text: html,
      image: insertedImg.image,
      mimeType: insertedImg.mimeType,
      category: "General",
      createdOn: Date.now(),
      authorName: user.firstName + ' ' + user.secondName,
    }).then(() => {
      console.log('Article submitted successfully.');
    }).catch((error) => {
      console.error('Error while submitting article:', error);
    });
  };
  // console.log("from rich text", richText.current?.html)
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
              setHtmlText(descriptionText)
              console.log("html content: ", descriptionText)
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
          onPressAddImage={() => ImagePicker(richText, setInsertedImg)}
          iconMap={{[actions.heading1]: handleHead}}
        />
      </View>
      <Button onPress={handlePostSubmit}>Publish Article</Button>
    </SafeAreaView>
  );
};

export default ArticleCreator;
