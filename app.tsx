import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// صفحات اصلی
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import GameScreen from './src/screens/GameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Library" component={LibraryScreen} />
          <Stack.Screen name="Games" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}




import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطا', 'لطفا تمام فیلدها را پر کنید');
      return;
    }

    // TODO: ارتباط با Firebase Auth
    console.log('ورود با:', email);
    
    // انتقال به صفحه اصلی
    navigation.navigate('Home');
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert(`ورود با ${platform}`, 'این قابلیت به زودی اضافه می‌شود');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? '



{
  "name": "social-app",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "react-native-screens": "~3.22.0",
    "firebase": "^10.7.0",
    "socket.io-client": "^4.7.2",
    "react-native-webrtc": "^1.119.3",
    "react-native-vector-icons": "^10.0.0",
    "react-native-video": "^5.2.1",
    "react-native-image-picker": "^5.3.1",
    "react-native-gifted-chat": "^2.0.0",
    "react-native-share": "^10.0.0",
    "axios": "^1.6.2",
    "@react-native-async-storage/async-storage": "^1.19.3"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.14",
    "typescript": "^5.1.3"
  },
  "private": true
}





import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import VideoCallScreen from './src/screens/VideoCallScreen';
import StoryScreen from './src/screens/StoryScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import GameScreen from './src/screens/GameScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // یا صفحه اسپلش
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Register" 
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="VideoCall" component={VideoCallScreen} />
              <Stack.Screen name="Story" component={StoryScreen} />
              <Stack.Screen name="Library" component={LibraryScreen} />
              <Stack.Screen name="Games" component={GameScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}







import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطا', 'لطفا ایمیل و رمز عبور را وارد کنید');
      return;
    }

    setIsLoading(true);
    
    try {
      // شبیه‌سازی لاگین (در مرحله بعد با Firebase جایگزین می‌شود)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // ذخیره توکن
      await AsyncStorage.setItem('userToken', 'fake-jwt-token');
      await AsyncStorage.setItem('userEmail', email);
      
      Alert.alert('موفقیت', 'ورود موفقیت‌آمیز بود');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('خطا', 'ورود ناموفق بود');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert(`ورود با ${platform}`, 'این قابلیت به زودی فعال می‌شود');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* هدر */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png' }}
            style={styles.logo}
          />
          <Text style={styles.title}>اپلیکیشن اجتماعی</Text>
          <Text style={styles.subtitle}>به جامعه ما بپیوندید</Text>
        </View>

        {/* فرم ورود */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="ایمیل یا نام کاربری"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="رمز عبور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>رمز عبور را فراموش کرده‌اید؟</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>ورود</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>یا وارد شوید با</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* دکمه‌های ورود اجتماعی */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity 
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => handleSocialLogin('گوگل')}
            >
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.socialButton, styles.facebookButton]}
              onPress={() => handleSocialLogin('فیسبوک')}
            >
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.socialButton, styles.instagramButton]}
              onPress={() => handleSocialLogin('اینستاگرام')}
            >
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Instagram</Text>
            </TouchableOpacity>
          </View>

          {/* ثبت‌نام */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>حساب کاربری ندارید؟ </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>ثبت‌نام کنید</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* فوتر */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            با ورود، با{' '}
            <Text style={styles.linkText}>شرایط استفاده</Text>
            {' '}و{' '}
            <Text style={styles.linkText}>حریم خصوصی</Text>
            {' '}موافقت می‌کنید
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    textAlign: 'right',
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#666',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  instagramButton: {
    backgroundColor: '#E4405F',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#666',
    fontSize: 14,
  },
  registerLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
  },
  linkText: {
    color: '#007AFF',
  },
});






