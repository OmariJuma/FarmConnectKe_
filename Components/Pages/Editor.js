import React from 'react';
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

const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;
const ArticleCreator = () => {
  const richText = React.useRef();

  return (
    <SafeAreaView style={{flex: 1,padding:20}}>
      <ScrollView >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Text style={{fontSize:20, color:"grey"}}>Tell your story</Text>
          <RichEditor
          initialHeight={400}
            ref={richText}
            focusable={true}
            onChange={descriptionText => {
              console.log('descriptionText:', descriptionText);
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
          onPressAddImage={()=>ImagePicker(richText)}
          iconMap={{[actions.heading1]: handleHead}
        }
        />
      </View>
    </SafeAreaView>
  );
};

export default ArticleCreator;
