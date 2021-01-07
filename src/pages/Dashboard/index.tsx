/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../contexts/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import News from '../../components/news.component';

interface types {
  id?: number;
  title: string;
  author: string;
  coment: string;
  posts: Object[];
  index: number;
  res: {
    id: number;
  };
  getFeeds(): Promise<string>;
}

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Dashboard: React.FC<types> = () => {
  const { signOut } = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [] = React.useState(false);
  const [value, onChangeText] = React.useState('');

  useEffect(() => {
    async function loader() {
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedToken) {
        getFeeds();
      } else {
        return;
      }
    }
    loader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function signCheck() {
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedToken) {
        console.log('SIGNCHECK');
      } else {
        return;
      }
    }
    signCheck();
  });

  function handleSignOut() {
    signOut();
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  let itens: any[] = [];
  const [DATA, setDATA] = useState<any[]>();
  async function getFeeds() {
    console.log("feed");
    api.get('/news').then((res) => {
      for (let feed of res.data) {
        console.log(feed);
        itens.push({
          id: feed.id.toString(),
          title: (
            <News
              id={feed.id}
              title={feed.title}
              author={feed.author.username}
              content={feed.content}
              createdAt={feed.createdAt}
              updatedAt={feed.updatedAt}
            />
          ),
        });
      }
      setDATA(itens);
    });
  }

  const Item = ({ title }) => (
    <View style={styles.title_mensage}>
      <Text style={styles.mensage}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.title}  />;

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.mainView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Últimas Notícias</Text>
        </View>
        <View style={styles.touchs}>
          <TouchableWithoutFeedback style={styles.touch}>

            <View style={styles.bottomView}>
              <View style={styles.txtInputView}>
                <Text>oi</Text>
              <FlatList
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
              </View>
              <View style={styles.viewSair}>
                <Text style={styles.txtSair}  onPress={() => handleSignOut()}>
                  Sair
                </Text>
              </View>
            </View>

          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safearea: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    height: '100%',
  },
  header: {
    height: 60,
    backgroundColor: '#B5D6B2',
    justifyContent: 'center',
    paddingTop: 5,
  },
  headerText: {
    flex: 1,
    height: 50,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#7AE7C7',
    fontWeight: 'bold',
    borderColor: '#000',
    borderWidth: 3,
    fontSize: 25,
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 17,
    color: '#000',
    elevation: 5,
  },
  mainView: {
    backgroundColor: '#eaeaea',
    width: '100%',
    height: '100%',
  },
  touchs: {
    width: '100%',
    height: '100%',
  },
  touch: {
    width: '100%',
    height: '100%',
    backgroundColor: '#B5D6B2',
    paddingTop: 15,
    paddingStart: 15,
    paddingEnd: 15,
    paddingBottom: 180,
  },
  viewSair: {
    width: '100%',
    height: '50%',
    backgroundColor: '#011B44',
  },
  txtSair: {
    width: '100%',
    height: '100%',
    color: '#fff',
    fontSize: 20,
    paddingStart: 20,
    paddingTop: 2,
    backgroundColor: '#011B44',
  },
  txtInput: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    marginTop: 10,
    width: '80%',
    marginStart: 17,
    height: '70%',
    borderRadius: 17,
    color: '#000',
  },
  bottomView: {
    width: '110%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  txtInputView: {
    flexDirection: 'row',
    backgroundColor: '#011B44',
    width: '100%',
    height: 75,
  },
  send: {
    width: '10%',
    height: '55%',
    marginStart: 10,
    marginTop: 15,
    paddingTop: 11,
    paddingStart: 8,
    borderColor: 'rgba(255,255,255, 0.8)',
    borderWidth: 2,
    borderRadius: 60,
  },
  mensage: {
    width: '100%',
  },
  title_mensage: {
    width: '100%',
  },
});

export default Dashboard;