import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const POSTS = [
  {
    id: '1',
    user: {
      name: 'علی محمدی',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    content: 'امروز یک روز عالی برای شروع یک پروژه جدید! 🚀',
    image: 'https://picsum.photos/400/300',
    likes: 245,
    comments: 42,
    time: '2 ساعت پیش',
  },
  {
    id: '2',
    user: {
      name: 'سارا احمدی',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    content: 'کتاب جدیدی که می‌خونم واقعاً عالیه 📚',
    image: null,
    likes: 89,
    comments: 15,
    time: '5 ساعت پیش',
  },
];

const STORIES = [
  { id: '1', name: 'شما', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', hasNew: true },
  { id: '2', name: 'علی', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', hasNew: true },
  { id: '3', name: 'سارا', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', hasNew: false },
  { id: '4', name: 'محمد', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', hasNew: true },
  { id: '5', name: 'فاطمه', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', hasNew: false },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const renderStory = ({ item }) => (
    <TouchableOpacity 
      style={styles.storyContainer}
      onPress={() => navigation.navigate('Story')}
    >
      <View style={[styles.storyCircle, item.hasNew && styles.storyCircleNew]}>
        <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      {/* هدر پست */}
      <View style={styles.postHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.postAvatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUserName}>{item.user.name}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* محتوای پست */}
      <Text style={styles.postContent}>{item.content}</Text>
      
      {/* عکس پست */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}

      {/* آمار و تعامل */}
      <View style={styles.postStats}>
        <View style={styles.likesComments}>
          <Icon name="heart" size={16} color="#FF3040" />
          <Text style={styles.statText}>{item.likes}</Text>
          <Icon name="chatbubble" size={16} color="#666" style={styles.commentIcon} />
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="bookmark-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* دکمه‌های تعامل */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart-outline" size={24} color="#666" />
          <Text style={styles.actionText}>پسندیدن</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>نظر</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-social-outline" size={24} color="#666" />
          <Text style={styles.actionText}>اشتراک</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* هدر */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>SocialApp</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="chatbubble-ellipses-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* نوار جستجو */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="جستجو در پست‌ها، دوستان..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="options" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* استوری‌ها */}
      <View style={styles.storiesSection}>
        <Text style={styles.sectionTitle}>استوری‌ها</Text>
        <FlatList
          horizontal
          data={STORIES}
          renderItem={renderStory}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesList}
        />
      </View>

      {/* تب‌های منو */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>همه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Icon name="videocam" size={18} color="#666" />
          <Text style={styles.tabText}>ویدیو</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Icon name="image" size={18} color="#666" />
          <Text style={styles.tabText}>عکس</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => navigation.navigate('Library')}
        >
          <Icon name="library" size={18} color="#666" />
          <Text style={styles.tabText}>کتابخانه</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => navigation.navigate('Games')}
        >
          <Icon name="game-controller" size={18} color="#666" />
          <Text style={styles.tabText}>بازی‌ها</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* فید پست‌ها */}
      <FlatList
        data={POSTS}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.feedContainer}
      />

      {/* دکمه‌های شناور */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Chat')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* نوار پایین */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={26} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Chat')}
        >
          <Icon name="chatbubbles" size={26} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="camera" size={26} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="people" size={26} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="person" size={26} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  filterButton: {
    padding: 5,
  },
  storiesSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    marginBottom: 10,
    color: '#333',
  },
  storiesList: {
    paddingHorizontal: 15,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 70,
  },
  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyCircleNew: {
    borderColor: '#007AFF',
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  tabsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  activeTabText: {
    color: '#fff',
  },
  feedContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  postAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postUserInfo: {
    flex: 1,
    marginRight: 10,
  },
  postUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 15,
    textAlign: 'right',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  likesComments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
    marginRight: 15,
    fontSize: 14,
    color: '#666',
  },
  commentIcon: {
    marginLeft: 15,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginRight: 5,
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
});








import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';

const MOCK_MESSAGES = [
  {
    _id: 1,
    text: 'سلام! چطوری؟',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'علی',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    _id: 2,
    text: 'ممنون خوبم، تو چطور؟',
    createdAt: new Date(Date.now() - 60000),
    user: {
      _id: 1,
      name: 'شما',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
];

const CHAT_LIST = [
  {
    id: '1',
    name: 'گروه دوستان',
    lastMessage: 'شنبه کجا بریم؟',
    time: '10:30',
    unread: 3,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isGroup: true,
  },
  {
    id: '2',
    name: 'سارا احمدی',
    lastMessage: 'فایل رو برات فرستادم',
    time: 'دیروز',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isOnline: true,
  },
];

export default function ChatScreen() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const onSend = (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => {
        setSelectedChat(item);
        setIsChatOpen(true);
      }}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
        {item.isGroup && (
          <View style={styles.groupIndicator}>
            <Icon name="people" size={12} color="#fff" />
          </View>
        )}
      </View>
      
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderMessageBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#007AFF',
            marginVertical: 5,
          },
          left: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#eee',
            marginVertical: 5,
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontSize: 16,
          },
          left: {
            color: '#333',
            fontSize: 16,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          paddingVertical: 8,
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={styles.sendButtonContainer}>
        <View style={styles.sendButton}>
          <Icon name="send" size={24} color="#007AFF" />
        </View>
      </Send>
    );
  };

  if (isChatOpen && selectedChat) {
    return (
      <View style={styles.chatContainer}>
        {/* هدر چت */}
        <View style={styles.chatHeaderContainer}>
          <TouchableOpacity 
            onPress={() => setIsChatOpen(false)}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.chatHeaderInfo}>
            <Image source={{ uri: selectedChat.avatar }} style={styles.headerAvatar} />
            <View>
              <Text style={styles.headerName}>{selectedChat.name}</Text>
              <Text style={styles.headerStatus}>
                {selectedChat.isOnline ? 'آنلاین' : 'آفلاین'}
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.chatHeaderActions}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('VideoCall')}
              style={styles.headerActionButton}
            >
              <Icon name="videocam" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionButton}>
              <Icon name="call" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionButton}>
              <Icon name="information-circle" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* صفحه چت */}
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderMessageBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          alwaysShowSend
          placeholder="پیام خود را بنویسید..."
          textInputStyle={styles.messageInput}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* هدر */}
      <View style={styles.header}>
        <Text style={styles.title}>پیام‌ها</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="search" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="add" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* لیست چت‌ها */}
      <FlatList
        data={CHAT_LIST}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* دکمه شروع چت جدید */}
      <TouchableOpacity style={styles.newChatButton}>
        <Icon name="pencil" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  chatList: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
  },
  chatAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  groupIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatInfo: {
    flex: 1,
    marginRight: 15,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newChatButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  chatHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  chatHeaderInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerStatus: {
    fontSize: 12,
    color: '#666',
  },
  chatHeaderActions: {
    flexDirection: 'row',
  },
  headerActionButton: {
    marginLeft: 15,
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sendButton: {
    marginRight: 10,
  },
  messageInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
    textAlign: 'right',
  },
});





import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


