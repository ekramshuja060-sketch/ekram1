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
