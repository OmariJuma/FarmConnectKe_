import React, {useContext, useEffect, useState} from 'react';
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
import {ref, set, update} from 'firebase/database';
import uuid from 'react-native-uuid';
import {AuthenticatedUserContext} from '../../Store/Provider';
import {primaryColor, primaryColorVariant} from '../UI/AppBar';
import {Toast} from 'toastify-react-native';

const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

const ArticleCreator = ({route, navigation}) => {
  const deviceWidth = Dimensions.get('window').width;
  const richText = React.useRef();
  const {user, insertedImg, setInsertedImg} = useContext(
    AuthenticatedUserContext,
  );
  const [isEditting, setIsEditting] = useState(false);
  const [html, setHtmlText] = React.useState('' );
  const [category, setCategory] = React.useState('');
  const showSuccessToast = () =>
    Toast.success('Article submitted successfully', 'top');
  var title;
  var id;

  function extractTitle() {
    const titleRegex = /<h1[^>]*?>(.*?)<\/h1>/i;
    const match = html.match(titleRegex);
    title = match[1]; // Return the matched img tag
    if (match && match[1]) {
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

  const clearEditorNRoute = () => {
    setIsEditting(false);
    setCategory('');
    richText.current?.setContentHTML('');
    route.params.article = null;
  };
  const clearEditor = () => {
    richText.current?.setContentHTML('');
    setCategory('');
  };

  const handlePostSubmit = () => {
    // Check if the title, text, and image have valid values

    const postId = uuid.v4();
    // Extract the image and title from the HTML
    const extractedTitle = extractTitle();
    generateRandomWholeNumber();

    if (!extractedTitle || !html) {
      Toast.error('Title, text, or image is missing or invalid.', 'top');
      return;
    }

    if (!isEditting) {
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
    } else {
      update(ref(database, 'Articles/' + route.params.article.id), {
        id: route.params.article.id,
        title: title,
        text: html,
        image: insertedImg.image,
        mimeType: insertedImg.mimeType,
        category: category,
        date: new Date().toLocaleString(),
        authorName: user.firstName + ' ' + user.secondName,
      })
        .then(() => {
          showSuccessToast();
          setCategory('');
          setHtmlText('');
          setIsEditting(false);
          richText.current?.setContentHTML('');
        })
        .catch(error => {
          console.error('Error while submitting article:', error);
        });
    }
  };
  useEffect(() => {
    if (route.params?.article) {
      setIsEditting(true);
      setCategory(route.params?.article.category);
      richText.current?.setContentHTML(route.params?.article.text);
    }
  }, [route.params]);
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
          {isEditting && (
            <Button
              buttonColor="#f9f9f9"
              textColor={primaryColor}
              style={styles.btnReset}
              onPress={clearEditorNRoute}>
              Reset Editor
            </Button>
          )}
          {!isEditting && (
            <Button
              buttonColor="#f9f9f9"
              textColor={primaryColor}
              style={styles.btnReset}
              onPress={clearEditor}>
              Reset Editor
            </Button>
          )}
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
  btnReset: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    borderWidth: 2,
    borderColor: primaryColor,
  },
});

export default ArticleCreator;
