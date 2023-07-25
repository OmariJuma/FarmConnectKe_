import React, {useContext} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImagePicker from '../Utility/ImagePicker';
import {Button, TextInput} from 'react-native-paper';
import {database} from '../../firebase';
import {ref, set} from 'firebase/database';
import uuid from 'react-native-uuid';
import {AuthenticatedUserContext} from '../../Store/Provider';
import {primaryColor, primaryColorVariant} from '../UI/AppBar';
import {Toast} from 'toastify-react-native';

const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

const ArticleCreator = () => {
  const deviceWidth = Dimensions.get('window').width;
  const richText = React.useRef();
  const {user, insertedImg, setInsertedImg} = useContext(
    AuthenticatedUserContext,
  );
  const [html, setHtmlText] = React.useState('');
  const [category, setCategory] = React.useState();
  const showSuccessToast = () =>
    Toast.success('Article submitted successfully', 'top');
  var title;
  var id;

  function extractTitle() {
    const titleRegex = /<h1[^>]*?>(.*?)<\/h1>/i;
    const match = html.match(titleRegex);
    console.log('the title: ');
    console.log(match);
    title = match[1]; // Return the matched img tag
    if (match && match[1]) {
      console.log('The title is ' + match[1]);
      return match[1];
    }

    return ''; // Return null if no title tag is found
  }
  const generateRandomWholeNumber = () => {
    const min = Math.floor(20);
    const max = Math.floor(5000);
    const randomDecimal = Math.random();
    const randomWholeNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
    id = randomWholeNumber;
  };

  const handlePostSubmit = () => {

    // Check if the title, text, and image have valid values
    if (!extractedTitle || !html) {
      Toast.error('Title, text, or image is missing or invalid.',"top");
      return;
    }

    const postId = uuid.v4();
    // Extract the image and title from the HTML
    const extractedTitle = extractTitle();
    generateRandomWholeNumber();

    set(ref(database, 'Articles/' + id), {
      id: id,
      title: title,
      text: html,
      image: insertedImg.image,
      mimeType: insertedImg.mimeType,
      category: category,
      date: Date.now(),
      authorName: user.firstName + ' ' + user.secondName,
    })
      .then(() => {
        showSuccessToast();
        setCategory('');
        setHtmlText('');
        richText.current?.setContentHTML('');
      })
      .catch(error => {
        console.error('Error while submitting article:', error);
      });
  };
  // console.log("from rich text", richText.current?.html)
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 20, color: 'grey'}}>Tell your story</Text>

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <RichEditor
            initialHeight={400}
            scrollEnabled={true}
            ref={richText}
            focusable={true}
            onChange={descriptionText => {
              setHtmlText(descriptionText);
            }}
          />
          <TextInput
            mode="outlined"
            style={{margin: 20}}
            label={'Enter Category the article belongs to'}
            value={category}
            onChange={text => setCategory(text.nativeEvent.text)}
            contentStyle={{lineHeight: 30}}
            outlineColor={primaryColorVariant}
            activeOutlineColor={primaryColor}
          />
          <Button
            textColor="white"
            onPress={handlePostSubmit}
            style={styles.btnSubmit}>
            Publish Article
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, width: deviceWidth}}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnSubmit: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 10,
    width: '90%',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
});

export default ArticleCreator;
