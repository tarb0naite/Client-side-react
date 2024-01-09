import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback,TouchableHighlight ,Modal,StyleSheet, BackHandler } from 'react-native';
import carBrands from './carBrands';
import { Searchbar } from 'react-native-paper';
import {useCar} from './carContext'
import {useBrandService} from './contextBrand'



const RegisterCarScreen = ({ route, navigation }) => {
  const scrollViewRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(carBrands);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);
  const { setSelectedModelName } = useCar();
  



  const onChangeModalSearch = (query) => {
    setModalSearchQuery(query);
    filterModels(query);
  };

  const filterModels = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const models = selectedBrand?.models || [];
    const filtered = models.filter((model) =>
      model.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredModels(filtered);
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterBrands(query);
  };

  const filterBrands = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = carBrands.filter((brand) =>
      brand.brand.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredBrands(filtered);
  };

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const handleBrandPress = (brand) => {
    const brandName = brand.brand; 
    console.log('Selected brand name in register:', brandName);
    setSelectedBrand(brand);
    setModalVisible(true);
  };
  

 
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedBrand(null);
  };
  

const handleModelPress = (model) => {
  const modelName = model.name;
  console.log('Selected Model:', modelName);
  setSelectedModelName(modelName);
  
  navigation.navigate('CarModel', { selectedModel: model.name });
};



  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Searchbar
          placeholder="Type Here..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('./icons/back-button.png')} style={{ width: 30, height: 30 }} />
        <Text>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Register Car Screen</Text>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.cardContainer}>
      {filteredBrands.map((brand) => (
        <TouchableOpacity key={brand.id} onPress={() => handleBrandPress(brand)}>
          <View style={styles.card}>
            <Image source={brand.img} style={styles.brandImage} />
            <Text style={styles.brandName}>{brand.brand}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => closeModal()}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            {selectedBrand && (
              <View style={styles.modalCard}>
                <Text style={styles.brandTitle}>{selectedBrand.brand}</Text>

                <Searchbar
                  placeholder="Search models..."
                  onChangeText={onChangeModalSearch}
                  value={modalSearchQuery}
                  style={styles.searchBar}
                />

                <ScrollView style={{ height: 200 }}>
                  {filteredModels.map((model) => (
                    <TouchableOpacity key={model.id} onPress={() => handleModelPress(model)}>
                      <View style={styles.modelCard}>
                        <Text style={styles.modelName}>{model.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            <TouchableHighlight onPress={() => closeModal()} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

    <TouchableOpacity style={styles.floatingActionButton} onPress={scrollToTop}>
      <Image source={require('./icons/up-arrow.png')} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    margin: 10,
    padding: 10,
    width: '100%', 
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  brandImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  brandName: {
    marginTop: 10,
    textAlign: 'center',
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#5D8AA8',
    borderRadius: 30,
    padding: 10,
    elevation: 3,
  },
  
  
 backButton: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: -10

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalCard: {
    
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modelCard: {
   
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modelName: {
   
    fontSize: 16,
  },
});


export default RegisterCarScreen;
