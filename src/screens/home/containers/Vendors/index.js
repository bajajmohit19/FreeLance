import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import compact from 'lodash/compact';

import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { withTranslation } from 'react-i18next';

import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';
import { ItemVendorLoading, ItemVendor } from 'src/containers/vendor';

import { mainStack } from 'src/config/navigator';
import { languageSelector } from 'src/modules/common/selectors';
import { authSelector } from 'src/modules/auth/selectors';
import { getVendors } from 'src/modules/vendor/service';
import { getHomeVendors, getProductByVendor } from 'src/modules/auth/actions';

import { padding } from 'src/components/config/spacing';

const initHeader = {
  style: {},
};

class Vendors extends Component {
  constructor(props) {
    super(props);
    const { fields } = props;
    this.state = {
      data: [],
      loading: false,
      limit:
        fields && fields.limit && parseInt(fields.limit, 10)
          ? parseInt(fields.limit, 10)
          : 4,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }
  fetchData = () => {
    // const { fields } = this.props;
    this.setState({
      loading: true,
    });
    // const limit =
    //   fields && fields.limit && parseInt(fields.limit, 10)
    //     ? parseInt(fields.limit, 10)
    //     : 4;
    // const query = { per_page: limit };
    // // eslint-disable-next-line no-undef
    // this.abortController = new AbortController();
    // getVendors(query, {
    //   signal: this.abortController.signal,
    // })
    //   .then((data) => {
    //     this.setState({
    //       loading: false,
    //       data: compact(data),
    //     });
    //   })
    //   .catch((e) => {
    //     this.setState({
    //       loading: false,
    //     });
    //   });
    this.props.dispatch(getHomeVendors({ city: 'ludhiana'}))
    this.setState({loading: false})
  };

  clickDetailVendor = (data) => {
    console.log("data", data)
    const { dispatch, navigation, productsByVendors } = this.props;
    const  payload = {
      seller_id: data?.seller_enc_id,
      page: 1,
      limit: 5
    }
    console.log(payload)
    dispatch(getProductByVendor(payload));
    navigation.navigate(mainStack.store_detail, {vendorDetail:productsByVendors});
  };
  renderLoading = (padEnd) => {
    const { limit } = this.state;
    const listData = Array.from(Array(limit)).map((arg, index) => index);
    return listData.map((value) => (
      <ItemVendorLoading
        key={value}
        type="secondary"
        style={[
          styles.viewItem,
          value === listData.length - 1 && { marginRight: padEnd },
        ]}
      />
    ));
  };
  render() {
    const { navigation, fields, language, t, auth: { vendorsList, vendorListLoader, productsByVendors},
    } = this.props;
    const { data, loading } = this.state;
    if (
      !fields ||
      typeof fields !== 'object' ||
      Object.keys(fields).length < 1
    ) {
      return null;
    }
    const heading = fields.text_heading ? fields.text_heading : initHeader;

    const headerDisable = !fields.boxed ? 'all' : 'none';
    const contentDisable = !fields.boxed ? 'all' : 'right';
    const padEnd = fields.boxed ? padding.large : 0;

    return (
      <>
        {fields.disable_heading && (
          <Container disable={headerDisable}>
            <Heading
              title={
                heading.text && heading.text[language]
                  ? heading.text[language]
                  : t('common:text_category')
              }
              style={heading.style && heading.style}
              containerStyle={styles.header}
              subTitle={t('common:text_show_all')}
              onPress={() => navigation.navigate(mainStack.stores)}
            />
          </Container>
        )}
        <Container disable={contentDisable}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {vendorListLoader
              ? this.renderLoading(padEnd)
              :vendorsList && vendorsList.map((item, index) => (
                <ItemVendor
                  key={item?.seller_inc_id}
                  type="secondary"
                  store={item}
                  style={[
                    styles.viewItem,
                    index === data.length - 1 && { marginRight: padEnd },
                  ]}
                  onPress={() => this.clickDetailVendor(item)}
                />
              ))}
          </ScrollView>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
  },
  viewItem: {
    marginRight: 10,
  },
  item: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  language: languageSelector(state),
  auth: authSelector(state)
});

export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation(),
)(Vendors);
