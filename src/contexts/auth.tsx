import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, AppState } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../contexts/auth';
import Dashboard from '../pages/Dashboard';

interface types {
  id?: number;
  content: string;
  title: string;
  like: string;
  love: string;
  createdAt: string;
  updatedAt: string;
  activeUserLikedIt: string;
  activeUserLovedIt: string;
}

const Inputs = (props: {
  id: React.ReactNode;
  content: React.ReactNode | undefined;
  likes: React.ReactNode;
  dislikes: React.ReactNode;
  author: React.ReactNode;
  createdAt: React.ReactNode;
  updatedAt: React.ReactNode;
  activeUserLikedIt: React.ReactNode;
  activeUserLovedIt: React.ReactNode;
}) => {
  const { sendReaction } = useContext(AuthContext);
  const refInput = useRef(null);
  const refLike = useRef(null);
  const refheart = useRef(null);

  useEffect(() => {
    async function signCheck() { }
    signCheck();
  }, []);

  function likes() {
    let id: any;
    id = props.id;
    sendReaction(id, true, false);
    return;
  }

  function loves() {
    let id: any;
    id = props.id;
    sendReaction(id, false, true);
    return;
  }

  return (
    <SafeAreaView>
      <View style={styles.Conteiner}>
        <View style={styles.main}>
          <View style={styles.textfield_main}>
            <Text style={styles.id}>{props.author}</Text>
            <TextInput
              style={styles.textfild}
              autoFocus={false}
              multiline={true}
              scrollEnabled={true}
              numberOfLines={4}
              ref={refInput}
              maxLength={350}
              editable={true}
              value={'' + props.content}
            />
          </View>
          <View style={styles.thumbs}>
            <Text style={styles.LikedIt}>{props.activeUserLikedIt}</Text>
            <Icon
              name="thumbs-o-up"
              ref={refLike}
              size={24}
              color="#999"
              style={styles.thumbsup}
              onPress={() => likes()}
            />
            <Icon
              name="heart-o"
              ref={refheart}
              size={24}
              color="#999"
              style={styles.thumbsdown}
              onPress={() => loves()}
            />
            <Text style={styles.LovedIt}>{props.activeUserLovedIt}</Text>
          </View>
          <Text style={styles.fontDate}>{props.createdAt}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conteiner: {
    flexDirection: 'row',
    marginTop: 20,
    marginStart: 45,
    minWidth: 320,
    maxWidth: 400,
    minHeight: 100,
    maxHeight: 800,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 15,
    borderBottomColor: 'rgba(0,0,0, 0.4)',
    borderBottomWidth: 6,
  },
  main: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderColor: '#000',
    color: '#000',
    fontSize: 25,
    height: 150,
    borderTopStartRadius: 17,
    borderBottomLeftRadius: 13,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    borderLeftWidth: 0,
    borderEndWidth: 0,
  },
  textfield_main: {
    flex: 1,
    color: '#000',
    fontSize: 15,
    marginStart: 15,
  },
  textfild: {
    flex: 1,
    color: '#000',
    fontSize: 15,
  },
  column: {
    flexDirection: 'column',
    width: '10%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderTopEndRadius: 13,
    borderBottomEndRadius: 13,
  },
  thumbs: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderBottomLeftRadius: 13,
  },
  thumbsup: {
    marginStart: '1%',
    color: '#000',
  },
  thumbsdown: {
    marginStart: '5%',
    alignContent: 'flex-end',
    color: '#000',
  },
  fontDate: {
    fontSize: 10,
    marginStart: 10,
  },
  id: {
    margin: 8,
  },
  LikedIt: {
    marginStart: '35%',
    marginEnd: 5,
  },
  LovedIt: {
    marginStart: 5,
  },
});

export default Inputs;
