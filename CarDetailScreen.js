 import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function CarDetailScreen({ route, navigation }) {
  const { car } = route.params;

  if (!car) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Car not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {car.photo && <Image source={{ uri: car.photo }} style={styles.carImage} />}
      <Text style={styles.title}>{car.company} {car.make}</Text>
      <Text style={styles.detail}>Model: {car.model}</Text>
      <Text style={styles.detail}>Variant: {car.variant}</Text>
      <Text style={styles.detail}>Year: {car.year}</Text>
      <Text style={styles.detail}>Price: ${car.price}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#e0ebff', alignItems: 'center' },
  carImage: { width: 300, height: 200, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#1e40af' },
  detail: { fontSize: 18, marginBottom: 5, color: '#334155' },
  notFoundText: { fontSize: 20, textAlign: 'center', marginTop: 50, color: '#dc2626' },
  backButton: {
    marginTop: 30, backgroundColor: '#2563eb', paddingVertical: 12,
    paddingHorizontal: 40, borderRadius: 10, alignItems: 'center',
  },
  backButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
