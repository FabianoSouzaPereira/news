import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const News = (props:{
  id: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode | undefined;
  author: React.ReactNode;
  createdAt: React.ReactNode;
  updatedAt: React.ReactNode;
}) => {

  return(
    <SafeAreaView>
      <View style={styles.Conteiner}>
        <View style={styles.main}>
          <View style={styles.textfield_main}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.content}>{props.content}</Text>
            <Text style={styles.id}>{props.author}</Text>
            <TextInput   />
          </View>
        </View>
      </View>
    </SafeAreaView>

  );
}

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
  title:{

  },
  content:{

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
  fontDate: {
    fontSize: 10,
    marginStart: 10,
  },
  id: {
    margin: 8,
  }
});

export default News;