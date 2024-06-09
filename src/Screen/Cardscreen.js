import { useNavigation } from "@react-navigation/native";
import React,{useState,useEffect} from "react";
import {View,Text,Image,TouchableOpacity,FlatList, ScrollView,StyleSheet} from "react-native"
import * as Animatable from 'react-native-animatable';
const Cardscreen = ({route}) =>{
    const {data} = route?.params
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigation = useNavigation()
    const [count,setCount] = useState(1)
    useEffect(() => {
        if (data && !cartItems.find(item => item.id === data.id)) {
            setCartItems([...cartItems, data]);
        }
    }, [data]);

    const removeItemAll = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        setTotalPrice(0)
        setTimeout(()=>{
            navigation.navigate("HomeScreen")
        },1000)
        
    };
    const removeItem = (id) => {
        const indexToRemove = cartItems.findIndex(item => item.id === id);
        if (indexToRemove !== -1) {
            const updatedCart = [...cartItems.slice(0, indexToRemove), ...cartItems.slice(indexToRemove + 1)];
            setCartItems(updatedCart);
        }
        setCount(count-1)
    };
   
    const addItem = (item) => {
        const newItem = { ...item }; // Copy the item object to avoid mutating the original state
        setCartItems([...cartItems, newItem]);
        setCount(count+1)
    };
    useEffect(() => {
        const price = cartItems.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(price + 1.0); // Adding a fixed delivery fee
    }, [cartItems]);
    const renderItem = ({ item, index }) => (
        <Animatable.View animation="fadeIn" duration={5000}>
          <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
              <Image
                 source={{uri:data?.image}}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item.type}</Text>
                <Text style={styles.opacityText}>{item.name}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  removeItem(item.id);
                }}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.buttonText,{marginHorizontal:10}]}>{count}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  addItem(item);
                }}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      );
      
     return(
        <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'center', marginTop: 32,flexDirection:'row',marginHorizontal:20 }}>
          <TouchableOpacity 
                onPress={()=>{
                    navigation.goBack()
                }}
                >
                <Image
                source={require("../Assets/arrow-left.png")}
                style={{
                    width:24,
                    height:24
                }}
                />
                </TouchableOpacity>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000000',marginLeft:"30%" }}>
              Card
            </Text>
          </View>
    
          <View style={styles.deliveryAddressContainer}>
            <Text style={styles.deliveryAddressText}>Delivery Address</Text>
            <Text style={[styles.deliveryAddressText, { marginTop: 16 }]}>
              JI. Kpg Sutoyo
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#000000',
                opacity: 0.3,
                marginTop: 4,
              }}
            >
              Kpg Sutoyo No. 620 Bilzen, Tanjungbalai
            </Text>
          </View>
    
          <View style={styles.separator} />
    
          <FlatList
            nestedScrollEnabled={true}
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            style={{ flex: 1 }}
          />
    
          <View style={styles.separator} />
    
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Payment Summary</Text>
            <View style={styles.summaryRowContainer}>
              <Text style={styles.summaryRowText}>Price</Text>
              <Text style={styles.summaryRowValueText}>{"$"} {data?.price}</Text>
            </View>
            <View style={styles.summaryRowContainer}>
              <Text style={styles.summaryRowText}>Delivery Fees</Text>
              <Text style={styles.summaryRowValueText}>{"$"} 1.0</Text>
            </View>
          </View>
    
          <View style={styles.separator} />
    
          <View style={styles.paymentContainer}>
            <View>
              <Text style={styles.paymentText}>Cash/wallet</Text>
              <Text style={styles.paymentValueText}>{"$"} {totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => { removeItemAll(data.id) }}>
              <Text style={styles.removeButtonText}>Remove Item</Text>
            </TouchableOpacity>
          </View>
    
        </ScrollView>
      </View>
     )
       
     
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    itemContainer: {
      marginHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 16,
    },
    textContainer: {
      marginLeft: 20,
    },
    nameText: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000000',
    },
    opacityText: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000000',
      opacity: 0.5,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      backgroundColor: '#ffffff',
      borderRadius: 50,
    },
    buttonText: {
      fontSize: 32,
      fontWeight: '600',
      color: '#000000',
    },
    deliveryAddressContainer: {
      marginTop: 16,
      marginHorizontal: 24,
    },
    deliveryAddressText: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000000',
    },
    summaryContainer: {
      marginHorizontal: 20,
      marginTop: 20,
    },
    summaryText: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000000',
    },
    summaryRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    summaryRowText: {
      fontSize: 18,
      fontWeight: '400',
      color: '#000000',
    },
    summaryRowValueText: {
      fontSize: 18,
      fontWeight: '800',
      color: '#000000',
    },
    paymentContainer: {
      marginTop: 20,
      backgroundColor: '#ffffff',
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 24,
    },
    paymentText: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000000',
    },
    paymentValueText: {
      fontSize: 20,
      fontWeight: '800',
      color: '#DA901E',
    },
    removeButton: {
      backgroundColor: '#DA901E',
      paddingHorizontal: 80,
      paddingVertical: 20,
      borderRadius: 8,
      marginTop: 20,
      alignItems: 'center',
    },
    removeButtonText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#ffffff',
    },
    separator: {
      width: '90%',
      height: 1,
      backgroundColor: '#000000',
      opacity: 0.2,
      marginTop: 40,
      alignSelf: 'center',
      marginHorizontal: 20,
    },
  });
export default Cardscreen 