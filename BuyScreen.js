 import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Platform,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';
import { loadCars } from './storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function BuyScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

   
  const [modalVisible, setModalVisible] = useState(false);
  const [offer, setOffer] = useState('');
  const [comments, setComments] = useState('');

  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const savedCars = await loadCars();
        setCars(savedCars);
      } catch (error) {
        console.log('Failed to load cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const submitOffer = () => {
    if (!offer.trim()) {
      Alert.alert('Error', 'Please enter your offer.');
      return;
    }
    Alert.alert('Offer Submitted', `Offer: ${offer}\nComments: ${comments}`);
    setOffer('');
    setComments('');
    setModalVisible(false);
  };

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.wrapper}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
         
        <TouchableHighlight
          style={styles.topLeftButton}
          underlayColor="#1e40af"
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
          {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
        >
          <Text style={styles.topLeftButtonText}>← Home</Text>
        </TouchableHighlight>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Cars for Sale</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#2563eb" />
          ) : cars.length === 0 ? (
            <Text style={styles.emptyText}>No cars listed yet.</Text>
          ) : (
            cars.map((car) => (
              <View key={car.id} style={styles.carWrapper}>
                <TouchableOpacity
                  style={styles.carCard}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Car Details', { car })}
                >
                  {car.photos && car.photos.length > 0 && (
                    <Image source={{ uri: car.photos[0] }} style={styles.carImage} />
                  )}
                  <Text style={styles.carTitle}>
                    {car.company} {car.make} {car.model}
                  </Text>
                  <Text style={styles.carVariant}>Variant: {car.variant}</Text>
                  <Text style={styles.carPrice}>Price: ${car.price.toLocaleString()}</Text>
                  <Text style={styles.carYear}>Year: {car.year}</Text>
                </TouchableOpacity>

                {/* Want to Buy button below each car */}
                <TouchableOpacity
                  style={styles.wantBuyButton}
                  activeOpacity={0.7}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.wantBuyButtonText}>Want to Buy a Car</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        {/* Modal for offer form */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalContainer}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                contentContainerStyle={styles.modalScrollContainer}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Submit Your Offer</Text>

                  <TextInput
                    placeholder="Give your offer"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={offer}
                    onChangeText={setOffer}
                    style={styles.modalInput}
                  />

                  <TextInput
                    placeholder="Comments about the car"
                    placeholderTextColor="#888"
                    value={comments}
                    onChangeText={setComments}
                    style={[styles.modalInput, { height: 80 }]}
                    multiline
                    textAlignVertical="top"
                  />

                  <TouchableOpacity
                    style={styles.modalButton}
                    activeOpacity={0.7}
                    onPress={submitOffer}
                    {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
                  >
                    <Text style={styles.modalButtonText}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#aaa', marginTop: 10 }]}
                    activeOpacity={0.7}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.modalButtonText, { color: '#333' }]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  topLeftButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    zIndex: 10,
  },
  topLeftButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
    paddingTop: 50, // avoid overlap with top button
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  carWrapper: {
    marginBottom: 30,
  },
  carCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  carImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  carTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  carVariant: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 4,
  },
  carPrice: {
    fontSize: 18,
    color: '#4CAF50',
    marginTop: 6,
    fontWeight: '600',
  },
  carYear: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  wantBuyButton: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  wantBuyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
  },
  modalScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
