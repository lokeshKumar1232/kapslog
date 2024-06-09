import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated,ScrollView } from "react-native";

const Detailscreen = ({ route }) => {
    const data = route?.params?.item;
    const [selectedSize, setSelectedSize] = useState('S');
    const navigation = useNavigation()

    const animatedValueS = useRef(new Animated.Value(0)).current;
    const animatedValueM = useRef(new Animated.Value(0)).current;
    const animatedValueL = useRef(new Animated.Value(0)).current;
    const animatedValueButton = useRef(new Animated.Value(1)).current;

    const animateSize = (size) => {
        Animated.timing(size === 'S' ? animatedValueS : size === 'M' ? animatedValueM : animatedValueL, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            animatedValueS.setValue(size === 'S' ? 1 : 0);
            animatedValueM.setValue(size === 'M' ? 1 : 0);
            animatedValueL.setValue(size === 'L' ? 1 : 0);
        });
    };
    const handlePressIn = () => {
        Animated.spring(animatedValueButton, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedValueButton, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.header}>
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
                

                <Text style={styles.headerText}>Details</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{uri:data?.image}}
                    style={styles.image}
                />
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.name}>{data?.type}</Text>
                <Text style={styles.secondaryName}>{data?.name}</Text>
            </View>

            <View style={styles.ratingContainer}>
                <Image
                    source={require("../Assets/rating.png")}
                    style={styles.ratingImage}
                />
                <View style={styles.ratingTextContainer}>
                    <Text style={styles.ratingText}>{data.rating}</Text>
                    <Text style={styles.totalRatingText}> ({data.TotalRating})</Text>
                </View>
            </View>
            <View style={styles.divider} />

            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{data?.description}</Text>
            </View>

            <View style={styles.sizeContainer}>
                <Text style={styles.sizeTitle}>Size</Text>
                <View style={styles.sizeOptionsContainer}>
                    {['S', 'M', 'L'].map(size => (
                        <TouchableOpacity
                            key={size}
                            style={[
                                styles.sizeOption,
                                {
                                    backgroundColor: size === selectedSize ? '#F8E4C4' : '#ffffff',
                                    borderColor: size === selectedSize ? '#DA901E' : '#000000',
                                    borderWidth: 0.2,
                                },
                            ]}
                            onPress={() => {
                                setSelectedSize(size);
                                animateSize(size);
                            }}
                        >
                            <Animated.Text
                                style={[
                                    styles.sizeOptionText,
                                    {
                                        color: size === selectedSize ? '#DA901E' : '#000000',
                                        transform: [
                                            {
                                                scale: size === 'S' ? animatedValueS : size === 'M' ? animatedValueM : animatedValueL,
                                            },
                                        ],
                                    },
                                ]}
                            >
                                {size}
                            </Animated.Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.priceText}>{"$"}{" "}{data?.price}</Text>
                </View>
                <TouchableOpacity
                style={[styles.buyButton, { transform: [{ scale: animatedValueButton }] }]}
                onPress={() => {
                    handlePressIn();
                    setTimeout(() => {
                        handlePressOut();
                        navigation.navigate('Cardscreen', { data });
                    }, 100);
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Text style={styles.buyButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: 32,
        flexDirection:'row',
        marginHorizontal:20,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft:"30%"
    },
    imageContainer: {
        marginHorizontal: 24,
        marginTop: 24,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 24,
    },
    nameContainer: {
        marginTop: 16,
        marginHorizontal: 24,
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000000',
    },
    secondaryName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        opacity: 0.6,
        marginTop: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 20,
    },
    ratingImage: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    ratingTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000000',
    },
    totalRatingText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        opacity: 0.6,
    },
    divider: {
        width: '90%',
        height: 1,
        backgroundColor: '#000000',
        opacity: 0.2,
        marginTop: 8,
        alignSelf: 'center',
        marginHorizontal: 20,
    },
    descriptionContainer: {
        marginHorizontal: 20,
        marginTop: 16,
    },
    descriptionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    descriptionText: {
        marginTop: 12,
        color: '#000000',
        fontSize: 16,
        fontWeight: '400',
    },
    sizeContainer: {
        marginHorizontal: 20,
        marginTop: 16,
    },
    sizeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    sizeOptionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    sizeOption: {
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 4,
    },
    sizeOptionText: {
        fontSize: 20,
        fontWeight: '600',
    },
    footer: {
        marginTop: 20,
        backgroundColor: "#ffffff",
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: "#000000",
        opacity: 0.5,
    },
    priceText: {
        fontSize: 20,
        fontWeight: '800',
        color: "#DA901E",
    },
    buyButton: {
        backgroundColor: '#DA901E',
        paddingHorizontal: 80,
        paddingVertical: 20,
        borderRadius: 8,
    },
    buyButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
    },
});

export default Detailscreen;
