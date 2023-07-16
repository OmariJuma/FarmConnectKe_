import React, {useState, useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {primaryColorVariant} from './AppBar';
import {update, ref, remove, onValue} from 'firebase/database';
import {database} from '../../firebase';
import {AuthenticatedUserContext} from '../../Store/Provider';
const LikeBtn = props => {
  const {user}= useContext(AuthenticatedUserContext);
  const [like, setLike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  let [count, setCount] = useState(props.likes? props.likes: 0);
  console.log(props.likes);
  const [isArticle, setIsArticle] = useState(props.isArticle);

  const increment = () => {
    onValue(ref(database, '/Articles/' + props.id+"/likes"), snapshot =>{
      if(snapshot.exists()){
        const data = snapshot.val();  
      return data.likes.likedBy===user.userId? setIsLiked(true): setIsLiked(false); 
      }
    });
    setCount(count + 1);
    update(ref(database, '/Articles/' + props.id+"/likes"), {
      likes: count + 1,
      likedBy: user.userId
    });
  };
  
  const decrement = () => {
    onValue(ref(database, '/Articles/' + props.id+"/likes"), snapshot =>{
      if(snapshot.exists()){
        const data = snapshot.val();  
      return data.likes.likedBy===user.userId? setIsLiked(true): setIsLiked(false); 
      }
    });

    setCount(count - 1);
    // const updatedLikedBy = likedBy.filter(id => id !== userId);
    update(ref(database, '/Articles/' + props.id+"/likes"),{
      likes: count - 1,
    });

    remove(ref(database, '/Articles/' + props.id+"/likes"), {
      likedBy: user.userId
    });
  };
  
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 10,
        paddingBottom: 10,
      }}
      onPress={() => {
        setLike(!like);
          if (like) {
            decrement();
          } else {
            increment();
          }
      }}>
      {isArticle ? (
        <>
          <Avatar.Icon
            color={like ? 'red' : primaryColorVariant}
            icon={like ? 'heart' : 'heart-outline'}
            size={40}
            style={{backgroundColor: 'transparent'}}
          />
          <Text style={{color: like ? 'red' : primaryColorVariant}}>
            {count}
          </Text>
        </>
      ) : (
        <>
          <Avatar.Icon
            color={like ? 'red' : primaryColorVariant}
            icon={like ? 'heart' : 'heart-outline'}
            size={40}
            style={{backgroundColor: 'transparent'}}
          />
          <Text style={{color: like ? 'red' : primaryColorVariant}}>
            {count}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default LikeBtn;
