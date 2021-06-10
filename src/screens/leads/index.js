import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {grey2, grey3, grey7, teal, white} from '../../components/config/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Avatar} from '../../components';
import {SearchBar, ThemedView} from 'src/components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Container from 'src/containers/Container';
import _ from 'lodash';
import {green, grey1} from '../../components/config/colors';
function Leads() {
  const scrollViewData = [
    {
      key: 1,
      price: '45,000',
      jobTitle: 'T-Shirts',
      companyName: 'Rund Neck T-Shirts with color combinations',
      location: 'Pachim Vihar (West)',
      openings: 1,
    },
    {
      key: 2,
      price: '45,000',
      jobTitle: 'T-Shitrs, Jeans',
      companyName: 'T-Shirts and blue rugged jeans',
      location: 'Pachim Vihar (West)',
      openings: 1,
    },
    {
      key: 3,
      price: '45,000',
      jobTitle: 'Shoes',
      companyName: 'Chlesea boots and high tops',
      location: 'Pachim Vihar (West)',
      openings: 1,
    },
    {
      key: 4,
      price: '45,000',
      jobTitle: 'Trouser, Shirts',
      companyName: 'Narrow bottom trousers, skin fit',
      location: 'Pachim Vihar (West)',
      openings: 1,
    },
    {
      key: 5,
      price: '45,000',
      jobTitle: 'Jeans',
      companyName: 'Rugged jeans and tr jeans',
      location: 'Pachim Vihar (West)',
      openings: 1,
    },
  ];
  const arrowRight = {
    name: 'arrow-right',
    size: 18,
    color: '#000',
  };
  const home = {
    name: 'home',
    size: 13,
    color: '#000',
  };
  const briefcase = {
    name: 'briefcase',
    size: 13,
    color: '#000',
  };
  return (
    <ThemedView isFullView style={styles.container}>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 5}}>
            <Text style={styles.scrollHeader}>Garments</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.header}>
            {_.map(scrollViewData, (job) => {
              return (
                <View key={job?.key} style={styles.jobView}>
                  <View style={styles.jobInnerView}>
                    <Text style={styles.priceStyle}>{`₹ ${job?.price}`}</Text>
                    <Avatar
                      icon={arrowRight}
                      rounded
                      size={22}
                      overlayContainerStyle={styles.overlayContainerStyle}
                    />
                  </View>
                  <View style={styles.jobTitleView}>
                    <Text style={styles.jobTitle}>{`${job?.jobTitle}`}</Text>
                    <Text
                      style={styles.companyName}>{`${job?.companyName}`}</Text>
                  </View>
                  <View style={styles.homeIconView} />
                  <View style={styles.pieceStyle}>
                    <View style={styles.homeAvtarView}>
                      <Avatar
                        icon={home}
                        rounded
                        size={15}
                        overlayContainerStyle={styles.overlayContainerStyle}
                      />
                      <Text style={styles.locationStyle}>
                        {`${job?.location}`}
                      </Text>
                    </View>
                    <View style={styles.briefCaseAvtarView}>
                      <Avatar
                        icon={briefcase}
                        rounded
                        size={15}
                        overlayContainerStyle={styles.overlayContainerStyle}
                      />
                      <Text style={styles.locationStyle}>
                        {`${job?.openings} Piece`}
                      </Text>
                    </View>
                    <View style={styles.buttonStyle}>
                      <TouchableOpacity style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Enquire</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View>
            <Text style={styles.scrollHeader}>Garments</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.header}>
            {_.map(scrollViewData, (job) => {
              return (
                <View style={styles.jobView}>
                  <View style={styles.jobInnerView}>
                    <Text style={styles.priceStyle}>{`₹ ${job?.price}`}</Text>
                    <Avatar
                      icon={{
                        name: 'arrow-right',
                        size: 18,
                        color: '#000',
                      }}
                      rounded
                      size={22}
                      overlayContainerStyle={{
                        backgroundColor: '#fff',
                      }}
                    />
                  </View>
                  <View style={styles.jobTitleView}>
                    <Text style={styles.jobTitle}>{`${job?.jobTitle}`}</Text>
                    <Text
                      style={styles.companyName}>{`${job?.companyName}`}</Text>
                  </View>
                  <View style={styles.homeIconView} />
                  <View style={styles.pieceStyle}>
                    <View style={styles.homeAvtarView}>
                      <Avatar
                        icon={{
                          name: 'home',
                          size: 13,
                          color: '#000',
                        }}
                        rounded
                        size={15}
                        overlayContainerStyle={styles.overlayContainerStyle}
                      />
                      <Text style={styles.locationStyle}>
                        {`${job?.location}`}
                      </Text>
                    </View>
                    <View style={styles.briefCaseAvtarView}>
                      <Avatar
                        icon={{
                          name: 'briefcase',
                          size: 13,
                          color: '#000',
                        }}
                        rounded
                        size={15}
                        overlayContainerStyle={{
                          backgroundColor: '#fff',
                        }}
                      />
                      <Text style={styles.locationStyle}>
                        {`${job?.openings} Piece`}
                      </Text>
                    </View>
                    <View style={styles.buttonStyle}>
                      <TouchableOpacity style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Enquire</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View>
            <Text style={styles.scrollHeader}>Garments</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.header}>
            {_.map(scrollViewData, (job) => {
              return (
                <View style={styles.jobView}>
                  <View style={styles.jobInnerView}>
                    <Text style={styles.priceStyle}>{`₹ ${job?.price}`}</Text>
                    <Avatar
                      icon={{
                        name: 'arrow-right',
                        size: 18,
                        color: '#000',
                      }}
                      rounded
                      size={22}
                      overlayContainerStyle={styles.overlayContainerStyle}
                    />
                  </View>
                  <View style={styles.jobTitleView}>
                    <Text style={styles.jobTitle}>{`${job?.jobTitle}`}</Text>
                    <Text
                      style={styles.companyName}>{`${job?.companyName}`}</Text>
                  </View>
                  <View style={styles.homeIconView} />
                  <View style={styles.pieceStyle}>
                    <View style={styles.homeAvtarView}>
                      <Avatar
                        icon={{
                          name: 'home',
                          size: 13,
                          color: '#000',
                        }}
                        rounded
                        size={15}
                        overlayContainerStyle={styles.overlayContainerStyle}
                      />
                      <Text style={styles.locationStyle}>
                        {`${job?.location}`}
                      </Text>
                    </View>
                    <View style={styles.briefCaseAvtarView}>
                      <Avatar
                        icon={{
                          name: 'briefcase',
                          size: 13,
                          color: '#000',
                        }}
                        rounded
                        size={15}
                        overlayContainerStyle={{
                          backgroundColor: '#fff',
                        }}
                      />
                      <Text style={styles.locationStyle}>
                        {`${job?.openings} Piece`}
                      </Text>
                    </View>
                    <View style={styles.buttonStyle}>
                      <TouchableOpacity style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Enquire</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </ScrollView>
      </Container>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: green,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 0,
    height: 20,
    width: 130,
  },
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 0,
    height: 20,
    width: 56,
    marginLeft: 4,
  },
  appButtonText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonText1: {
    fontSize: 10,
    color: '#58b296',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  header: {
    color: '#000',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },
  jobView: {
    backgroundColor: '#fff',
    height: 180,
    width: 150,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    elevation: 2,
    flex: 1,
  },
  jobInnerView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  avtrStyle: {},
  jobTitleView: {
    margin: 6,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  jobTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: grey7,
  },
  companyName: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
  scrollHeader: {
    color: '#000',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },
  priceStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  overlayContainerStyle: {
    backgroundColor: '#fff',
  },
  homeIconView: {
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    width: 120,
    alignSelf: 'flex-start',
    marginLeft: 6,
  },
  pieceStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 6,
  },
  homeAvtarView: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },

  briefCaseAvtarView: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  briefcaseIcon: {},
  locationStyle: {
    fontSize: 12,
    marginLeft: 4,
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default Leads;
