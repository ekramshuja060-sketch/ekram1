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
