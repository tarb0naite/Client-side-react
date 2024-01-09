import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import servicesData from './servicesData'
import { useNavigation } from '@react-navigation/native';
import { useSubService } from './context';



function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedService, setExpandedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { setSelectedSubService } = useSubService();


  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const handleServicePress = (serviceId) => {
    setExpandedService(serviceId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setExpandedService(null);
  };


const handleSubServicePress = (subService) => {
  const subServiceName = subService.name;
  console.log('Selected SubService in ServicesScreen:', subServiceName);
  setSelectedSubService(subServiceName);
  navigation.navigate('CarModel');
};


  const renderServiceCard = (service) => (
    <Card key={service.id} style={styles.serviceCard}>
      <TouchableOpacity onPress={() => handleServicePress(service.id)}>
        <Card.Content style={styles.serviceCardContent}>
          <Image source={service.icon} style={styles.icon} />
          <Text>{service.type}</Text>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  
  
  
  

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder="Type Here..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 20 }}>
        <Text style={styles.titleText}>Our Services</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {servicesData.map((service) => (
          renderServiceCard(service)
        ))}
      </ScrollView>

      <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 20 }}>
        <Text style={styles.titleText}>Our Partners Suggests</Text>
      </View>

      <Swiper style={styles.wrapper} showsButtons>
        <View style={styles.slide}>
          <Image source={require('./images/image1.jpg')} style={styles.carouselImage} />
        </View>
        <View style={styles.slide}>
          <Image source={require('./images/image2.jpg')} style={styles.carouselImage} />
        </View>
        <View style={styles.slide}>
          <Image source={require('./images/image3.jpg')} style={styles.carouselImage} />
        </View>
        <View style={styles.slide}>
          <Image source={require('./images/image4.jpg')} style={styles.carouselImage} />
        </View>
      </Swiper>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Choose and Reserve Services</Text>
      </View>

      

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    closeModal();
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Card style={styles.modalServiceCard}>
        {servicesData.map((service) =>
          service.id === expandedService ? (
            <Card.Content style={styles.serviceCardContent} key={service.id}>
              <Image source={service.icon} style={styles.icon} />
              <Text>{service.type}</Text>
              <View style={styles.subServiceContainer}>
  {service.subServices.map((subService) => (
    <TouchableOpacity
      key={subService.id}
      onPress={() => handleSubServicePress(subService)} 
    >
      <View style={styles.subServiceItem}>
        <View style={styles.dot} />
        <Text>{subService.name}</Text>
      </View>
    </TouchableOpacity>
  ))}
</View>
            </Card.Content>
          ) : null
        )}
        <TouchableHighlight onPress={() => closeModal()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableHighlight>
      </Card>
    </View>
  </View>
</Modal>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  searchBarContainer: {
    margin: 10,
  },
  searchBar: {
    backgroundColor: 'white',
    height: 40,
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 14,
    paddingVertical: 0,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  serviceCard: {
    width: 150,
    height: 80,
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 3,
    backgroundColor: 'white',
  },
  serviceCardContent: {
    alignItems: 'center',
  },
  subServiceContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  subServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 40,
    height: 40,
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '80%',
    height: '80%',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002147',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalServiceCard: {
    elevation: 5,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#002147',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#002147',
    marginRight: 8,
  },
  
});

export default ServicesScreen;
