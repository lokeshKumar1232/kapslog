import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import coffeeData from "../Apidata/coffeeData";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
const HomeScreen = () => {
    const [data, setData] = useState(coffeeData);
    const [filterData, setFilterData] = useState(coffeeData);
    const [text, setText] = useState("");
    const navigation = useNavigation();

    const searchFilter = (searchText) => {
        if (!data) {
            console.error("Data is undefined or null");
            return;
        }
        const filteredData1 = filterData.filter((value) => {
            const searchStr = searchText.toLowerCase();
            const name = value.name.toLowerCase().includes(searchStr);
            return name;
        });

        setData(filteredData1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.locationText}>Location</Text>
                    <Text style={styles.location}>Bilzen, Tanjungbalai</Text>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder='Search coffee'
                        placeholderTextColor={"#ffffff"}
                        onChangeText={(inputText) => {
                            setText(inputText);
                            if (inputText !== "") {
                                searchFilter(inputText);
                            } else {
                                setData(filterData);
                            }
                        }}
                        style={styles.searchInput}
                    />
                </View>
            </View>
            <View style={styles.content}>
                <FlatList
                    numColumns={2}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item,index}) => (
                        <Animatable.View animation="slideInDown"  delay={index * 100}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Detailscreen', { item })}
                            style={styles.card}
                        >
                           
                            <Image
                                source={{uri:item.image}}
                                style={styles.coffeeImage}
                            />
                            <View style={styles.ratingContainer}>
                                <Image
                                    source={require("../Assets/rating.png")}
                                    style={styles.ratingImage}
                                />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                            </View>
                            <Text style={styles.coffeeName}>{item.type}</Text>
                            <Text style={styles.coffeeNameSecondary}>{item.name}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>{"$"}{" "}{item.price}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                    <Text style={styles.addButtonText}>{"+"}</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        </Animatable.View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingVertical: 32,
        paddingHorizontal: 24,
        backgroundColor: '#000000'
    },
    locationText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        opacity: 0.6
    },
    location: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
        marginTop: 4
    },
    searchContainer: {
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 16,
        borderRadius: 8
    },
    searchInput: {
        backgroundColor: '#4F5454',
        borderRadius: 8,
        paddingLeft: 8
    },
    content: {
        paddingTop: 30,
        paddingHorizontal: 24,
        flex: 1,
        backgroundColor: '#ffffff'
    },
    card: {
        margin: 10
    },
    coffeeImage: {
        width: 150,
        height: 150,
        borderRadius: 8
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 4
    },
    ratingImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#ffffff',
        marginLeft: 6,
        marginRight: 10
    },
    coffeeName: {
        fontSize: 30,
        fontWeight: '800',
        color: '#000000'
    },
    coffeeNameSecondary: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        opacity: 0.5
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    addButton: {
        backgroundColor: '#DA901E',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8
    },
    addButtonText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ffffff'
    }
});

export default HomeScreen;
