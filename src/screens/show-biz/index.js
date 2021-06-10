import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {white, green} from '../../components/config/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Avatar} from '../../components';
import {Icon} from 'src/components';

function ShowBiz() {
  return (
    <ScrollView>
      <View style={styles.headerView}>
        <Text style={styles.headertext}>My Biz</Text>
        <Text style={styles.headerBottom}>Sell your Products here.</Text>
      </View>
      <View style={styles.avtarView}>
        <View style={styles.iconView}>
          <Avatar
            icon={{
              name: 'book',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={styles.overlayStyle}
          />

          <Text style={styles.txtStyle}>TradeKhata</Text>
        </View>
        <View style={styles.iconView}>
          <Avatar
            icon={{
              name: 'clipboard',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={styles.overlayStyle}
          />
          <Text style={styles.txtStyle}>Post Your Requirment</Text>
        </View>
        <View style={styles.iconView}>
          <Avatar
            icon={{
              name: 'gift',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={styles.overlayStyle}
          />
          <Text style={styles.txtStyle}>Rewards</Text>
        </View>
        <View style={styles.iconView}>
          <Avatar
            icon={{
              name: 'thumbs-up',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={styles.overlayStyle}
          />
          <Text style={styles.txtStyle}>Services</Text>
        </View>
      </View>
      <View style={styles.avtarView}>
        <View style={styles.iconView}>
          <Avatar
            icon={{
              name: 'check-square',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={styles.overlayStyle}
          />
          <Text style={styles.txtStyle}>Check GST</Text>
        </View>
        <View style={styles.iconView}>
          <Avatar
            icon={{
              name: 'phone-call',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={styles.overlayStyle}
          />
          <Text style={styles.txtStyle}>Call Logs</Text>
        </View>
        <View style={styles.iconView}>
          <Avatar
            icon={{
              name: 'flag',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={styles.overlayStyle}
          />
          <Text style={styles.txtStyle}>Buy Leads</Text>
        </View>
        <View style={styles.iconView}>
          <Avatar
            icon={{
              name: 'more-horizontal',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={styles.overlayStyle}
          />
          <Text style={styles.txtStyle}>See All</Text>
        </View>
      </View>
      <View style={styles.productContainer}>
        <View style={styles.promotionDiv}>
          <View>
            <Text style={styles.textName}>Products</Text>
          </View>
          <View style={styles.cardStyle}>
            <Avatar
              icon={{
                name: 'box',
                size: 22,
              }}
              rounded
              size={55}
              overlayContainerStyle={styles.overlayStyle}
            />
            <Text style={styles.qtyStyle}>5</Text>
          </View>
        </View>
        <View style={styles.promotionDiv}>
          <View>
            <Text style={styles.textName}>Orders</Text>
          </View>
          <View style={styles.cardStyle}>
            <Avatar
              icon={{
                name: 'archive',
                size: 22,
              }}
              rounded
              size={55}
              overlayContainerStyle={styles.overlayStyle}
            />
            <Text style={styles.qtyStyle}>10</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  promotionDiv: {
    marginHorizontal: 10,
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: green,
    height: 120,
    display: 'flex',
    justifyContent: 'space-around',
    padding: 5,
  },
  textName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginTop: 5,
    marginLeft: 10,
  },
  txtStyle: {
    marginTop: 10,
    textAlign: 'center',
  },
  iconView: {
    width: '25%',
    alignItems: 'center',
    padding: 5,
  },
  avtarView: {
    margin: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerView: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headertext: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  headerBottom: {
    textAlign: 'center',
    color: '#BDBDBD',
    fontSize: 12,
  },
  overlayStyle: {
    backgroundColor: '#000',
  },
  productContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
  },
  qtyStyle: {
    color: 'white',
    fontWeight: '700',
    marginTop: 20,
    fontSize: 18,
  },
  cardStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
});

export default ShowBiz;
